import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { AboutItem } from "@/types/portfolioContent";
import { createValidator } from "@/utils/validator";
import { toast } from "react-toastify";
export type UpdateFn = (path: (string | number)[], value: unknown) => void;
interface AboutFieldProps {
    value?: string;
    updatePortfolioData: UpdateFn;
    index?: number;
}
export function AboutTitle({ value, updatePortfolioData }: AboutFieldProps) {
    return (
        <InlineEditText as="h2" title="Section Title" initialValue={value ?? "About Me"} className="section-title"
            validate={(v) => createValidator({ field: "section title", min: 3, max: 50, required: true, type: "text" })(v)}
            onChange={(v) => updatePortfolioData(["about", "title"], v)}
        />
    );
}
export function AboutDescription({ value, updatePortfolioData }: AboutFieldProps) {
    return (
        <InlineEditText as="p" title="Section Description" initialValue={value ?? "About Me Description"} className="section-description"
            validate={(v) => createValidator({ field: "section description", min: 3, max: 300, required: true, type: "text" })(v)}
            onChange={(v) => updatePortfolioData(["about", "description"], v)}
        />
    );
}
export function AboutText({ value, updatePortfolioData }: AboutFieldProps) {
    return (
        <InlineEditText title="Enter the label here" initialValue={value ?? "Enter label here"} className="About-name"
            validate={createValidator({ field: "text field", min: 3, max: 20, required: true, type: "text" })}
            onChange={(val) => updatePortfolioData(["about", "text"], val)}
        />
    );
}
export function AboutValue({ value, updatePortfolioData }: AboutFieldProps) {
    return (
        <InlineEditText title="Enter the value here" initialValue={value ?? "Enter the value here"}
            validate={createValidator({ field: "position field", min: 3, max: 10, required: true, type: "text" })}
            onChange={(val) => updatePortfolioData(["about", "value"], val)}
        />
    );
}
export const addAboutCard = (items: AboutItem[], updatePortfolioData: UpdateFn) => {
    if (items.length > 0) {
        const lastCard = items[items.length - 1];
        if (!lastCard.value || lastCard.text === "Lable") {
            toast.error(`Please complete the last card's fields before adding a new one`);
            return;
        }
    }
    const newCard: AboutItem = {
        id: items.length > 0 ? Math.max(...items.map((i) => i.id ?? 0)) + 1 : 1,
        text: "Lable",
        value: "+50"
    };
    updatePortfolioData(["about", "items"], [...items, newCard]);
};
export const deleteAboutCard = (items: AboutItem[], cardId: number, updatePortfolioData: UpdateFn) => {
    if (items.length === 1) {
        toast.error("The About section cannot be empty.");
        return;
    }
    const updatedItems = items.filter((i) => i.id !== cardId);
    updatePortfolioData(["about", "items"], updatedItems);
};