import { User } from "./user";
import { AIChatHistory } from "./aiChatHistory";
import { UserPortfolioInbox } from "./userPortfolioInbox";

export interface UserPortfolioVisitor {
    id: string;
    userId: string;
    ip: string;
    country: string;
    city: string;
    region: string;
    timezone: string;
    countVisits: number;
    cvDownloadCount: number;
    location: string;
    geolocation: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
    chatHistories?: AIChatHistory[];
    inboxMessages?: UserPortfolioInbox[];
}
