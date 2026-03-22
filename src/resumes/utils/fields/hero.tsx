import InlineEditImage from "@/lib/inlineEdit/InlineEditImage";
import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { createValidator } from "@/utils/validator";
interface HeroFieldProps {
    value?: string;
    updatePortfolioData: (path: (string | number)[], value: unknown) => void;
}
export function HeroTitle({ value, updatePortfolioData }: HeroFieldProps) {
    return (
        <InlineEditText as="h2" title="Section Title" initialValue={value ?? "About Me"} className="section-title"
            validate={(v) => createValidator({ field: "section title", min: 3, max: 50, required: true, type: "text" })(v)}
            onChange={(v) => updatePortfolioData(["hero", "title"], v)}
        />
    );
}
export function HeroDescription({ value, updatePortfolioData }: HeroFieldProps) {
    return (
        <InlineEditText as="p" title="Section Description" initialValue={value ?? "About Me Description"} className="section-description"
            validate={(v) => createValidator({ field: "section description", min: 3, max: 300, required: true, type: "text" })(v)}
            onChange={(v) => updatePortfolioData(["hero", "description"], v)}
        />
    );
}
export function HeroImage({ value, updatePortfolioData }: HeroFieldProps) {
    return (
        <InlineEditImage
            initialSrc={value ?? "/images/employee.jpg"}
            alt="Personal photo"
            width={500}
            height={350}
            validate={createValidator({
                field: "Personal photo",
                type: "image",
                required: true,
                messages: {
                    invalid: "Please upload a valid image (JPG, PNG, WEBP).",
                    max: "Image must not exceed 2MB.",
                },
            })}
            onChange={(img) => updatePortfolioData(["hero", "image"], img)}
        />
    );
}
export function HeroName({ value, updatePortfolioData }: HeroFieldProps) {
    return (
        <InlineEditText title="Enter your name here" as="h3" initialValue={value ?? "Enter your name here"} className="hero-name"
            validate={createValidator({ field: "name field", min: 3, max: 30, required: true, type: "text" })}
            onChange={(val) => updatePortfolioData(["hero", "name"], val)}
        />
    );
}
export function HeroPosition({ value, updatePortfolioData }: HeroFieldProps) {
    return (
        <InlineEditText title="Enter your position here" as="h1" initialValue={value ?? "Enter your position here"}
            validate={createValidator({ field: "position field", min: 3, max: 30, required: true, type: "text" })}
            onChange={(val) => updatePortfolioData(["hero", "position"], val)}
        />
    );
}
export function HeroSummary({ value, updatePortfolioData }: HeroFieldProps) {
    return (
        <InlineEditText title="Enter your summary here" as="p" initialValue={value ?? "Enter your summary here"}
            validate={createValidator({ field: "summary field", min: 3, max: 500, required: true, type: "text" })}
            onChange={(v) => updatePortfolioData(["hero", "summary"], v)}
        />
    );
}