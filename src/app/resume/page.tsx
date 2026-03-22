import ResumeWorkspace from "@/src/resumes/components/ResumeWorkspace";
import { ResumeProvider } from "@/src/context/resumeContext";

export default function Page() {
    return (
        <ResumeProvider>
            <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eef4ff,_#f8f5ff_45%,_#ffffff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <ResumeWorkspace />
                </div>
            </div>
        </ResumeProvider>
    );
}
