"use client";

import InlineEditText from "@/src/lib/inlineEdit/inlineEditText";
import { useResume } from "@/src/context/resumeContext";

const SECTION_CLASS_MAP: Record<string, string> = {
    profile: "header",
    contact: "contact",
    education: "education",
    experience: "experience",
    projects: "projects",
    languages: "languages",
    skills: "skills",
};

function updateSectionText(
    sectionId: string,
    value: string,
    setSections: ReturnType<typeof useResume>["setSections"],
) {
    setSections((current) => current.map((section) => (
        section.id === sectionId ? { ...section, text: value } : section
    )));
}

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

    const visibleSections = sections.filter((section) => section.visible);
    const profileSection = visibleSections.find((section) => section.id === "profile");
    const sidebarSections = visibleSections.filter((section) => ["contact", "education", "languages", "skills"].includes(section.id));
    const mainSections = visibleSections.filter((section) => !["profile", "contact", "education", "languages", "skills"].includes(section.id));

    return (
        <section className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Live resume preview</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Resume layout with shared HTML section structure</h2>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                    <span className="rounded-full bg-slate-100 px-3 py-1">Template: {selectedTemplate}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">Mode: {resumeStyle}</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Resume preview on the right</span>
                </div>
            </div>

            <div className="mt-6 rounded-[28px] bg-slate-950 p-4 sm:p-5">
                <div className="resume mx-auto min-h-[920px] max-w-4xl rounded-[12px] bg-white p-0 text-slate-900 shadow-2xl shadow-slate-950/10">
                    <div className="border-b border-slate-200 px-8 py-8 sm:px-10">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div className="space-y-3">
                                <InlineEditText
                                    as="h1"
                                    title="Full name"
                                    initialValue="Alex Morgan"
                                    className="text-4xl font-semibold uppercase tracking-[0.18em] text-slate-900"
                                />
                                <InlineEditText
                                    as="h2"
                                    title="Professional title"
                                    initialValue="Senior Product Engineer"
                                    className="text-base uppercase tracking-[0.28em] text-slate-500"
                                />
                            </div>
                            <div className="max-w-sm text-right text-xs leading-6 text-slate-500">
                                <p>Structured like a real resume, inspired by the Olivia template, with editable content blocks and a consistent HTML skeleton.</p>
                            </div>
                        </div>
                        {profileSection ? (
                            <section className="header mt-6">
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Professional summary</p>
                                    {previewMode === "edit" && editableSectionId === profileSection.id ? (
                                        <textarea
                                            value={profileSection.text}
                                            onChange={(event) => updateSectionText(profileSection.id, event.target.value, setSections)}
                                            className="min-h-28 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-indigo-400"
                                        />
                                    ) : (
                                        <p className="text-sm leading-7 text-slate-600">{profileSection.text}</p>
                                    )}
                                </div>
                            </section>
                        ) : null}
                    </div>

                    <div className="resume-grid grid gap-0 lg:grid-cols-[0.9fr_1.55fr]">
                        <aside className="border-r border-slate-200 bg-slate-50 px-8 py-8 sm:px-10">
                            {sidebarSections.map((section) => {
                                const isEditing = previewMode === "edit" && editableSectionId === section.id;
                                return (
                                    <section key={section.id} className={`${SECTION_CLASS_MAP[section.id] ?? section.id} mb-8 last:mb-0`}>
                                        <div className="mb-3 flex items-center justify-between gap-3">
                                            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900">{section.title}</h3>
                                            <button
                                                type="button"
                                                onClick={() => setEditableSectionId(section.id)}
                                                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                                            >
                                                {previewMode === "edit" ? "Edit" : "View"}
                                            </button>
                                        </div>
                                        {isEditing ? (
                                            <textarea
                                                value={section.text}
                                                onChange={(event) => updateSectionText(section.id, event.target.value, setSections)}
                                                className="min-h-24 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-indigo-400"
                                            />
                                        ) : (
                                            <p className="whitespace-pre-line text-sm leading-7 text-slate-600">{section.text}</p>
                                        )}
                                    </section>
                                );
                            })}
                        </aside>

                        <div className="px-8 py-8 sm:px-10">
                            {mainSections.map((section) => {
                                const isEditing = previewMode === "edit" && editableSectionId === section.id;
                                return (
                                    <section key={section.id} className={`${SECTION_CLASS_MAP[section.id] ?? section.id} mb-8 border-b border-slate-100 pb-8 last:mb-0 last:border-b-0 last:pb-0`}>
                                        <div className="mb-4 flex items-center justify-between gap-3">
                                            <div>
                                                <h3 className="text-lg font-semibold uppercase tracking-[0.14em] text-slate-900">{section.title}</h3>
                                                {section.badge ? (
                                                    <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
                                                        {section.badge}
                                                    </span>
                                                ) : null}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setEditableSectionId(section.id)}
                                                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                                            >
                                                {previewMode === "edit" ? "Edit" : "View"}
                                            </button>
                                        </div>
                                        {isEditing ? (
                                            <textarea
                                                value={section.text}
                                                onChange={(event) => updateSectionText(section.id, event.target.value, setSections)}
                                                className="min-h-28 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-indigo-400"
                                            />
                                        ) : (
                                            <p className="whitespace-pre-line text-sm leading-7 text-slate-600">{section.text}</p>
                                        )}
                                    </section>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
