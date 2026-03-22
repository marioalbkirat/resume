export interface Headers {
    ip: string;
    userAgent: string | null;
    referer: string | null;
    browser: string | null;
    isMobile: boolean;
    platform: string | null;
    cookie: string | null | Record<string, string>;
    language: string | null;
    url: string;
}