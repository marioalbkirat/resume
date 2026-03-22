"use client";

import { ChangeEvent } from "react";
import { FiLink, FiUpload } from "react-icons/fi";
import { useResume } from "@/src/context/resumeContext";

export default function ManageTab() {
    const { handleDraftUpload, uploadedDraftSummary, isBusy } = useResume();

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        void handleDraftUpload(file);
    };

    return (
        <div className="space-y-5">
            <div>
                <h3 className="text-xl font-semibold text-slate-900">Manage resume</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                    Upload an existing resume, extract sections into Draft-ready content, and prepare the CV for portfolio linking.
                </p>
            </div>
            <label className="block rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-indigo-300 hover:bg-indigo-50/40">
                <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={onFileChange} />
                <FiUpload className="mx-auto h-10 w-10 text-slate-400" />
                <p className="mt-3 font-semibold text-slate-900">Upload PDF, Word, or text resume</p>
                <p className="mt-2 text-sm text-slate-600">The uploaded document is analyzed and converted into Draft sections for the management workflow.</p>
                {isBusy ? <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-indigo-600">Processing upload...</p> : null}
            </label>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {uploadedDraftSummary}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 p-4">
                    <p className="font-medium text-slate-900">Draft table sync</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">AI-normalized sections are prepared for Draft persistence and later review.</p>
                </div>
                <div className="rounded-3xl border border-slate-200 p-4">
                    <p className="flex items-center gap-2 font-medium text-slate-900"><FiLink className="h-4 w-4 text-teal-500" /> Portfolio linking</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">The managed resume can be linked to a portfolio after extraction and approval.</p>
                </div>
            </div>
        </div>
    );
}
