import { User } from "./user";
import { UserPlan } from "./userPlan";

export interface UserAIUsage {
    id: string;
    userId: string;
    userPlanId: string | null;
    tokensUsed: number;
    tokensLimit: number;
    periodStart: Date;
    periodEnd: Date;
    updatedAt: Date;
    user?: User;
    userPlan?: UserPlan | null;
}
