"use client";
import { createValidator } from "@/utils/validator";
import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { toast } from "react-toastify";
interface LanguageItem {
    id: number;
    lang: string;
    level: string;
}
export type UpdateFn = (path: (string | number)[], value: unknown) => void;
interface FieldProps {
    value?: string;
    updatePortfolioData: UpdateFn;
    index?: number;
}
export function LanguageTitle({ value, updatePortfolioData }: FieldProps) {
    return (
        <InlineEditText as="h2" title="Section Title" initialValue={value ?? "languages"} className="section-title"
            validate={(v) => createValidator({ field: "section title", min: 3, max: 50, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["languages", "title"], val)}
        />
    );
}
export function LanguageDescription({ value, updatePortfolioData }: FieldProps) {
    return (
        <InlineEditText as="p" title="Section Description" initialValue={value ?? "languages Description"} className="section-description"
            validate={(v) => createValidator({ field: "section description", min: 3, max: 150, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["languages", "description"], val)}
        />
    );
}
export function LanguageName({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditText initialValue={value ?? "English"}
            validate={(v) => createValidator({ field: "language field", min: 3, max: 30, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["languages", "items", index!, "lang"], val)}
        />
    );
}
export function LanguageLevel({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditText as="h6" initialValue={value ?? "Native"}
            validate={(v) => createValidator({ field: "level field", min: 3, max: 30, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["languages", "items", index!, "level"], val)}
        />
    );
}
export const addLanguage = (items: LanguageItem[], updatePortfolioData: UpdateFn) => {
    if (items.length > 0) {
        const lastCard = items[items.length - 1];
        if (lastCard.lang === "New Language" || lastCard.level === "Beginner") {
            toast.error("Please complete the last card's fields before adding a new one:");
            return;
        }
    }
    const currentItems = items || [];
    const newLanguage = {
        id: currentItems.length > 0 ? Math.max(...currentItems.map((item) => item.id ?? 0)) + 1 : 1,
        lang: "New Language",
        level: "Beginner"
    };
    updatePortfolioData(["languages", "items"], [...currentItems, newLanguage]);
};

export const deleteLanguage = (items: LanguageItem[], cardId: number, updatePortfolioData: UpdateFn) => {
    if (items.length === 1) {
        toast.error("The language section cannot be empty.");
        return;
    }
    const updatedItems = items.filter((item) => item.id !== cardId);
    updatePortfolioData(["languages", "items"], updatedItems);
};