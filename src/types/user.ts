import { Account } from "./account";
import { Payment } from "./payment";
import { PortfolioUser } from "./portfolioUser";
import { Session } from "./session";
import { UserPortfolioVisitor } from "./userPortfolioVisitor";
import { UserPortfolioInbox } from "./userPortfolioInbox";
import { Job } from "./job";
import { UserPlan } from "./userPlan";
import { Plan } from "./plan";
import { VisitHistory } from "./visitHistory";
import { Role } from "./role";
import { Draft } from "./draft";
import { ResumeUser } from "./resumeUser";
import { UserAIUsage } from "./userAIUsage";
import { ErrorLog } from "./errorLog";
import { AIChatHistory } from "./aiChatHistory";


export interface User {
    id: string;
    name: string;
    country: string | null;
    email: string;
    image: string | null;
    roleId: string;
    jobId: string | null;
    planId: string;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;

    // Relations
    accounts?: Account[];
    payments?: Payment[];
    sessions?: Session[];
    visitors?: UserPortfolioVisitor[];
    portfolioUser?: PortfolioUser | null;
    job?: Job | null;
    inbox?: UserPortfolioInbox[];
    userPlans?: UserPlan[];
    plan?: Plan;
    visitHistories?: VisitHistory[];
    role?: Role;
    drafts?: Draft[];
    resumeUser?: ResumeUser | null;
    aiUsages?: UserAIUsage[];
    errorLogs?: ErrorLog[];
    chatHistories?: AIChatHistory[];
}

export interface UserDashboard {
    id: string;
    name: string;
    country: string | null;
    email: string;
    image: string | null;
    job: string | null;
    plan: string;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;

}