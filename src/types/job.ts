import { User } from "./user";

export interface Job {
    id: string;
    title: string;
    users?: User[];
}
export type JobType = Pick<Job, "title" | "id">