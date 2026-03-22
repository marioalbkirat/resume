import { User } from "./user";
import { DraftType } from "./enums";
import { JsonValue } from "./json";
import { ResumeGeneratedSection } from "./resumeWorkspace";

export interface Draft {
    id: string;
    userId: string;
    entity: DraftType;
    content: JsonValue;
    aiGeneratedSections?: ResumeGeneratedSection[];
    createdAt: Date;
    updatedAt: Date;
    user?: User;
}
