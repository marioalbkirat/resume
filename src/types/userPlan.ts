import { PlanStatus } from "./enums";
import { User } from "./user";
import { Plan } from "./plan";
import { Payment } from "./payment";
import { UserAIUsage } from "./userAIUsage";

export interface UserPlan {
    id: string;
    userId: string;
    planId: string;
    billing: string;
    startDate: Date;
    endDate: Date | null;
    status: PlanStatus;
    updatedAt: Date;
    user?: User;
    plan?: Plan;
    payments?: Payment[];
    aiUsages?: UserAIUsage[];
}
