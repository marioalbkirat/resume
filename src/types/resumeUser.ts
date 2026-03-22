import { User } from "./user";
import { Resume } from "./resume";
import { JsonValue } from "./json";
import { ResumeGeneratedSection } from "./resumeWorkspace";

export interface ResumeUser {
    id: string;
    userId: string;
    resumeId: string;
    content: JsonValue;
    aiGeneratedSections: ResumeGeneratedSection[];
    isDownloaded: boolean;
    isLinkedWithPortfolio: boolean;
    updatedAt: Date;
    createdAt: Date;
    user?: User;
    resume?: Resume;
}
