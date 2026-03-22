import { User } from "./user";
import { Resume } from "./resume";

export interface ResumeUser {
    id: string;
    userId: string;
    resumeId: string;
    content: any;
    isDownloaded: boolean;
    isLinkedWithPortfolio: boolean;
    updatedAt: Date;
    createdAt: Date;
    user?: User;
    resume?: Resume;
}
