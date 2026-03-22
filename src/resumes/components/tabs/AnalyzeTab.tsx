"use client";

import { FiCheckCircle, FiRefreshCw, FiTarget, FiXCircle } from "react-icons/fi";
import { useResume } from "@/src/context/resumeContext";

export default function AnalyzeTab() {
    const {
        jobDescription,
        setJobDescription,
        analysisResult,
        analysisFeed,
        analysisError,
        analysisState,
        isBusy,
        runAnalysis,
        applyAnalysis,
        rejectAnalysis,
    } = useResume();

    return (
        <div className="space-y-5">
            <div>
                <h3 className="text-xl font-semibold text-slate-900">Analyze resume</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                    Run AI review with or without a job description. Targeted mode adds a match score, missing keywords, and role-specific suggestions.
                </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Optional job description</label>
                <textarea
                    value={jobDescription}
                    onChange={(event) => setJobDescription(event.target.value)}
                    placeholder="Paste a job description to switch from general analysis to targeted match analysis..."
                    className="mt-3 min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-indigo-400"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => void runAnalysis()}
                        disabled={isBusy}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                    >
                        <FiRefreshCw className="h-4 w-4" /> Run AI analysis
                    </button>
                    <button
                        type="button"
                        onClick={() => void applyAnalysis()}
                        disabled={isBusy}
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                    >
                        <FiCheckCircle className="h-4 w-4" /> Accept improvements
                    </button>
                    <button
                        type="button"
                        onClick={rejectAnalysis}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600"
                    >
                        <FiXCircle className="h-4 w-4" /> Ignore suggestions
                    </button>
                </div>
            </div>

            <div className="rounded-3xl bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 p-5 text-white">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{analysisResult?.title ?? "Analysis Results"}</p>
                        <h4 className="mt-2 text-lg font-semibold">{analysisResult?.summary ?? "AI feedback will appear here after analysis."}</h4>
                    </div>
                    {analysisResult?.score ? (
                        <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm font-semibold text-emerald-300">{analysisResult.score}</div>
                    ) : null}
                </div>
                {analysisResult?.keywords?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {analysisResult.keywords.map((keyword) => (
                            <span key={keyword} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                                {keyword}
                            </span>
                        ))}
                    </div>
                ) : null}
                <div className="mt-5 space-y-3">
                    {analysisResult?.improvements.map((improvement) => (
                        <div key={improvement.heading} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                <FiTarget className="h-4 w-4 text-indigo-300" /> {improvement.heading}
                            </div>
                            <p className="mt-2 text-xs leading-5 text-white/60">Before: {improvement.before}</p>
                            <p className="mt-2 text-sm leading-6 text-white/85">After: {improvement.after}</p>
                        </div>
                    ))}
                </div>
                <div className={`mt-5 rounded-2xl border p-4 text-sm leading-6 ${analysisError ? "border-rose-400/20 bg-rose-400/10 text-rose-50" : "border-emerald-400/20 bg-emerald-400/10 text-emerald-50"}`}>
                    {analysisFeed}
                    <span className={`mt-2 block text-xs uppercase tracking-[0.2em] ${analysisError ? "text-rose-200/70" : "text-emerald-200/70"}`}>Status: {analysisState}</span>
                </div>
            </div>
        </div>
    );
}
