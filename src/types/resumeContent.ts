import { EducationSection, ExperienceSection, HardSkillsSection, HeroSection, LanguagesSection, ProjectsSection, SocialMediaSection, TechSkillsSection } from "./portfolioContent";
export interface PremiumResumeData {
    hero: Pick<HeroSection, "name" | "image" | "summary" | "position">;
    education: Pick<EducationSection, "items">;
    experience: Pick<ExperienceSection, "items">;
    techSkills: Pick<TechSkillsSection, "items">;
    hardSkills: Pick<HardSkillsSection, "items">;
    projects: Pick<ProjectsSection, "items">;
    languages: Pick<LanguagesSection, "items">;
    socialMedia: Pick<SocialMediaSection, "items">;
}