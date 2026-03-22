"use client";

import ResumeControlPanel from "./ResumeControlPanel";
import ResumePreviewPane from "./ResumePreviewPane";

export default function ResumeWorkspace() {
    return (
        <div className="grid gap-6 xl:grid-cols-[minmax(360px,0.8fr)_minmax(0,1.2fr)]">
            <ResumeControlPanel />
            <ResumePreviewPane />
        </div>
    );
}
