import { User } from "./user";
import { UserPortfolioVisitor } from "./userPortfolioVisitor";

export interface UserPortfolioInbox {
    id: string;
    email: string;
    message: string;
    subject: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
    visitor?: UserPortfolioVisitor;
    visitorDbId: string;
    userId: string;
}