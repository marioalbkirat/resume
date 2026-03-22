import { User } from "./user";

export interface ErrorLog {
    id: string;
    userId: string | null;
    type: string;
    message: string;
    stack: string | null;
    endpoint: string | null;
    createdAt: Date;
    user?: User | null;
}
