import { User } from "./user";
import { UserPlan } from "./userPlan";

export interface Payment {
    id: string;
    userId: string;
    userPlanId: string | null;
    customerId: string;
    sessionId: string;
    transactionId: string;
    phase: string[];
    status: string[];
    productId: string;
    priceId: string;
    priceName: string;
    currency: string;
    total: number | null;
    success: boolean;
    paymentType: string;
    cardNo4: number | null;
    cardType: string | null;
    cardExpiryMonth: number | null;
    cardExpiryYear: number | null;
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
    userPlan?: UserPlan | null;
}