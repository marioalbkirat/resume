"use client";
import InlineEditLink from "@/lib/inlineEdit/InlineEditLink";
import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { createValidator } from "@/utils/validator";
import { toast } from "react-toastify";
interface SocialMediaItem {
    id: number;
    name: string;
    title: string;
    href: string;
    icon: string;
}
export type UpdateFn = (path: (string | number)[], value: unknown) => void;
interface FieldProps {
    value?: string;
    updatePortfolioData: UpdateFn;
    index?: number;
}
export function SocialMediaTitle({ value, updatePortfolioData }: FieldProps) {
    return (
        <InlineEditText as="h2" title="Section Title" initialValue={value ?? "social Media"} className="section-title"
            validate={(v) => createValidator({ field: "section title", min: 3, max: 50, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["socialMedia", "title"], val)}
        />
    );
}
export function SocialMediaDescription({ value, updatePortfolioData }: FieldProps) {
    return (
        <InlineEditText as="p" title="Section Description" initialValue={value ?? "social Media Description"} className="section-description"
            validate={(v) => createValidator({ field: "section description", min: 3, max: 150, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["socialMedia", "description"], val)}
        />
    );
}
export function SocialMediaLink({ value, href, updatePortfolioData, index }: FieldProps & { href?: string }) {
    return (
        <InlineEditLink
            initialText={value ?? "Social Media link"}
            initialHref={href ?? "#"}
            validate={(newTitle, newLink) => {
                const isTitleValid = createValidator({
                    field: "link title",
                    min: 3,
                    max: 50,
                    required: true,
                    type: "text",
                })(newTitle);
                const isLinkValid = createValidator({
                    field: "link src",
                    required: true,
                    type: "link",
                })(newLink);
                return isTitleValid && isLinkValid;
            }}
            onChange={(newText, newHref) => {
                updatePortfolioData(["socialMedia", "items", index!, "title"], newText);
                updatePortfolioData(["socialMedia", "items", index!, "href"], newHref);
            }}
        />
    );
}

export const addSocialMedia = (items: SocialMediaItem[], updatePortfolioData: UpdateFn) => {
    if (items.length > 0) {
        const lastCard = items[items.length - 1];
        if (lastCard.title === "New Social Media" || lastCard.href === "https://example.com") {
            toast.error("Please complete the last card's fields before adding a new one:");
            return;
        }
    }
    const currentItems = items || [];
    const newItem = {
        id: currentItems.length > 0 ? Math.max(...currentItems.map((item) => item.id ?? 0)) + 1 : 1,
        name: "new",
        title: "New Social Media",
        href: "https://example.com",
        icon: "fa fa-envelope"
    };
    updatePortfolioData(["socialMedia", "items"], [...currentItems, newItem]);
};

export const deleteSocialMedia = (items: SocialMediaItem[], cardId: number, updatePortfolioData: UpdateFn) => {
    if (items.length === 1) {
        toast.error("The social media section cannot be empty.");
        return;
    }
    const updatedItems = items.filter((item) => item.id !== cardId);
    updatePortfolioData(["socialMedia", "items"], updatedItems);
};