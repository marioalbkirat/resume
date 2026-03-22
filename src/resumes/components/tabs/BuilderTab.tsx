"use client";

import { FiCheckCircle, FiSparkles } from "react-icons/fi";
import { useResume } from "@/src/context/resumeContext";

export default function BuilderTab() {
    const {
        builderPrompt,
        setBuilderPrompt,
        generatedCss,
        buildCss,
        acceptGeneratedCss,
        builderAccepted,
        isBusy,
    } = useResume();

    return (
        <div className="space-y-5">
            <div>
                <h3 className="text-xl font-semibold text-slate-900">Build resume by AI</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                    Describe the desired layout and receive CSS-only styling while preserving the shared resume HTML across templates.
                </p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-4">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Design prompt</label>
                <textarea
                    value={builderPrompt}
                    onChange={(event) => setBuilderPrompt(event.target.value)}
                    className="mt-3 min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-indigo-400"
                />
                <button
                    type="button"
                    onClick={() => void buildCss()}
                    disabled={isBusy}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                    <FiSparkles className="h-4 w-4" /> Generate CSS
                </button>
            </div>
            <div className="rounded-3xl bg-slate-950 p-4 text-sm text-slate-100">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">AI response</p>
                <pre className="mt-3 overflow-x-auto rounded-2xl bg-black/20 p-4 text-xs leading-6 text-emerald-300">{generatedCss ? `\`\`\`css\n${generatedCss}\n\`\`\`` : "Awaiting CSS response..."}</pre>
            </div>
            <button
                type="button"
                onClick={acceptGeneratedCss}
                disabled={!generatedCss}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
                <FiCheckCircle className="h-4 w-4" /> Accept CSS design
            </button>
            {builderAccepted ? (
                <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-4 text-sm leading-6 text-indigo-900">
                    CSS accepted. This stylesheet is ready to be stored on the Resume record so every template continues using the same HTML structure.
                </div>
            ) : null}
        </div>
    );
}
