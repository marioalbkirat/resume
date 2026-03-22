"use client";

import { FiFileText } from "react-icons/fi";
import { useResume } from "@/src/context/resumeContext";

export default function ResumePreviewPane() {
    const {
        sections,
        selectedTemplate,
        resumeStyle,
        previewMode,
        editableSectionId,
        setEditableSectionId,
        setSections,
    } = useResume();

    return (
        <section className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Live resume preview</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Interactive shared-HTML resume canvas</h2>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                    <span className="rounded-full bg-slate-100 px-3 py-1">Template: {selectedTemplate}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">Mode: {resumeStyle}</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Stored CSS per resume</span>
                </div>
            </div>

            <div className="mt-6 rounded-[28px] bg-slate-950 p-4 sm:p-5">
                <div className="mx-auto min-h-[920px] max-w-3xl rounded-[24px] bg-white p-6 shadow-2xl shadow-slate-950/10 sm:p-8">
                    <div className="flex flex-col gap-6 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h3 className="text-3xl font-semibold tracking-tight text-slate-950">Alex Morgan</h3>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                                Senior product engineer focused on AI-enhanced resume experiences, high-conversion portfolio journeys, and polished front-end systems.
                            </p>
                        </div>
                        {resumeStyle === "Regular" ? (
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-indigo-500 via-violet-500 to-sky-400 text-xl font-semibold text-white shadow-lg shadow-indigo-500/30">
                                AM
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-200 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                                ATS mode hides avatar/icons/colors
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                        <div className="inline-flex items-center gap-2">
                            <FiFileText className="h-4 w-4 text-indigo-500" /> Three-page limit awareness stays consistent across templates.
                        </div>
                        <span>{sections.filter((section) => section.visible).length} visible sections</span>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {sections.filter((section) => section.visible).map((section) => {
                            const isEditing = previewMode === "edit" && editableSectionId === section.id;
                            return (
                                <article
                                    key={section.id}
                                    className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40"
                                >
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <div>
                                            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">{section.title}</h4>
                                            {section.badge ? (
                                                <span className="mt-1 inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 shadow-sm">
                                                    {section.badge}
                                                </span>
                                            ) : null}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setEditableSectionId(section.id)}
                                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                                        >
                                            {previewMode === "edit" ? "Inline edit" : "Preview"}
                                        </button>
                                    </div>
                                    {isEditing ? (
                                        <textarea
                                            value={section.text}
                                            onChange={(event) =>
                                                setSections((current) => current.map((item) =>
                                                    item.id === section.id ? { ...item, text: event.target.value } : item,
                                                ))
                                            }
                                            className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-indigo-400"
                                        />
                                    ) : (
                                        <p className="text-sm leading-6 text-slate-600">{section.text}</p>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
