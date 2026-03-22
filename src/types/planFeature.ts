import { Plan } from "./plan";

export interface PlanFeature {
    id: string;
    name: string;
    plans?: Plan[];
}
