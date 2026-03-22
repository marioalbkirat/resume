import { Plan } from "./plan";
import { PortfolioUser } from "./portfolioUser";

export interface Portfolio {
    id: string;
    name: string;
    target: string[];
    image: string;
    features: string[];
    description: string;
    html: string;
    preview: string;
    planId: string;
    plan?: Plan;
    portfolioUsers?: PortfolioUser[];
}