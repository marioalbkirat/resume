export interface AuthUser {
    id: string;
    name: string;
    email: string;
    country: string | null;
    image: string | null;
    roleId: string;
    jobId: string | null;
    planId: string;
    emailVerified: string | null;
    createdAt: string;
    updatedAt: string;
    plan: string;
    role: string;
}

export interface AuthSession {
    user: AuthUser;
    sessionToken: string;
    userId: string;
    expires: string;
    createdAt: string;
    updatedAt: string;
}

export default AuthSession;
