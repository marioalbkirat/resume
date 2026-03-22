import { VisitHistory } from "./visitHistory";

export interface Tracking {
    id: string;
    visitHistoryId: string;
    url: string;
    referrer: string | null;
    createdAt: Date;
    visitHistory: VisitHistory[];
}
