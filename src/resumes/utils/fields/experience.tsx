"use client";
import { createValidator } from "@/utils/validator";
import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import InlineEditLink from "@/lib/inlineEdit/InlineEditLink";
import InlineEditImage from "@/lib/inlineEdit/InlineEditImage";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import CompanyLogo from "../images/companyLogo.webp";
export interface OtherLink {
    id: number;
    link: string;
    title: string;
}
export interface ExperienceItem {
    id: number;
    position: string;
    company: string;
    date: string;
    description: string;
    type: string;
    address: string;
    image: string | object;
    links: {
        title: string;
        links: OtherLink[];
    };
}
export type UpdateFn = (path: (string | number)[], value: unknown) => void;
interface FieldProps {
    value?: string;
    updatePortfolioData: UpdateFn;
    index?: number;
    linkIndex?: number;
    href?: string;
}
export function ExperienceTitle({ value, updatePortfolioData }: FieldProps) {
    return (
        <InlineEditText as="h2" className="section-title" initialValue={value ?? "Experience"}
            validate={(v) => createValidator({ field: "experience title", min: 3, max: 50, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["experience", "title"], val)}
        />
    );
}
export function ExperienceDescription({ value, updatePortfolioData }: FieldProps) {
    return (
        <InlineEditText as="p" title="Section Description" initialValue={value ?? "Professional experience"} className="section-description"
            validate={(v) => createValidator({ field: "section description", min: 3, max: 150, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["experience", "description"], val)}
        />
    );
}
export function ExperiencePosition({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditText
            className="timeline-title"
            validate={(v) => createValidator({ field: "position", min: 3, max: 60, required: true, type: "text" })(v)}
            initialValue={value ?? "Position"}
            onChange={(val) => updatePortfolioData(["experience", "items", index!, "position"], val)}
        />
    );
}
export function ExperienceCompany({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditText as="h5" className="company" initialValue={value ?? "TechNova Solutions"}
            validate={(v) => createValidator({ field: "company", min: 3, max: 50, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["experience", "items", index!, "company"], val)}
        />
    );
}
export function ExperienceDate({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditText as="p" className="date" initialValue={value ?? "YYYY - YYYY"}
            validate={(v) => createValidator({ field: "job date", min: 3, max: 50, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["experience", "items", index!, "date"], val)}
        />
    );
}
export function ExperienceType({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditText initialValue={value ?? "Full-time"}
            validate={(v) => createValidator({ field: "job type", min: 3, max: 50, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["experience", "items", index!, "type"], val)}
        />
    );
}
export function ExperienceAddress({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditText
            title="Work location"
            initialValue={value ?? "City, Country"}
            validate={(v) => createValidator({ field: "Work location field", min: 3, max: 20, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["experience", "items", index!, "address"], val)}
        />
    );
}
export function ExperienceDescriptionText({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditText
            initialValue={value ?? "Job description"}
            onChange={(val) => updatePortfolioData(["experience", "items", index!, "description"], val)}
        />
    );
}
export function ExperienceLinksTitle({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditText
            as="h6"
            title="Experience Links Title"
            initialValue={value ?? "Certifications"}
            validate={(v) => createValidator({ field: "Links Title", min: 3, max: 20, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["experience", "items", index!, "links", "title"], val)}
        />
    );
}
export function ExperienceLink({ value, href, updatePortfolioData, index, linkIndex }: FieldProps & { href?: string }) {
    return (
        <InlineEditLink
            initialText={value ?? "Link Title"}
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
                updatePortfolioData(["experience", "items", index!, "links", "links", linkIndex!, "title"], newText);
                updatePortfolioData(["experience", "items", index!, "links", "links", linkIndex!, "link"], newHref);
            }}
        />
    );
}
export function ExperienceImage({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditImage
            initialSrc={value ?? CompanyLogo}
            alt="Company Logo"
            width={60}
            height={60}
            validate={createValidator({
                field: "Company Image",
                type: "image",
                required: true,
                messages: {
                    invalid: "Please upload a valid image (JPG, PNG, WEBP).",
                    max: "Image must not exceed 2MB.",
                },
            })}
            onChange={(val) => updatePortfolioData(["experience", "items", index!, "image"], val)}
        />
    );
}
export const addExperienceCard = (items: ExperienceItem[], updatePortfolioData: UpdateFn) => {
    if (items.length > 0) {
        const lastCard = items[items.length - 1];
        const incompleteFields: string[] = [];
        if (!lastCard.position || lastCard.position === "Position") incompleteFields.push("Position");
        if (!lastCard.company || lastCard.company === "Company Name") incompleteFields.push("Company");
        if (!lastCard.date || lastCard.date === "YYYY - YYYY") incompleteFields.push("Date");
        if (!lastCard.description || lastCard.description === "Job description") incompleteFields.push("Description");
        if (!lastCard.type || lastCard.type === "Full-time") incompleteFields.push("Type");
        if (!lastCard.address || lastCard.address === "City, Country") incompleteFields.push("Address");
        if (incompleteFields.length > 0) {
            toast.error(`Please complete the last card's fields before adding a new one: ${incompleteFields.join(", ")}.`);
            return;
        }
    }
    const newCard: ExperienceItem = {
        id: items.length > 0 ? Math.max(...items.map((i) => i.id ?? 0)) + 1 : 1,
        position: "Position",
        company: "Company Name",
        date: "YYYY - YYYY",
        description: "Job description",
        type: "Full-time",
        address: "City, Country",
        image: CompanyLogo,
        links: {
            title: "Project Links",
            links: [],
        },
    };
    updatePortfolioData(["experience", "items"], [...items, newCard]);
};
export const deleteExperienceCard = (items: ExperienceItem[], cardId: number, updatePortfolioData: UpdateFn) => {
    if (items.length === 1) {
        toast.error("The experience section cannot be empty.");
        return;
    }
    Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            const updatedItems = items.filter((i) => i.id !== cardId);
            updatePortfolioData(["experience", "items"], updatedItems);
            Swal.fire("Deleted!", "Your card has been deleted.", "success");
        }
    });
};
export const addExperienceLink = (items: ExperienceItem[], index: number, updatePortfolioData: UpdateFn) => {
    const currentLinks = items[index]?.links?.links || [];
    if (currentLinks.length > 0) {
        const lastLink = currentLinks[currentLinks.length - 1];
        const incompleteFields: string[] = [];
        if (!lastLink.title || lastLink.title === "Project Link") incompleteFields.push("Title");
        if (!lastLink.link || lastLink.link === "#" || lastLink.link === "") incompleteFields.push("URL");
        if (incompleteFields.length > 0) {
            toast.error(`Please complete the last link's fields before adding a new one: ${incompleteFields.join(", ")}.`);
            return;
        }
    }
    const newLink = {
        id: currentLinks.length > 0 ? Math.max(...currentLinks.map((l) => l.id)) + 1 : 1,
        title: "Project Link",
        link: "#",
    };
    updatePortfolioData(["experience", "items", index, "links", "links"], [...currentLinks, newLink]);
};
export const removeExperienceLink = (items: ExperienceItem[], index: number, linkId: number, updatePortfolioData: UpdateFn) => {
    const updatedLinks = items[index]?.links?.links.filter((link) => link.id !== linkId);
    updatePortfolioData(["experience", "items", index, "links", "links"], updatedLinks);
};