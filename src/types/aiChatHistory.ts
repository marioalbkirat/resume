import { User } from "./user";
import { UserPortfolioVisitor } from "./userPortfolioVisitor";
import { ChatRole } from "./enums";

export interface AIChatHistory {
    id: string;
    userId: string;
    visitorId: string;
    message: string;
    role: ChatRole;
    createdAt: Date;

    // Relations
    user?: User;
    visitor?: UserPortfolioVisitor;
}
