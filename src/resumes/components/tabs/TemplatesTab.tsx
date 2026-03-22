"use client";

import { useResume } from "@/src/context/resumeContext";

const templateCards = [
    {
        name: "Executive Split",
        description: "Two-column executive layout with sticky insights and compact metrics.",
        tone: "Regular",
    },
    {
        name: "ATS Precision",
        description: "Single-column, no-icons, parser-friendly structure for enterprise applications.",
        tone: "ATS",
    },
    {
        name: "Creative Signal",
        description: "Visually rich layout with accent bars, optional avatar, and featured projects.",
        tone: "Regular",
    },
];

export default function TemplatesTab() {
    const { selectedTemplate, setSelectedTemplate } = useResume();

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-slate-900">Template selection</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                    Every template reuses the same resume HTML while the stored CSS determines the presentation for each resume record.
                </p>
            </div>
            <div className="space-y-3">
                {templateCards.map((template) => {
                    const active = selectedTemplate === template.name;
                    return (
                        <button
                            key={template.name}
                            type="button"
                            onClick={() => setSelectedTemplate(template.name)}
                            className={`w-full rounded-3xl border p-4 text-left transition ${
                                active ? "border-indigo-300 bg-indigo-50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="font-semibold text-slate-900">{template.name}</p>
                                    <p className="mt-1 text-sm leading-6 text-slate-600">{template.description}</p>
                                </div>
                                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">{template.tone}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
