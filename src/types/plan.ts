import { PlanFeature } from "./planFeature";
import { User } from "./user";
import { UserPlan } from "./userPlan";
import { Portfolio } from "./portfolio";
import { Resume } from "./resume";

export interface Plan {
    id: string;
    name: string;
    duration: number;
    price: number;
    billing: string;
    aiTokensLimit: number | null;
    features?: PlanFeature[];
    users?: User[];
    userPlans?: UserPlan[];
    portfolios?: Portfolio[];
    resumes?: Resume[];
}