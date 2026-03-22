import { User } from "./user";

export interface Session {
    sessionToken: string;
    userId: string;
    expires: Date;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
}