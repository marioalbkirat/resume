import { JSONLDData } from "./JSONLD";
import { SEOData } from "./seo";
export interface HeroSection {
    plan_type: string;
    visibility_section: boolean;
    cv: string;
    availability: boolean;
    title: string;
    description: string;
    image: string;
    name: string;
    position: string;
    summary: string;
}
export interface EducationSection {
    visibility_section: true,
    plan_type: string,
    title: string,
    description: string,
    items: EducationItem[];
}
export interface EducationItem {
    id: number,
    university: string,
    major: string,
    description: string,
    date: string,
    enrollment: string,
    location: string,
    logo: string,
    link: {
        visibility_item: true,
        id: number,
        url: string,
        title: string
    } | null;
}
export interface CertificationsSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string,
    items: CertificationItem[];
}
export interface CertificationItem {
    id: number,
    name: string,
    issuer: string,
    date: string,
    logo: string | null,
    link: {
        visibility_item: true,
        id: number,
        url: string,
        title: string
    } | null;
}
export interface CoursesSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string,
    items: CourseItem[];
}
export interface CourseItem {
    id: number,
    name: string,
    platform: string,
    date: string,
    logo: string | null,
    link: {
        visibility_item: true,
        id: number,
        url: string,
        title: string
    } | null;
}
export interface AchievementsSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string,
    items: AchievementItem[];
}
export interface AchievementItem {
    id: number,
    label: string,
    value: string
}
export interface AwardsSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string,
    items: AwardItem[];
}
export interface AwardItem {
    id: number,
    name: string,
    issuer: string,
    year: string,
    logo: string | null,
    link: {
        visibility_item: true,
        id: number,
        url: string,
        title: string
    } | null;
}
export interface ExperienceSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string,
    items: ExperienceItem[];
}
export interface ExperienceItem {
    id: number,
    position: string,
    company: string,
    date: string,
    description: string,
    enrollment: string,
    location: string,
    logo: string,
    link: {
        visibility_item: true,
        id: number,
        url: string,
        title: string
    } | null;
}
export interface TechSkillsSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string,
    items: TechSkillItem[];
}
export interface TechSkillItem {
    id: number,
    name: string
}
export interface HardSkillsSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string,
    items: HardSkillItem[];
}
export interface HardSkillItem {
    id: number;
    name: string;
}
export interface ServicesSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string,
    items: ServiceItem[];
}
export interface ServiceItem {
    id: number,
    title: string,
    description: string
}
export interface ProjectsSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string,
    items: ProjectItem[];
}
export interface ProjectItem {
    id: number,
    name: string,
    description: string,
    image: string,
    link: {
        visibility_item: true,
        id: number,
        url: string,
        title: string
    } | null,
    tech: string[];
}
export interface TestimonialsSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string,
    items: TestimonialItem[];
}
export interface TestimonialItem {
    id: number,
    name: string,
    role: string,
    feedback: string
}
export interface LanguagesSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string,
    items: LanguageItem[];
}
export interface LanguageItem {
    id: number,
    lang: string,
    level: string
}
export interface ContactSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string
}
export interface SocialMediaSection {
    visibility_section: boolean,
    plan_type: string,
    title: string,
    description: string,
    items: SocialMediaItem[];
}
export interface SocialMediaItem {
    id: number,
    title: string,
    url: string
}
export interface FreePortfolioData {
    seo: Pick<SEOData, "CoreMetaData">;
    hero: HeroSection;
    education: EducationSection;
    experience: ExperienceSection;
    techSkills: TechSkillsSection;
    hardSkills: HardSkillsSection;
    projects: ProjectsSection;
    languages: LanguagesSection;
    socialMedia: SocialMediaSection;
}
export interface PremiumPortfolioData {
    seo: SEOData;
    jsonLD: JSONLDData;
    hero: HeroSection;
    education: EducationSection;
    experience: ExperienceSection;
    techSkills: TechSkillsSection;
    hardSkills: HardSkillsSection;
    projects: ProjectsSection;
    languages: LanguagesSection;
    socialMedia: SocialMediaSection;
    services: ServicesSection;
    contact: ContactSection;
    testimonials: TestimonialsSection;
    awards: AwardsSection;
    achievements: AchievementsSection;
    courses: CoursesSection;
    certifications: CertificationsSection;
}