"use client";

import ResumeWorkspace from "./components/ResumeWorkspace";
import { ResumeProvider } from "../context/resumeContext";

interface FreeTemplateProps {
    template: string;
    resumeId: string;
}

export default function CVTemplates({ template, resumeId }: FreeTemplateProps) {
    return (
        <ResumeProvider resumeId={resumeId}>
            <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eef4ff,_#f8f5ff_45%,_#ffffff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <ResumeWorkspace />
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-400">Template route: {template}</p>
                </div>
            </div>
        </ResumeProvider>
    );
}
