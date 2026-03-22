"use client";
import { createValidator } from "@/utils/validator";
import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import InlineEditLink from "@/lib/inlineEdit/InlineEditLink";
import InlineEditImage from "@/lib/inlineEdit/InlineEditImage";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ProjectImageSample from "../images/projectImage.jpg";
interface ProjectItem {
    id: number;
    name: string;
    image: string;
    linkName: string;
    linkHref: string;
    description: string;
    techStack: TechStack[];
}
interface TechStack {
    id: number;
    stack: string;
}
export type UpdateFn = (path: (string | number)[], value: unknown) => void;
interface FieldProps {
    value?: string;
    updatePortfolioData: UpdateFn;
    index?: number;
    href?: string;
    stackId?: number;
}
export function ProjectTitle({ value, updatePortfolioData }: FieldProps) {
    return (
        <InlineEditText as="h2" title="Section Title" initialValue={value ?? "Projects & Works"} className="section-title"
            validate={(v) => createValidator({ field: "section title", min: 3, max: 50, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["projects", "title"], val)}
        />
    );
}
export function ProjectDescription({ value, updatePortfolioData }: FieldProps) {
    return (
        <InlineEditText as="p" title="Section Description" initialValue={value ?? "Professional projects"} className="section-description"
            validate={(v) => createValidator({ field: "section description", min: 3, max: 150, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["projects", "description"], val)}
        />
    );
}
export function ProjectImage({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditImage
            initialSrc={value ?? ProjectImageSample}
            alt="project Image"
            width={500}
            height={350}
            validate={createValidator({
                field: "project Image",
                type: "image",
                required: true,
                messages: {
                    invalid: "Please upload a valid image (JPG, PNG, WEBP).",
                    max: "Image must not exceed 2MB.",
                },
            })}
            onChange={(val) => updatePortfolioData(["projects", "items", index!, "image"], val)}
        />
    );
}
export function ProjectName({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditText as="h4" className="title" initialValue={value ?? "Project Name"}
            validate={(v) => createValidator({ field: "position", min: 3, max: 37, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["projects", "items", index!, "name"], val)}
        />
    );
}
export function ProjectItemDescription({ value, updatePortfolioData, index }: FieldProps) {
    return (
        <InlineEditText as="p" className="desc" initialValue={value ?? "A series capturing urban life and its unique moments."}
            validate={(v) => createValidator({ field: "description field", min: 3, max: 203, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["projects", "items", index!, "description"], val)}
        />
    );
}
export function ProjectItemTechStack({ value, updatePortfolioData, index, stackId }: FieldProps) {
    return (
        <InlineEditText initialValue={value ?? "stack"}
            validate={(v) => createValidator({ field: "tech stack field", min: 2, max: 20, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["projects", "items", index!, "techStack", stackId!, "stack"], val)}
        />
    );
}
export function ProjectLink({ value, href, updatePortfolioData, index }: FieldProps & { href?: string }) {
    return (
        <InlineEditLink
            initialText={value ?? "Go to project"}
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
                updatePortfolioData(["projects", "items", index!, "linkName"], newText);
                updatePortfolioData(["projects", "items", index!, "linkHref"], newHref);
            }}
        />
    );
}
export const addProjectCard = (items: ProjectItem[], updatePortfolioData: UpdateFn) => {
    if (items.length > 0) {
        const lastCard = items[items.length - 1];
        const incompleteFields: string[] = [];
        if (lastCard.name === "New Project") incompleteFields.push("name");
        if (lastCard.linkName === "github") incompleteFields.push("linkName");
        if (lastCard.linkHref === "https://github.com") incompleteFields.push("linkHref");
        if (lastCard.description === "Project description goes here...") incompleteFields.push("Description");
        if (incompleteFields.length > 0) {
            toast.error(`Please complete the last card's fields before adding a new one: ${incompleteFields.join(", ")}.`);
            return;
        }
    }
    const currentItems = items || [];
    const newProject = {
        id: currentItems.length > 0 ? Math.max(...currentItems.map((item) => item.id ?? 0)) + 1 : 1,
        name: "New Project",
        image: ProjectImageSample,
        linkName: "github",
        linkHref: "https://github.com",
        description: "Project description goes here...",
        techStack: [{ id: 1, stack: "stack" }]
    };
    updatePortfolioData(["projects", "items"], [...currentItems, newProject]);
};
export const deleteProjectCard = (items: ProjectItem[], cardId: number, updatePortfolioData: UpdateFn) => {
    if (items.length === 1) {
        toast.error("The projects section cannot be empty.");
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
            const updatedItems = items.filter((item) => item.id !== cardId);
            updatePortfolioData(["projects", "items"], updatedItems);
            Swal.fire("Deleted!", "Your project has been deleted.", "success");
        }
    });
    const updatedItems = items.filter((item) => item.id !== cardId);
    updatePortfolioData(["Project", "items"], updatedItems);
};
export const addProjectTechStackItem = (items: TechStack[], updatePortfolioData: UpdateFn) => {
    if (items.length > 0) {
        const lastStack = items[items.length - 1];
        if (lastStack.stack === "stack") {
            toast.error(`Please adjust the last stack`);
            return;
        }
    }
    const currentItems = items || [];
    const newStack = {
        id: currentItems.length > 0 ? Math.max(...currentItems.map((item) => item.id ?? 0)) + 1 : 1,
        techStack: [{ id: 1, stack: "stack" }]
    };
    updatePortfolioData(["projects", "items",], [...currentItems, newStack]);
}
// export const deleteProjectTechStackItem = () => {

// }