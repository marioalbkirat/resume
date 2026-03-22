import { ErrorType, Validation } from "@/src/classes/validation/Validation";
import { Resume } from "@/src/types/resume";
import { prisma } from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
type ResumeType = Omit<Resume, "resumeUsers" | "plan">;
export async function GET() {
    try {
        const resumes: ResumeType | null = await prisma.resume.findMany();
        return NextResponse.json(resumes);
    } catch (error) {
        console.log(error);
    }
}
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { name, type, target, image, features, description, planId }: { name: string, type: string, target: string[], image: File, features: string[], description: string, planId: string } = data;

        const errors: ErrorType = Validation.schema({ name, type, target, image, features, description, planId }, {
            name: ["required", "type:string", "min:3", "max:20"],
            type: ["required", "type:enum", "min:3", "max:7"],
            target: ["required", "type:array", "min:1"],
            features: ["required", "type:array", "min:1"],
            image: ["required", "type:file", "max:2"],
            description: ["required", "type:string", "min:3", "max:200"],
            planId: ["required", "type:string", "min:3", "max:200"],
        });
        if (Object.keys(errors).length > 0) return NextResponse.json({ error: errors }, { status: 400 });
        const resume = await prisma.resume.create({
            data: {
                name, type, target, image, features, description, planId
            }
        });
        return NextResponse.json(resume);
    } catch (error) {
        console.log(error);
    }
}