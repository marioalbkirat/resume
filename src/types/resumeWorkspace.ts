export type ResumeWorkspaceTab = "templates" | "analyze" | "manage" | "customize" | "builder" | "cover-letter";
export type ResumeWorkspaceMode = "ATS" | "Regular";
export type ResumeAnalysisMode = "resume" | "job";

export interface ResumeWorkspaceSection {
    id: string;
    title: string;
    text: string;
    badge?: string;
    visible: boolean;
    order: number;
    aiOptimizable?: boolean;
}

export interface ResumeAnalysisImprovement {
    sectionId: string;
    heading: string;
    before: string;
    after: string;
}

export interface ResumeAnalysisResult {
    title: string;
    summary: string;
    score?: string;
    keywords?: string[];
    suggestions: string[];
    improvements: ResumeAnalysisImprovement[];
}

export interface ResumeGeneratedSection {
    title: string;
    layout: "full-width" | "split" | "compact";
    items: Array<{
        title: string;
        subtitle?: string;
        impact: string;
    }>;
}

export interface ResumeDraftUploadResult {
    fileName: string;
    extractedText: string;
    sections: ResumeWorkspaceSection[];
    draftSummary: string;
}

export interface ResumeCoverLetterResult {
    subject?: string;
    greeting: string;
    opening: string;
    body: string[];
    closing: string;
    signature: string;
}
