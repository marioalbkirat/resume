import { User } from "./user";
import { Portfolio } from "./portfolio";

export interface PortfolioUser {
    id: string;
    userId: string;
    portfolioId: string;
    html: string;
    subdomain: string | null;
    content: any;
    isDeployed: boolean;
    countOfDeploy: number | null;
    updatedAt: Date;
    createdAt: Date;
    user?: User;
    portfolio?: Portfolio;
}