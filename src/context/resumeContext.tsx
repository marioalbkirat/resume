"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
    analyzeResume,
    generateCoverLetter,
    generateResumeCss,
    generateSectionJson,
    uploadResumeDraft,
} from "@/src/utils/resumeAI";
import type {
    ResumeAnalysisResult,
    ResumeCoverLetterResult,
    ResumeGeneratedSection,
    ResumeWorkspaceMode,
    ResumeWorkspaceSection,
    ResumeWorkspaceTab,
} from "@/src/types/resumeWorkspace";

const defaultSections: ResumeWorkspaceSection[] = [
    {
        id: "profile",
        title: "Profile",
        badge: "AI",
        visible: true,
        order: 0,
        aiOptimizable: true,
        text: "Product-minded full-stack engineer with 7+ years of experience building SaaS platforms, AI-assisted workflows, and polished portfolio experiences.",
    },
    {
        id: "experience",
        title: "Experience",
        badge: "Core",
        visible: true,
        order: 1,
        aiOptimizable: true,
        text: "Led the delivery of resume and portfolio builders used by global professionals, improving editor completion rate by 31% through inline guidance and collaborative editing.",
    },
    {
        id: "projects",
        title: "Projects",
        badge: "Showcase",
        visible: true,
        order: 2,
        aiOptimizable: true,
        text: "Built a dynamic resume lab with reusable HTML templates, configurable CSS themes, AI analysis, and export-ready layouts limited to three pages.",
    },
    {
        id: "skills",
        title: "Skills",
        badge: "ATS",
        visible: true,
        order: 3,
        text: "React, Next.js, TypeScript, Tailwind CSS, Prisma, Resume Parsing, Prompt Design, Accessibility, ATS Optimization",
    },
];

interface ResumeContextValue {
    resumeId?: string;
    activeTab: ResumeWorkspaceTab;
    setActiveTab: (tab: ResumeWorkspaceTab) => void;
    previewMode: "preview" | "edit";
    togglePreviewMode: () => void;
    resumeStyle: ResumeWorkspaceMode;
    setResumeStyle: (style: ResumeWorkspaceMode) => void;
    selectedTemplate: string;
    setSelectedTemplate: (template: string) => void;
    sections: ResumeWorkspaceSection[];
    setSections: React.Dispatch<React.SetStateAction<ResumeWorkspaceSection[]>>;
    editableSectionId: string | null;
    setEditableSectionId: (id: string | null) => void;
    jobDescription: string;
    setJobDescription: (value: string) => void;
    analysisState: "idle" | "running" | "ready" | "applied";
    analysisFeed: string;
    analysisError: string | null;
    analysisResult: ResumeAnalysisResult | null;
    builderPrompt: string;
    setBuilderPrompt: (value: string) => void;
    generatedCss: string;
    builderStatus: string;
    builderAccepted: boolean;
    uploadedDraftSummary: string;
    customSectionPrompt: string;
    setCustomSectionPrompt: (value: string) => void;
    generatedSections: ResumeGeneratedSection[];
    coverLetterCompany: string;
    setCoverLetterCompany: (value: string) => void;
    coverLetterHiringManager: string;
    setCoverLetterHiringManager: (value: string) => void;
    coverLetterResult: ResumeCoverLetterResult | null;
    coverLetterStatus: string;
    isBusy: boolean;
    runAnalysis: () => Promise<void>;
    applyAnalysis: () => Promise<void>;
    rejectAnalysis: () => void;
    handleDraftUpload: (file: File) => Promise<void>;
    optimizeSection: (sectionId: string) => Promise<void>;
    generateCustomSection: () => Promise<void>;
    buildCss: () => Promise<void>;
    createCoverLetter: () => Promise<void>;
    acceptGeneratedCss: () => void;
    toggleSectionVisibility: (sectionId: string) => void;
    moveSection: (sectionId: string, direction: "up" | "down") => void;
  }

const ResumeContext = createContext<ResumeContextValue | undefined>(undefined);

function animateText(target: string, setter: (value: string) => void): Promise<void> {
    return new Promise((resolve) => {
        let index = 0;
        setter("");
        const timer = window.setInterval(() => {
            index += 1;
            setter(target.slice(0, index));
            if (index >= target.length) {
                window.clearInterval(timer);
                resolve();
            }
        }, 8);
    });
}

export function ResumeProvider({ children, resumeId }: { children: React.ReactNode; resumeId?: string }) {
    const [activeTab, setActiveTab] = useState<ResumeWorkspaceTab>("analyze");
    const [previewMode, setPreviewMode] = useState<"preview" | "edit">("edit");
    const [resumeStyle, setResumeStyle] = useState<ResumeWorkspaceMode>("Regular");
    const [selectedTemplate, setSelectedTemplate] = useState("Executive Split");
    const [sections, setSections] = useState<ResumeWorkspaceSection[]>(defaultSections);
    const [editableSectionId, setEditableSectionId] = useState<string | null>(defaultSections[0]?.id ?? null);
    const [jobDescription, setJobDescription] = useState("");
    const [analysisState, setAnalysisState] = useState<"idle" | "running" | "ready" | "applied">("idle");
    const [analysisFeed, setAnalysisFeed] = useState("Run AI analysis to receive resume improvements, job-match insights, or missing keywords.");
    const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    const [builderPrompt, setBuilderPrompt] = useState("Create a targeted hybrid resume with two columns, subtle navy accents, ordered sections for profile, experience, projects, skills, education, and certifications. Keep default values unless specified and provide only CSS.");
    const [generatedCss, setGeneratedCss] = useState("");
    const [builderStatus, setBuilderStatus] = useState("Describe the target layout and generate CSS-only output for the shared resume HTML.");
    const [builderAccepted, setBuilderAccepted] = useState(false);
    const [uploadedDraftSummary, setUploadedDraftSummary] = useState("Upload a PDF, DOC, or DOCX resume to extract sections into Draft-ready data.");
    const [customSectionPrompt, setCustomSectionPrompt] = useState("Add a Volunteer Leadership section highlighting mentorship, community workshops, and measurable outcomes.");
    const [generatedSections, setGeneratedSections] = useState<ResumeGeneratedSection[]>([]);
    const [coverLetterCompany, setCoverLetterCompany] = useState("");
    const [coverLetterHiringManager, setCoverLetterHiringManager] = useState("");
    const [coverLetterResult, setCoverLetterResult] = useState<ResumeCoverLetterResult | null>(null);
    const [coverLetterStatus, setCoverLetterStatus] = useState("Paste a job description, then generate a tailored cover letter from your live resume sections.");
    const [isBusy, setIsBusy] = useState(false);

    const sortedSections = useMemo(
        () => [...sections].sort((left, right) => left.order - right.order),
        [sections],
    );

    const togglePreviewMode = () => setPreviewMode((current) => (current === "preview" ? "edit" : "preview"));

    const runAnalysis = useCallback(async () => {
        setIsBusy(true);
        setAnalysisError(null);
        setAnalysisState("running");
        try {
            const result = await analyzeResume({ sections: sortedSections, jobDescription });
            setAnalysisResult(result);
            setAnalysisFeed(result.summary);
            setAnalysisState("ready");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Resume analysis failed.";
            setAnalysisError(message);
            setAnalysisFeed(message);
            setAnalysisState("idle");
        } finally {
            setIsBusy(false);
        }
    }, [jobDescription, sortedSections]);

    const applyAnalysis = useCallback(async () => {
        if (!analysisResult) {
            await runAnalysis();
            return;
        }

        setAnalysisState("running");
        setAnalysisFeed("Applying accepted AI improvements across the live preview...");
        const nextSections = [...sortedSections];

        for (const improvement of analysisResult.improvements) {
            const sectionIndex = nextSections.findIndex((section) => section.id === improvement.sectionId);
            if (sectionIndex === -1) continue;

            await animateText(improvement.after, (value) => {
                nextSections[sectionIndex] = { ...nextSections[sectionIndex], text: value };
                setSections([...nextSections]);
            });
        }

        setAnalysisState("applied");
    }, [analysisResult, runAnalysis, sortedSections]);

    const rejectAnalysis = () => {
        setSections(defaultSections);
        setAnalysisState("idle");
        setAnalysisFeed("Suggestions ignored. The current draft remains unchanged, and analysis can be rerun at any time.");
    };

    const handleDraftUpload = useCallback(async (file: File) => {
        setIsBusy(true);
        try {
            const text = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(String(reader.result ?? ""));
                reader.onerror = () => reject(new Error("Failed to read the uploaded resume."));
                reader.readAsText(file);
            });

            const draft = await uploadResumeDraft({ fileName: file.name, text });
            setSections(draft.sections);
            setUploadedDraftSummary(draft.draftSummary);
            setAnalysisFeed(`Draft updated from ${draft.fileName}.`);
        } finally {
            setIsBusy(false);
        }
    }, []);

    const optimizeSection = useCallback(async (sectionId: string) => {
        const targetSection = sortedSections.find((section) => section.id === sectionId);
        if (!targetSection) return;

        setIsBusy(true);
        setAnalysisError(null);
        setAnalysisState("running");
        setAnalysisFeed(`Optimizing ${targetSection.title} with AI...`);

        try {
            const result = await analyzeResume({ sections: [targetSection] });
            const improvement = result.improvements[0];

            if (!improvement) {
                setAnalysisFeed(`No optimized copy was returned for ${targetSection.title}.`);
                setAnalysisState("idle");
                return;
            }

            await animateText(improvement.after, (value) => {
                setSections((current) => current.map((section) =>
                    section.id === targetSection.id ? { ...section, text: value } : section,
                ));
            });

            setAnalysisResult(result);
            setAnalysisFeed(`${targetSection.title} was optimized and synced to the live preview.`);
            setAnalysisState("applied");
        } catch (error) {
            const message = error instanceof Error ? error.message : `Failed to optimize ${targetSection.title}.`;
            setAnalysisError(message);
            setAnalysisFeed(message);
            setAnalysisState("idle");
        } finally {
            setIsBusy(false);
        }
    }, [sortedSections]);

    const generateCustomSection = useCallback(async () => {
        setIsBusy(true);
        try {
            const generatedSection = await generateSectionJson({ prompt: customSectionPrompt });
            setGeneratedSections((current) => [...current, generatedSection]);
        } finally {
            setIsBusy(false);
        }
    }, [customSectionPrompt]);

    const buildCss = useCallback(async () => {
        setIsBusy(true);
        setBuilderStatus("Generating CSS for the shared resume HTML...");
        try {
            const css = await generateResumeCss({ prompt: builderPrompt, sections: sortedSections });
            setGeneratedCss(css);
            setBuilderAccepted(false);
            setBuilderStatus("CSS generated successfully. Review it, preview it, and accept it when ready.");
        } catch (error) {
            const message = error instanceof Error ? error.message : "CSS generation failed.";
            setBuilderStatus(message);
        } finally {
            setIsBusy(false);
        }
    }, [builderPrompt, sortedSections]);

    const createCoverLetter = useCallback(async () => {
        if (!jobDescription.trim()) {
            setCoverLetterStatus("Add a job description before generating a cover letter.");
            return;
        }

        setIsBusy(true);
        setCoverLetterStatus("Generating cover letter...");
        try {
            const result = await generateCoverLetter({
                jobDescription,
                company: coverLetterCompany,
                hiringManager: coverLetterHiringManager,
                sections: sortedSections,
            });
            setCoverLetterResult(result);
            setCoverLetterStatus("Cover letter generated successfully.");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Cover letter generation failed.";
            setCoverLetterStatus(message);
        } finally {
            setIsBusy(false);
        }
    }, [coverLetterCompany, coverLetterHiringManager, jobDescription, sortedSections]);

    const acceptGeneratedCss = () => {
        setBuilderAccepted(true);
        setBuilderStatus("Accepted CSS is ready to store on the Resume record for this shared template structure.");
    };

    const toggleSectionVisibility = (sectionId: string) => {
        setSections((current) => current.map((section) =>
            section.id === sectionId ? { ...section, visible: !section.visible } : section,
        ));
    };

    const moveSection = (sectionId: string, direction: "up" | "down") => {
        setSections((current) => {
            const sorted = [...current].sort((left, right) => left.order - right.order);
            const index = sorted.findIndex((section) => section.id === sectionId);
            const swapIndex = direction === "up" ? index - 1 : index + 1;
            if (index < 0 || swapIndex < 0 || swapIndex >= sorted.length) return current;

            const next = [...sorted];
            const [item] = next.splice(index, 1);
            next.splice(swapIndex, 0, item);
            return next.map((section, order) => ({ ...section, order }));
        });
    };

    const value = useMemo<ResumeContextValue>(() => ({
        resumeId,
        activeTab,
        setActiveTab,
        previewMode,
        togglePreviewMode,
        resumeStyle,
        setResumeStyle,
        selectedTemplate,
        setSelectedTemplate,
        sections: sortedSections,
        setSections,
        editableSectionId,
        setEditableSectionId,
        jobDescription,
        setJobDescription,
        analysisState,
        analysisFeed,
        analysisError,
        analysisResult,
        builderPrompt,
        setBuilderPrompt,
        generatedCss,
        builderStatus,
        builderAccepted,
        uploadedDraftSummary,
        customSectionPrompt,
        setCustomSectionPrompt,
        generatedSections,
        coverLetterCompany,
        setCoverLetterCompany,
        coverLetterHiringManager,
        setCoverLetterHiringManager,
        coverLetterResult,
        coverLetterStatus,
        isBusy,
        runAnalysis,
        applyAnalysis,
        rejectAnalysis,
        handleDraftUpload,
        optimizeSection,
        generateCustomSection,
        buildCss,
        createCoverLetter,
        acceptGeneratedCss,
        toggleSectionVisibility,
        moveSection,
    }), [
        resumeId,
        activeTab,
        previewMode,
        resumeStyle,
        selectedTemplate,
        sortedSections,
        editableSectionId,
        jobDescription,
        analysisState,
        analysisFeed,
        analysisError,
        analysisResult,
        builderPrompt,
        generatedCss,
        builderStatus,
        builderAccepted,
        uploadedDraftSummary,
        customSectionPrompt,
        generatedSections,
        coverLetterCompany,
        coverLetterHiringManager,
        coverLetterResult,
        coverLetterStatus,
        isBusy,
        runAnalysis,
        applyAnalysis,
        handleDraftUpload,
        optimizeSection,
        generateCustomSection,
        buildCss,
        createCoverLetter,
    ]);

    return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (!context) throw new Error("useResume must be used inside a ResumeProvider");
    return context;
}
