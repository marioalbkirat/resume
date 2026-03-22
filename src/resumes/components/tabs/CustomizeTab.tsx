"use client";

import { FiArrowDown, FiArrowUp, FiCpu } from "react-icons/fi";
import { useResume } from "@/src/context/resumeContext";
import type { ResumeWorkspaceMode } from "@/src/types/resumeWorkspace";

const customizableSections = ["Profile", "Projects", "Experience", "Achievements", "Awards", "Services", "Courses", "Certifications"];

export default function CustomizeTab() {
    const {
        resumeStyle,
        setResumeStyle,
        sections,
        toggleSectionVisibility,
        moveSection,
        customSectionPrompt,
        setCustomSectionPrompt,
        optimizeSection,
        generateCustomSection,
        generatedSections,
        isBusy,
    } = useResume();

    return (
        <div className="space-y-5">
            <div>
                <h3 className="text-xl font-semibold text-slate-900">Customize Resume</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                    Adjust visual settings, reorder sections, hide or show content, and trigger AI section optimization or section generation.
                </p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-4">
                <div className="flex flex-wrap gap-2">
                    {(["ATS", "Regular"] as ResumeWorkspaceMode[]).map((mode) => (
                        <button
                            key={mode}
                            type="button"
                            onClick={() => setResumeStyle(mode)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${resumeStyle === mode ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600"}`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">Text color, section color, font selection, and section order controls are ready for the migrated design system.</div>
                    <div className="rounded-2xl bg-slate-50 p-4">ATS disables images, icons, and visual styling; Regular enables avatars, icons, and richer branding.</div>
                </div>
            </div>
            <div className="rounded-3xl border border-slate-200 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">AI bot entry points</p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {customizableSections.map((section) => {
                        const target = sections.find((item) => item.title === section || item.id === section.toLowerCase());
                        return (
                            <button
                                key={section}
                                type="button"
                                disabled={!target || isBusy}
                                onClick={() => target ? void optimizeSection(target.id) : undefined}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <FiCpu className="h-4 w-4" /> Optimize {section}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="rounded-3xl border border-slate-200 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Section order and visibility</p>
                <div className="mt-4 space-y-3">
                    {sections.map((section) => (
                        <div key={section.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                            <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                <input
                                    type="checkbox"
                                    checked={section.visible}
                                    onChange={() => toggleSectionVisibility(section.id)}
                                    className="h-4 w-4 rounded border-slate-300"
                                />
                                {section.title}
                            </label>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => moveSection(section.id, "up")} className="rounded-full border border-slate-200 bg-white p-2 text-slate-500"><FiArrowUp className="h-4 w-4" /></button>
                                <button type="button" onClick={() => moveSection(section.id, "down")} className="rounded-full border border-slate-200 bg-white p-2 text-slate-500"><FiArrowDown className="h-4 w-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="rounded-3xl border border-slate-200 p-4">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Add a specific section with AI-generated JSON</label>
                <textarea
                    value={customSectionPrompt}
                    onChange={(event) => setCustomSectionPrompt(event.target.value)}
                    className="mt-3 min-h-28 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-indigo-400"
                />
                <button
                    type="button"
                    onClick={() => void generateCustomSection()}
                    disabled={isBusy}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                    <FiCpu className="h-4 w-4" /> Generate section JSON
                </button>
                {generatedSections.map((section) => (
                    <pre key={`${section.title}-${section.items[0]?.title ?? "item"}`} className="mt-3 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-emerald-300">
{JSON.stringify(section, null, 2)}
                    </pre>
                ))}
            </div>
        </div>
    );
}
