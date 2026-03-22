import CVTemplates from "@/src/resumes/page";
import { prisma } from "@/src/utils/db";
import { redirect } from "next/navigation";
interface PageProps { params: { cvId: string; }; }
export default async function Page(props: PageProps) {
    const { cvId } = await props.params;
    const resume = await prisma.resume.findUnique({ where: { name: cvId } });
    if (!resume) redirect("/user/resume");
    return <CVTemplates template={cvId} resumeId={resume.id} />;
}