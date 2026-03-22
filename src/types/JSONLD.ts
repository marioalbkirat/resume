export interface JSONLDData {
    visibility_section: boolean,
    plan_type: string,
    schema: PersonSchema;
}
export interface PersonSchema {
    "@context": string;
    "@type": "Person";
    name: string;
    image: string;
    url: string;
    jobTitle: string;
    worksFor: Organization;
    alumniOf: EducationalOrganization;
    knowsAbout: string[];
    knowsLanguage: string[];
    address: PostalAddress;
    contactPoint: ContactPoint;
    sameAs: string[];
    workExample: WorkExample[];
    award: Award[];
}

export interface Organization {
    "@type": "Organization";
    name: string;
    url: string;
}

export interface EducationalOrganization {
    "@type": "EducationalOrganization";
    name: string;
    url: string;
}

export interface PostalAddress {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
}

export interface ContactPoint {
    "@type": "ContactPoint";
    telephone: string;
    email: string;
    contactType: string;
}

export interface WorkExample {
    name?: string;
    description?: string;
    url?: string;
}

export interface Award {
    name?: string;
    date?: string;
    issuer?: string;
    url?: string;
}