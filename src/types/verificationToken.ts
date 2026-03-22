export interface VerificationToken {
    identifier: string;
    token: string;
    expires: Date;
    createdAt: Date;
    updatedAt: Date;
}