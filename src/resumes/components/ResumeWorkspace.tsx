"use client";

import ResumeControlPanel from "./ResumeControlPanel";
import ResumePreviewPane from "./ResumePreviewPane";

export default function ResumeWorkspace() {
    return (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
            <ResumePreviewPane />
            <ResumeControlPanel />
        </div>
    );
}
