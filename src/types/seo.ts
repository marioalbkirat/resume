export interface FaviconData {
    favicon: string | null;
}
export interface CoreMetaData {
    title: string;
    description: string;
}
export interface OpenGraphData {
    title: string | null;
    description: string | null;
    url: string;
    image: string | null;
    enabled: boolean;
    type?: string;
}
export interface TwitterData {
    title: string | null;
    description: string | null;
    url: string;
    image: string | null;
    enabled: boolean;
    card?: string;
}
export interface SEOData {
    favicon: FaviconData;
    CoreMetaData: CoreMetaData;
    openGraph: OpenGraphData;
    twitter: TwitterData;
}