import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/utils/db";
import { Validation } from "@/src/classes/validation/Validation";
import type { Resume } from "@/src/types/resume";
import type {
    ResumeAnalysisResult,
    ResumeCoverLetterResult,
    ResumeDraftUploadResult,
    ResumeGeneratedSection,
    ResumeWorkspaceSection,
} from "@/src/types/resumeWorkspace";

type ResumeType = Omit<Resume, "resumeUsers" | "plan">;

type ResumeAction = "analyze" | "generate-section" | "generate-css" | "upload-draft" | "generate-cover-letter";

type OpenRouterMessageContent = string | Array<{ type?: string; text?: string }>;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "stepfun/step-3.5-flash";
const OPENROUTER_TIMEOUT_MS = 30000;

class ResumeAIUnavailableError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ResumeAIUnavailableError";
    }
}

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

async function callOpenRouter<T>(systemPrompt: string, userPrompt: string): Promise<T> {
    const apiKey = process.env.OPENROUTER_KEY ?? process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        throw new ResumeAIUnavailableError("Missing OPENROUTER_KEY or OPENROUTER_API_KEY.");
    }

    let response: Response;

    try {
        response = await fetch(OPENROUTER_URL, {
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
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown AI provider error.";
        throw new ResumeAIUnavailableError(message);
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error("Resume AI provider request failed.", error);
        const message =
            typeof error?.error?.message === "string"
                ? error.error.message
                : `Resume AI provider request failed with status ${response.status}.`;
        throw new ResumeAIUnavailableError(message);
    }

    return await parseAIResponse<T>(response);
}

function truncateText(text: string, maxLength = 220): string {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trimEnd()}…`;
}

function splitIntoKeywords(text: string): string[] {
    return Array.from(new Set(
        text
            .toLowerCase()
            .split(/[^a-z0-9+#.]+/i)
            .map((token) => token.trim())
            .filter((token) => token.length >= 4),
    )).slice(0, 8);
}

function createLocalAnalysis(
    sections: ResumeWorkspaceSection[],
    jobDescription: string,
): ResumeAnalysisResult {
    const keywords = splitIntoKeywords(jobDescription);
    const improvements = sections.map((section) => ({
        sectionId: section.id,
        heading: `Sharpen ${section.title}`,
        before: truncateText(section.text, 120),
        after: truncateText(
            `${section.text.trim()} Focus on measurable outcomes, strong action verbs, and concise role-specific language${jobDescription ? ` aligned to ${keywords.slice(0, 3).join(", ") || "the target role"}` : ""}.`,
            240,
        ),
    }));

    return {
        title: jobDescription ? "Resume review fallback" : "Resume review fallback",
        summary: jobDescription
            ? "AI analysis is temporarily unavailable, so a local review was generated from your current resume sections and the pasted job description."
            : "AI analysis is temporarily unavailable, so a local review was generated from your current resume sections.",
        score: jobDescription ? `${Math.min(96, 72 + keywords.length * 3)}% estimated match` : undefined,
        keywords,
        suggestions: [
            "Lead each bullet with a decisive action verb.",
            "Quantify outcomes with metrics, scope, or business impact.",
            ...(jobDescription ? ["Mirror the most important job-description terminology where it truthfully matches your experience."] : []),
        ],
        improvements,
    };
}

function createLocalGeneratedSection(prompt: string): ResumeGeneratedSection {
    const topic = truncateText(prompt || "Professional Highlights", 60);
    return {
        title: "Custom Section",
        layout: "full-width",
        items: [
            {
                title: topic,
                subtitle: "Locally generated fallback",
                impact: "Convert this placeholder into specific wins, metrics, ownership, and tools relevant to the role you are targeting.",
            },
        ],
    };
}

function createLocalCss(): { css: string } {
    return {
        css: [
            ".resume-shell { font-family: 'Inter', Arial, sans-serif; color: #0f172a; }",
            ".resume-shell .resume-header { border-bottom: 2px solid #cbd5e1; padding-bottom: 1rem; margin-bottom: 1.5rem; }",
            ".resume-shell .resume-section { margin-bottom: 1.25rem; }",
            ".resume-shell .resume-section h2 { font-size: 0.95rem; letter-spacing: 0.08em; text-transform: uppercase; color: #334155; margin-bottom: 0.5rem; }",
            ".resume-shell .resume-section p, .resume-shell .resume-section li { line-height: 1.65; }",
        ].join("\n"),
    };
}

function createLocalDraft(fileName: string, text: string): ResumeDraftUploadResult {
    const extractedText = text.trim();
    const paragraphs = extractedText.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);
    const sections = paragraphs.slice(0, 4).map((paragraph, index) => ({
        id: `draft-${index + 1}`,
        title: index === 0 ? "Profile" : `Imported Section ${index + 1}`,
        text: truncateText(paragraph, 320),
        badge: "Draft",
        visible: true,
        order: index,
    }));

    return {
        fileName,
        extractedText,
        draftSummary: "AI extraction is temporarily unavailable, so the draft was created from the uploaded text using a local fallback parser.",
        sections: sections.length > 0 ? sections : [{
            id: "draft-1",
            title: "Imported Draft",
            text: "No readable content was found in the uploaded file.",
            badge: "Draft",
            visible: true,
            order: 0,
        }],
    };
}

function createLocalCoverLetter(payload: {
    company: string;
    hiringManager: string;
    jobDescription: string;
    sections: ResumeWorkspaceSection[];
}): ResumeCoverLetterResult {
    const company = payload.company || "your company";
    const greetingName = payload.hiringManager || "Hiring Manager";
    const highlights = payload.sections.slice(0, 2).map((section) => `${section.title}: ${truncateText(section.text, 100)}`);

    return {
        subject: `Application for ${company}`,
        greeting: `Dear ${greetingName},`,
        opening: `I am excited to apply for the opportunity at ${company}. While the AI writing service is temporarily unavailable, this fallback cover letter is based on the experience currently shown in the resume workspace.`,
        body: [
            `My background includes ${highlights.join(" ")}`.trim(),
            payload.jobDescription
                ? `I would tailor the final version further by aligning it to priorities from the job description, especially around ${splitIntoKeywords(payload.jobDescription).slice(0, 4).join(", ") || "the role requirements"}.`
                : "I would tailor the final version further once a specific job description is provided.",
        ],
        closing: "Thank you for your time and consideration. I would welcome the opportunity to discuss how my background can support your team.",
        signature: "Best regards,\nYour Name",
    };
}

function createLocalAIResponse(action: ResumeAction, payload: Record<string, unknown>) {
    if (action === "analyze") {
        const sections = (payload.sections as ResumeWorkspaceSection[]) ?? [];
        const jobDescription = typeof payload.jobDescription === "string" ? payload.jobDescription : "";
        return NextResponse.json({
            analysis: createLocalAnalysis(sections, jobDescription),
            fallback: true,
        });
    }

    if (action === "generate-section") {
        return NextResponse.json({
            generatedSection: createLocalGeneratedSection(String(payload.prompt ?? "")),
            fallback: true,
        });
    }

    if (action === "generate-css") {
        return NextResponse.json({
            ...createLocalCss(),
            fallback: true,
        });
    }

    if (action === "upload-draft") {
        return NextResponse.json({
            draft: createLocalDraft(String(payload.fileName ?? "resume.txt"), String(payload.text ?? "")),
            fallback: true,
        });
    }

    if (action === "generate-cover-letter") {
        return NextResponse.json({
            coverLetter: createLocalCoverLetter({
                company: String(payload.company ?? ""),
                hiringManager: String(payload.hiringManager ?? ""),
                jobDescription: String(payload.jobDescription ?? ""),
                sections: (payload.sections as ResumeWorkspaceSection[]) ?? [],
            }),
            fallback: true,
        });
    }

    return NextResponse.json({ error: "Unsupported resume action." }, { status: 400 });
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
    try {
        if (action === "analyze") {
            const sections = (payload.sections as ResumeWorkspaceSection[]) ?? [];
            const jobDescription = typeof payload.jobDescription === "string" ? payload.jobDescription : "";
            const aiResult = await callOpenRouter<ResumeAnalysisResult>(
                "You are a resume reviewer. Return JSON with title, summary, optional score, optional keywords, suggestions, and improvements[]. Each improvement must have sectionId, heading, before, and after.",
                `Sections: ${JSON.stringify(sections)}\nJob description: ${jobDescription || "N/A"}`,
            );

            return NextResponse.json({ analysis: aiResult });
        }

        if (action === "generate-section") {
            const prompt = String(payload.prompt ?? "");
            const aiResult = await callOpenRouter<ResumeGeneratedSection>(
                "Generate one resume section from the user prompt and return JSON with title, layout, and items[]. Each item must have title, optional subtitle, and impact.",
                prompt,
            );

            return NextResponse.json({ generatedSection: aiResult });
        }

        if (action === "generate-css") {
            const prompt = String(payload.prompt ?? "");
            const sections = JSON.stringify(payload.sections ?? []);
            const aiResult = await callOpenRouter<{ css: string }>(
                "Return JSON with a single css string. The CSS should style a resume while preserving a shared HTML structure across templates.",
                `Prompt: ${prompt}\nSections: ${sections}`,
            );

            return NextResponse.json({ css: aiResult.css });
        }

        if (action === "upload-draft") {
            const fileName = String(payload.fileName ?? "resume.txt");
            const text = String(payload.text ?? "");
            const aiResult = await callOpenRouter<ResumeDraftUploadResult>(
                "Convert resume text into draft-ready sections. Return JSON with fileName, extractedText, draftSummary, and sections[]. Each section must include id, title, text, badge, visible, and order.",
                `File: ${fileName}\nText: ${text.slice(0, 4000)}`,
            );

            return NextResponse.json({ draft: aiResult });
        }

        if (action === "generate-cover-letter") {
            const jobDescription = String(payload.jobDescription ?? "");
            const company = String(payload.company ?? "");
            const hiringManager = String(payload.hiringManager ?? "");
            const sections = JSON.stringify(payload.sections ?? []);
            const aiResult = await callOpenRouter<ResumeCoverLetterResult>(
                "Generate a professional cover letter and return JSON with subject, greeting, opening, body (array of 2-3 paragraphs), closing, and signature.",
                `Job description: ${jobDescription}\nCompany: ${company || "Unknown"}\nHiring manager: ${hiringManager || "Hiring Manager"}\nResume sections: ${sections}`,
            );

            return NextResponse.json({ coverLetter: aiResult });
        }

        return NextResponse.json({ error: "Unsupported resume action." }, { status: 400 });
    } catch (error) {
        if (error instanceof ResumeAIUnavailableError) {
            console.warn("Falling back to local resume helpers because the AI provider is unavailable.", error.message);
            return createLocalAIResponse(action, payload);
        }

        const message = error instanceof Error ? error.message : "Resume AI request failed.";
        return NextResponse.json({ error: message }, { status: 502 });
    }
}
