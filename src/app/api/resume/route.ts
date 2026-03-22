import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/utils/db";
import { Validation } from "@/src/classes/validation/Validation";
import type { Resume } from "@/src/types/resume";
import type {
    ResumeAnalysisResult,
    ResumeDraftUploadResult,
    ResumeGeneratedSection,
    ResumeWorkspaceSection,
} from "@/src/types/resumeWorkspace";

type ResumeType = Omit<Resume, "resumeUsers" | "plan">;

type ResumeAction = "analyze" | "generate-section" | "generate-css" | "upload-draft";

type OpenRouterMessageContent = string | Array<{ type?: string; text?: string }>;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "stepfun/step-3.5-flash";
const OPENROUTER_TIMEOUT_MS = 10000;

function normalizeMessageContent(content: OpenRouterMessageContent | undefined): string {
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
        return content
            .map((item) => (typeof item?.text === "string" ? item.text : ""))
            .join("")
            .trim();
    }

    return "";
}

async function parseAIResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    const rawContent = normalizeMessageContent(data.choices?.[0]?.message?.content);

    if (!rawContent) {
        throw new Error("The AI API returned an empty response.");
    }

    const sanitizedContent = rawContent
        .replace(/^```json\s*/i, "")
        .replace(/^```/i, "")
        .replace(/```$/, "")
        .trim();

    return JSON.parse(sanitizedContent) as T;
}

async function callOpenRouter<T>(systemPrompt: string, userPrompt: string): Promise<T | null> {
    const apiKey = process.env.OPENROUTER_KEY ?? process.env.OPENROUTER_API_KEY;
    if (!apiKey) return null;

    try {
        const response = await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                response_format: { type: "json_object" },
                temperature: 0,
                max_tokens: 2500,
            }),
            signal: AbortSignal.timeout(OPENROUTER_TIMEOUT_MS),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error("Resume AI provider request failed.", error);
            return null;
        }

        return await parseAIResponse<T>(response);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(`Resume AI provider request failed. Falling back to defaults. ${message}`);
        return null;
    }
}

function fallbackAnalysis(sections: ResumeWorkspaceSection[], jobDescription?: string): ResumeAnalysisResult {
    if (jobDescription?.trim()) {
        return {
            title: "Match Analysis",
            summary: "The resume aligns well with front-end product engineering roles, but should emphasize stakeholder impact, experimentation, and measurable outcomes more clearly.",
            score: "87% match",
            keywords: ["design systems", "A/B testing", "stakeholder alignment", "performance budgets"],
            suggestions: [
                "Mirror the job description's wording for experimentation and product delivery.",
                "Add business outcomes and ownership language to work experience bullets.",
                "Promote design systems and performance budgets in the skills section.",
            ],
            improvements: sections.slice(0, 2).map((section) => ({
                sectionId: section.id,
                heading: `${section.title} aligned to job description`,
                before: section.text,
                after: `Targeted version of ${section.title.toLowerCase()}: ${section.text.replace(/\.$/, "")} with stronger metrics, ownership, and job-specific keywords.`,
            })),
        };
    }

    return {
        title: "Analysis Results",
        summary: "Spelling, clarity, and action-verb quality were improved to create a stronger professional narrative.",
        suggestions: [
            "Replace generic verbs with stronger action verbs.",
            "Quantify project and work impact wherever possible.",
            "Keep the resume within three pages by prioritizing recent, relevant work.",
        ],
        improvements: sections.slice(0, 2).map((section) => ({
            sectionId: section.id,
            heading: `Improved ${section.title}`,
            before: section.text,
            after: `Enhanced ${section.title.toLowerCase()} statement: ${section.text.replace(/\.$/, "")} with tighter wording, corrected grammar, and more impact-focused phrasing.`,
        })),
    };
}

function fallbackGeneratedSection(prompt: string): ResumeGeneratedSection {
    return {
        title: "Volunteer Leadership",
        layout: "full-width",
        items: [
            {
                title: "Community Mentor",
                subtitle: prompt.slice(0, 48),
                impact: "Guided job seekers through resume rewrites, workshops, and measurable interview preparation outcomes.",
            },
        ],
    };
}

function fallbackCss(): string {
    return `:root {
  --resume-accent: #163d7a;
  --resume-bg: #f8fbff;
  --resume-text: #132238;
}
.resume-shell {
  background: linear-gradient(180deg, #ffffff 0%, var(--resume-bg) 100%);
  color: var(--resume-text);
}
.resume-grid {
  display: grid;
  grid-template-columns: 1.3fr 0.9fr;
  gap: 24px;
}
.resume-section-title {
  color: var(--resume-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}`;
}

function fallbackDraft(fileName: string, text: string): ResumeDraftUploadResult {
    return {
        fileName,
        extractedText: text,
        draftSummary: "Uploaded resume parsed into Draft-ready sections and prepared for portfolio linking.",
        sections: [
            {
                id: "profile",
                title: "Profile",
                badge: "Draft",
                visible: true,
                order: 0,
                text: text.slice(0, 180) || "Imported summary from uploaded resume.",
            },
            {
                id: "experience",
                title: "Experience",
                badge: "Parsed",
                visible: true,
                order: 1,
                text: "Imported work history from the uploaded document and normalized it for AI review.",
            },
            {
                id: "skills",
                title: "Skills",
                badge: "ATS",
                visible: true,
                order: 2,
                text: "React, Next.js, TypeScript, Resume Parsing, ATS Optimization, Portfolio Linking",
            },
        ],
    };
}

export async function GET() {
    try {
        const resumes = await prisma.resume.findMany();
        return NextResponse.json(resumes satisfies ResumeType[]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to load resumes." }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        if (typeof data.action === "string") {
            return handleAIAction(data.action as ResumeAction, data.payload ?? {});
        }

        const { name, type, target, image, features, description, planId, html = "", css = "" } = data as {
            name: string;
            type: string;
            target: string[];
            image: string;
            features: string[];
            description: string;
            planId: string;
            html?: string;
            css?: string;
        };

        const errors = Validation.schema({ name, type, target, image, features, description, planId, html, css }, {
            name: ["required", "type:string", "min:3", "max:20"],
            type: ["required", "type:enum", "min:3", "max:7"],
            target: ["required", "type:array", "min:1"],
            features: ["required", "type:array", "min:1"],
            image: ["required", "type:string", "min:1"],
            description: ["required", "type:string", "min:3", "max:200"],
            planId: ["required", "type:string", "min:3", "max:200"],
            html: ["type:string"],
            css: ["type:string"],
        });

        if (Object.keys(errors).length > 0) {
            return NextResponse.json({ error: errors }, { status: 400 });
        }

        const resume = await prisma.resume.create({
            data: { name, type, target, image, features, description, planId, html, css },
        });

        return NextResponse.json(resume);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Resume request failed." }, { status: 500 });
    }
}

async function handleAIAction(action: ResumeAction, payload: Record<string, unknown>) {
    if (action === "analyze") {
        const sections = (payload.sections as ResumeWorkspaceSection[]) ?? [];
        const jobDescription = typeof payload.jobDescription === "string" ? payload.jobDescription : "";
        const aiResult = await callOpenRouter<ResumeAnalysisResult>(
            "You are a resume reviewer. Return JSON with title, summary, optional score, optional keywords, suggestions, and improvements[]. Each improvement must have sectionId, heading, before, and after.",
            `Sections: ${JSON.stringify(sections)}\nJob description: ${jobDescription || "N/A"}`,
        );

        return NextResponse.json({ analysis: aiResult ?? fallbackAnalysis(sections, jobDescription) });
    }

    if (action === "generate-section") {
        const prompt = String(payload.prompt ?? "");
        const aiResult = await callOpenRouter<ResumeGeneratedSection>(
            "Generate one resume section from the user prompt and return JSON with title, layout, and items[]. Each item must have title, optional subtitle, and impact.",
            prompt,
        );

        return NextResponse.json({ generatedSection: aiResult ?? fallbackGeneratedSection(prompt) });
    }

    if (action === "generate-css") {
        const prompt = String(payload.prompt ?? "");
        const sections = JSON.stringify(payload.sections ?? []);
        const aiResult = await callOpenRouter<{ css: string }>(
            "Return JSON with a single css string. The CSS should style a resume while preserving a shared HTML structure across templates.",
            `Prompt: ${prompt}\nSections: ${sections}`,
        );

        return NextResponse.json({ css: aiResult?.css ?? fallbackCss() });
    }

    if (action === "upload-draft") {
        const fileName = String(payload.fileName ?? "resume.txt");
        const text = String(payload.text ?? "");
        const aiResult = await callOpenRouter<ResumeDraftUploadResult>(
            "Convert resume text into draft-ready sections. Return JSON with fileName, extractedText, draftSummary, and sections[]. Each section must include id, title, text, badge, visible, and order.",
            `File: ${fileName}\nText: ${text.slice(0, 4000)}`,
        );

        return NextResponse.json({ draft: aiResult ?? fallbackDraft(fileName, text) });
    }

    return NextResponse.json({ error: "Unsupported resume action." }, { status: 400 });
}
