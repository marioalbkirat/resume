"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
    analyzeResume,
    generateResumeCss,
    generateSectionJson,
    uploadResumeDraft,
} from "@/src/utils/resumeAI";
import type {
    ResumeAnalysisResult,
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
    analysisResult: ResumeAnalysisResult | null;
    builderPrompt: string;
    setBuilderPrompt: (value: string) => void;
    generatedCss: string;
    builderAccepted: boolean;
    uploadedDraftSummary: string;
    customSectionPrompt: string;
    setCustomSectionPrompt: (value: string) => void;
    generatedSections: ResumeGeneratedSection[];
    isBusy: boolean;
    runAnalysis: () => Promise<void>;
    applyAnalysis: () => Promise<void>;
    rejectAnalysis: () => void;
    handleDraftUpload: (file: File) => Promise<void>;
    generateCustomSection: () => Promise<void>;
    buildCss: () => Promise<void>;
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
    const [builderPrompt, setBuilderPrompt] = useState("Create a targeted hybrid resume with two columns, subtle navy accents, ordered sections for profile, experience, projects, skills, education, and certifications. Keep default values unless specified and provide only CSS.");
    const [generatedCss, setGeneratedCss] = useState("");
    const [builderAccepted, setBuilderAccepted] = useState(false);
    const [uploadedDraftSummary, setUploadedDraftSummary] = useState("Upload a PDF, DOC, or DOCX resume to extract sections into Draft-ready data.");
    const [customSectionPrompt, setCustomSectionPrompt] = useState("Add a Volunteer Leadership section highlighting mentorship, community workshops, and measurable outcomes.");
    const [generatedSections, setGeneratedSections] = useState<ResumeGeneratedSection[]>([]);
    const [isBusy, setIsBusy] = useState(false);

    const sortedSections = useMemo(
        () => [...sections].sort((left, right) => left.order - right.order),
        [sections],
    );

    const togglePreviewMode = () => setPreviewMode((current) => (current === "preview" ? "edit" : "preview"));

    const runAnalysis = useCallback(async () => {
        setIsBusy(true);
        setAnalysisState("running");
        try {
            const result = await analyzeResume({ sections: sortedSections, jobDescription });
            setAnalysisResult(result);
            setAnalysisFeed(result.summary);
            setAnalysisState("ready");
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
        try {
            const css = await generateResumeCss({ prompt: builderPrompt, sections: sortedSections });
            setGeneratedCss(css);
            setBuilderAccepted(false);
        } finally {
            setIsBusy(false);
        }
    }, [builderPrompt, sortedSections]);

    const acceptGeneratedCss = () => setBuilderAccepted(true);

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
        analysisResult,
        builderPrompt,
        setBuilderPrompt,
        generatedCss,
        builderAccepted,
        uploadedDraftSummary,
        customSectionPrompt,
        setCustomSectionPrompt,
        generatedSections,
        isBusy,
        runAnalysis,
        applyAnalysis,
        rejectAnalysis,
        handleDraftUpload,
        generateCustomSection,
        buildCss,
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
        analysisResult,
        builderPrompt,
        generatedCss,
        builderAccepted,
        uploadedDraftSummary,
        customSectionPrompt,
        generatedSections,
        isBusy,
        runAnalysis,
        applyAnalysis,
        handleDraftUpload,
        generateCustomSection,
        buildCss,
    ]);

    return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (!context) throw new Error("useResume must be used inside a ResumeProvider");
    return context;
}
