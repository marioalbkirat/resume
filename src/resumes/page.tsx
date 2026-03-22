"use client";
import { ReactNode } from "react";
import CPanelResume from "./utils/cPanelResume";
import { ResumeProvider } from "../context/resumeContext";
import OliviaResume from "./templates/olivia/olivia";
interface FreeTemplateProps { template: string; resumeId: string; }
export default function CVTemplates({ template, resumeId }: FreeTemplateProps) {
    let temp: ReactNode;
    switch (template) {
        case "test":
            temp = (
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "2rem" }}>
                    <CPanelResume />
                    <OliviaResume />
                </div>
            );
            break;
        default:
            temp = null;
            break;
    }
    return (
        <ResumeProvider resumeId={resumeId}>
            {temp}
        </ResumeProvider>
    );
}

