import { User } from "./user";
import { DraftType } from "./enums";

export interface Draft {
    id: string;
    userId: string;
    entity: DraftType;
    content: any;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
}
