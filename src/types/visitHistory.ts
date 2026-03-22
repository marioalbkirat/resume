import { User } from "./user";
export interface VisitHistory {
    id: string;
    VisitorId: string;
    userId: string | null;
    language: string | null;
    platform: string | null;
    browser: string | null;
    isMobile: boolean;
    ip: string | null;
    continent: string | null;
    country: string | null;
    city: string | null;
    timezone: string | null;
    countVisits: number;
    userAgent: string | null;
    referrer: string | null;
    location: string | null;
    lastSeen: Date;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
}
