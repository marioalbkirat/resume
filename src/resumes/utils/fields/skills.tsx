"use client";
import { createValidator } from "@/utils/validator";
import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { toast } from "react-toastify";
import InlineEditImage from "@/lib/inlineEdit/InlineEditImage";
import SkillImageSample from "../images/skillImage.jpg";
// interface SkillsSection {
//     title: string;
//     description: string;
//     image: string;
//     items: SkillItem[];
// }
interface SkillItem {
    id: number;
    name: string;
}
export type UpdateFn = (path: (string | number)[], value: unknown) => void;
interface FieldProps {
    value?: string;
    updatePortfolioData: UpdateFn;
    index?: number;
}
export function SkillsTitle({ value, updatePortfolioData }: FieldProps) {
    return (
        <InlineEditText as="h2" title="Section Title" initialValue={value ?? "skills"} className="section-title"
            validate={(v) => createValidator({ field: "section title", min: 3, max: 50, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["skills", "title"], val)}
        />
    );
}
export function SkillsDescription({ value, updatePortfolioData }: FieldProps) {
    return (
        <InlineEditText as="p" title="Section Description" initialValue={value ?? "Professional Works"} className="section-description"
            validate={(v) => createValidator({ field: "section description", min: 3, max: 150, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["skills", "description"], val)}
        />
    );
}
export function SkillName({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditText initialValue={value ?? "Photography"}
            validate={(v) => createValidator({ field: "name field", min: 3, max: 30, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["skills", "items", index!, "name"], val)}
        />
    );
}
export function SkillImage({ value, updatePortfolioData }: FieldProps) {
    return (
        <InlineEditImage
            initialSrc={value ?? SkillImageSample}
            alt="skills Image"
            width={500}
            height={350}
            validate={createValidator({
                field: "skills Image",
                type: "image",
                required: true,
                messages: {
                    invalid: "Please upload a valid image (JPG, PNG, WEBP).",
                    max: "Image must not exceed 2MB.",
                },
            })}
            onChange={(val) => updatePortfolioData(["skills", "image"], val)}
        />
    );
}
export const addSkill = (items: SkillItem[], updatePortfolioData: UpdateFn) => {
    if (items.length > 0) {
        const lastCard = items[items.length - 1];
        if (lastCard.name === "New Skill") {
            toast.error("Please complete the last card's fields before adding a new one:");
            return;
        }
    }
    const currentItems = items || [];
    const newSkill = {
        id: currentItems.length > 0 ? Math.max(...currentItems.map((item) => item.id ?? 0)) + 1 : 1,
        name: "New Skill"
    };
    updatePortfolioData(["skills", "items"], [...currentItems, newSkill]);
};

export const deleteSkill = (items: SkillItem[], cardId: number, updatePortfolioData: UpdateFn) => {
    if (items.length === 1) {
        toast.error("The skills section cannot be empty.");
        return;
    }
    const updatedItems = items.filter((item) => item.id !== cardId);
    updatePortfolioData(["skills", "items"], updatedItems);
};