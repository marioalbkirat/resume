"use client";

import { FiCpu, FiEdit3, FiEye, FiFileText, FiLayers, FiStar, FiUpload, FiZap } from "react-icons/fi";
import { useResume } from "@/src/context/resumeContext";
import AnalyzeTab from "./tabs/AnalyzeTab";
import BuilderTab from "./tabs/BuilderTab";
import CustomizeTab from "./tabs/CustomizeTab";
import ManageTab from "./tabs/ManageTab";
import TemplatesTab from "./tabs/TemplatesTab";
import type { ResumeWorkspaceTab } from "@/src/types/resumeWorkspace";

const tabs: Array<{ id: ResumeWorkspaceTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: "templates", label: "Templates", icon: FiLayers },
    { id: "analyze", label: "Analyze resume", icon: FiCpu },
    { id: "manage", label: "Manage resume", icon: FiUpload },
    { id: "customize", label: "Customize Resume", icon: FiEdit3 },
    { id: "builder", label: "Build resume by AI", icon: FiStar },
];

export default function ResumeControlPanel() {
    const { activeTab, setActiveTab, previewMode, togglePreviewMode } = useResume();

    return (
        <aside className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="space-y-6 border-b border-slate-100 pb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-700">
                    <FiZap className="h-3.5 w-3.5" /> Resume workspace
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Manage AI analysis, templates, uploads, and per-resume CSS.</h1>
                    <p className="text-sm leading-6 text-slate-600">
                        This control panel is split into focused components so the larger project can migrate the resume management workflow cleanly.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        onClick={togglePreviewMode}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
                    >
                        <FiEye className="h-4 w-4" /> {previewMode === "preview" ? "Switch to edit" : "Preview / edit"}
                    </button>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-slate-900/15">
                        <FiFileText className="h-4 w-4" /> Max 3 pages enforced
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = tab.id === activeTab;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition ${
                                active
                                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15"
                                    : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900"
                            }`}
                        >
                            <Icon className="h-4 w-4" /> {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 space-y-5">
                {activeTab === "templates" ? <TemplatesTab /> : null}
                {activeTab === "analyze" ? <AnalyzeTab /> : null}
                {activeTab === "manage" ? <ManageTab /> : null}
                {activeTab === "customize" ? <CustomizeTab /> : null}
                {activeTab === "builder" ? <BuilderTab /> : null}
            </div>
        </aside>
    );
}
