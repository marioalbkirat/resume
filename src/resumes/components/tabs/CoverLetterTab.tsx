"use client";

import { FiMail, FiSend } from "react-icons/fi";
import { useResume } from "@/src/context/resumeContext";

export default function CoverLetterTab() {
    const {
        jobDescription,
        setJobDescription,
        coverLetterCompany,
        setCoverLetterCompany,
        coverLetterHiringManager,
        setCoverLetterHiringManager,
        coverLetterResult,
        coverLetterStatus,
        createCoverLetter,
        isBusy,
    } = useResume();

    return (
        <div className="space-y-5">
            <div>
                <h3 className="text-xl font-semibold text-slate-900">Cover letter</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                    Generate a tailored cover letter from the current resume sections and the target job description.
                </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                    <input
                        value={coverLetterCompany}
                        onChange={(event) => setCoverLetterCompany(event.target.value)}
                        placeholder="Company name"
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400"
                    />
                    <input
                        value={coverLetterHiringManager}
                        onChange={(event) => setCoverLetterHiringManager(event.target.value)}
                        placeholder="Hiring manager"
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400"
                    />
                </div>
                <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Job description</label>
                <textarea
                    value={jobDescription}
                    onChange={(event) => setJobDescription(event.target.value)}
                    placeholder="Paste the job description used to tailor the cover letter..."
                    className="mt-3 min-h-40 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-indigo-400"
                />
                <button
                    type="button"
                    onClick={() => void createCoverLetter()}
                    disabled={isBusy}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                    <FiSend className="h-4 w-4" /> Generate cover letter
                </button>
            </div>

            <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                    <FiMail className="h-4 w-4" /> AI draft
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{coverLetterStatus}</p>

                {coverLetterResult ? (
                    <div className="mt-5 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/85">
                        {coverLetterResult.subject ? <p><span className="font-semibold text-white">Subject:</span> {coverLetterResult.subject}</p> : null}
                        <p>{coverLetterResult.greeting}</p>
                        <p>{coverLetterResult.opening}</p>
                        {coverLetterResult.body.map((paragraph, index) => (
                            <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
                        ))}
                        <p>{coverLetterResult.closing}</p>
                        <p>{coverLetterResult.signature}</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
