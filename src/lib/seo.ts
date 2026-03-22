import type { Metadata } from "next";
const SITE_URL = "https://portcv.com";
const SITE_NAME = "PortCV";
type PageSEO = {
    path: string;
    title: string;
    description: string;
    keywords: string[];
};
export function buildMetadata({ path, title, description, keywords }: PageSEO): Metadata {
    const canonical = `${SITE_URL}${path}`;
    return {
        title,
        description,
        keywords,
        alternates: {
            canonical,
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: SITE_NAME,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}
export function buildWebPageJsonLd({
    path,
    title,
    description,
}: {
    path: string;
    title: string;
    description: string;
}): Record<string, unknown>[] {
    const url = `${SITE_URL}${path}`;
    const data: Record<string, unknown>[] = [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            description,
            url,
            isPartOf: {
                "@type": "WebSite",
                name: SITE_NAME,
                url: SITE_URL,
            },
            publisher: {
                "@type": "Organization",
                name: SITE_NAME,
                url: SITE_URL,
            },
        },
    ];
    if (path === "/") {
        data.push({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: SITE_NAME,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description,
            url: SITE_URL,
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
            },
        });
    }
    return data;
}