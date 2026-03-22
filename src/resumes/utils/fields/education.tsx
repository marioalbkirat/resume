import Swal from "sweetalert2";
import InlineEditLink from "@/lib/inlineEdit/InlineEditLink";
import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { createValidator } from "@/utils/validator";
import { toast } from "react-toastify";
type UpdateFn = (path: (string | number)[], value: unknown) => void;
interface OtherLink { id: number; link: string; title: string }
interface EducationItem { id: number; school: string; certificate: string; description: string; date: string; type: string; address: string; links: { title: string; links: OtherLink[] } }
interface EducationFieldProps { value: string; updatePortfolioData: UpdateFn; index?: number; linkIndex?: number }
export function EducationTitle({ value, updatePortfolioData }: EducationFieldProps) {
    return (
        <InlineEditText as="h2" title="Section Title" initialValue={value ?? "Education & Courses"} className="section-title"
            validate={(v) => createValidator({ field: "section title", min: 3, max: 50, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["education", "title"], val)}
        />
    );
}
export function EducationDescription({ value, updatePortfolioData }: EducationFieldProps) {
    return (
        <InlineEditText as="p" title="Section Description" initialValue={value ?? "Professional education"} className="section-description"
            validate={(v) => createValidator({ field: "section description", min: 3, max: 300, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["education", "description"], val)}
        />
    );
}
export function EducationUniversityName({ value, updatePortfolioData, index }: EducationFieldProps) {
    return (
        <InlineEditText title="University Name" initialValue={value ?? "University Name"}
            validate={(v) => createValidator({ field: "University Name", min: 3, max: 50, required: true, type: "text" })(v)}
            onChange={(v) => updatePortfolioData(["education", "items", index!, "school"], v)}
        />
    );
}
export function EducationUniversityDegree({ value, updatePortfolioData, index }: EducationFieldProps) {
    return (
        <InlineEditText as="h5" className="certificate" title="University certificate" initialValue={value ?? "University certificate"}
            validate={(v) => createValidator({ field: "University certificate", min: 3, max: 60, required: true, type: "text" })(v)}
            onChange={(v) => updatePortfolioData(["education", "items", index!, "certificate"], v)}
        />
    );
}
export function EducationUniversityDate({ value, updatePortfolioData, index }: EducationFieldProps) {
    return (
        <InlineEditText
            as="p"
            className="date"
            title="Graduation Date"
            initialValue={value ?? "Graduation Date"}
            validate={(v) => createValidator({ field: "Graduation Date", min: 3, max: 30, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["education", "items", index!, "date"], val)}
        />
    );
}
export function EducationUniversityDescription({ value, updatePortfolioData, index }: EducationFieldProps) {
    return (
        <InlineEditText
            as="p"
            className="description"
            title="Education Description"
            initialValue={value ?? "Description"}
            validate={(v) => createValidator({ field: "Education Description", min: 3, max: 150, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["education", "items", index!, "description"], val)}
        />
    );
}
export function EducationLinksTitle({ value, updatePortfolioData, index }: EducationFieldProps) {
    return (
        <InlineEditText
            as="h6"
            title="Education Links Title"
            initialValue={value ?? "Certifications"}
            validate={(v) => createValidator({ field: "Links Title", min: 3, max: 20, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["education", "items", index!, "links", "title"], val)}
        />
    );
}
export function EducationLink({ value, href, updatePortfolioData, index, linkIndex }: EducationFieldProps & { href?: string }) {
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
                updatePortfolioData(["education", "items", index!, "links", "links", linkIndex!, "title"], newText);
                updatePortfolioData(["education", "items", index!, "links", "links", linkIndex!, "link"], newHref);
            }}
        />
    );
}
export function EducationAddress({ value, updatePortfolioData, index }: EducationFieldProps) {
    return (
        <InlineEditText
            title="Work location"
            initialValue={value ?? "London"}
            validate={(v) => createValidator({ field: "Work location field", min: 3, max: 20, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["education", "items", index!, "address"], val)}
        />
    );
}
export function EducationType({ value, updatePortfolioData, index }: EducationFieldProps) {
    return (
        <InlineEditText
            title="Employment type"
            initialValue={value ?? "Full-time"}
            validate={(v) => createValidator({ field: "Employment type field", min: 3, max: 20, required: true, type: "text" })(v)}
            onChange={(val) => updatePortfolioData(["education", "items", index!, "type"], val)}
        />
    );
}
export const addEducationCard = (items: EducationItem[] = [], updatePortfolioData: UpdateFn) => {
    if (items.length > 0) {
        const lastCard = items[items.length - 1];
        const incompleteFields: string[] = [];
        if (lastCard.school === "New University") incompleteFields.push("School Name");
        if (lastCard.address === "City, Country") incompleteFields.push("Address");
        if (lastCard.date === "YYYY - YYYY") incompleteFields.push("Date");
        if (lastCard.certificate === "certificate Name") incompleteFields.push("certificate");
        if (lastCard.description === "Description") incompleteFields.push("Description");
        if (incompleteFields.length > 0) {
            toast.error(`Please complete the following fields in the last card before adding a new one: ${incompleteFields.join(", ")}.`);
            return;
        }
    }
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newCard: EducationItem = {
        id: newId,
        school: "New University",
        certificate: "certificate Name",
        description: "Description",
        date: "YYYY - YYYY",
        type: "Full-time",
        address: "City, Country",
        links: { title: "Certifications", links: [] },
    };
    updatePortfolioData(["education", "items"], [...items, newCard]);
};
export const deleteEducationCard = (items: EducationItem[], cardId: number, updatePortfolioData: UpdateFn) => {
    if (items.length === 1) {
        toast.error("The education section cannot be empty.");
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
            updatePortfolioData(["education", "items"], updatedItems);
            Swal.fire("Deleted!", "Your card has been deleted.", "success");
        }
    });
};
export const addEducationLink = (items: EducationItem[], index: number, updatePortfolioData: UpdateFn) => {
    const currentLinks = items[index].links.links || [];
    if (currentLinks && currentLinks.length > 0) {
        const lastLink = currentLinks[currentLinks.length - 1];
        const incompleteFields: string[] = [];
        if (!lastLink.title || lastLink.title === "New Link") incompleteFields.push("Title");
        if (!lastLink.link || lastLink.link === "" || lastLink.link === "#") incompleteFields.push("URL");
        if (incompleteFields.length > 0) {
            toast.error(`Please complete the following fields in the last link before adding a new one: ${incompleteFields.join(", ")}.`);
            return;
        }
    }
    const newLink: OtherLink = { id: currentLinks.length > 0 ? Math.max(...currentLinks.map((l) => l.id)) + 1 : 1, title: "New Link", link: "" };
    updatePortfolioData(["education", "items", index, "links", "links"], [...currentLinks, newLink]);
};
export const removeEducationLink = (items: EducationItem[], educationIndex: number, linkId: number, updatePortfolioData: UpdateFn) => {
    const updatedLinks = items[educationIndex].links.links.filter((l) => l.id !== linkId);
    updatePortfolioData(["education", "items", educationIndex, "links", "links"], updatedLinks);
};