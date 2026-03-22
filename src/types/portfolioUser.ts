import { User } from "./user";
import { Portfolio } from "./portfolio";
import { JsonValue } from "./json";

export interface PortfolioUser {
    id: string;
    userId: string;
    portfolioId: string;
    html: string;
    subdomain: string | null;
    content: JsonValue;
    isDeployed: boolean;
    countOfDeploy: number | null;
    updatedAt: Date;
    createdAt: Date;
    user?: User;
    portfolio?: Portfolio;
}