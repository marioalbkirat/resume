import type {
    ResumeAnalysisResult,
    ResumeDraftUploadResult,
    ResumeGeneratedSection,
    ResumeWorkspaceSection,
} from "@/src/types/resumeWorkspace";

interface ResumeAIRequest {
    action: "analyze" | "generate-section" | "generate-css" | "upload-draft";
    payload: Record<string, unknown>;
}

interface ResumeAIResponse {
    analysis?: ResumeAnalysisResult;
    generatedSection?: ResumeGeneratedSection;
    css?: string;
    draft?: ResumeDraftUploadResult;
}

async function requestResumeAI<T extends keyof ResumeAIResponse>(
    action: ResumeAIRequest["action"],
    payload: ResumeAIRequest["payload"],
    key: T,
): Promise<ResumeAIResponse[T]> {
    const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ action, payload }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Resume AI request failed." }));
        throw new Error(error.error ?? "Resume AI request failed.");
    }

    const data = (await response.json()) as ResumeAIResponse;
    return data[key];
}

export async function analyzeResume(payload: {
    sections: ResumeWorkspaceSection[];
    jobDescription?: string;
}): Promise<ResumeAnalysisResult> {
    const analysis = await requestResumeAI("analyze", payload, "analysis");
    if (!analysis) throw new Error("Analysis response was empty.");
    return analysis;
}

export async function generateSectionJson(payload: {
    prompt: string;
}): Promise<ResumeGeneratedSection> {
    const generatedSection = await requestResumeAI("generate-section", payload, "generatedSection");
    if (!generatedSection) throw new Error("Generated section response was empty.");
    return generatedSection;
}

export async function generateResumeCss(payload: {
    prompt: string;
    sections: ResumeWorkspaceSection[];
}): Promise<string> {
    const css = await requestResumeAI("generate-css", payload, "css");
    if (!css) throw new Error("CSS response was empty.");
    return css;
}

export async function uploadResumeDraft(payload: {
    fileName: string;
    text: string;
}): Promise<ResumeDraftUploadResult> {
    const draft = await requestResumeAI("upload-draft", payload, "draft");
    if (!draft) throw new Error("Draft response was empty.");
    return draft;
}
