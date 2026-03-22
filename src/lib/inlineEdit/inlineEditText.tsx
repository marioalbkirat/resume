"use client";
import { useState, ReactNode, JSX, KeyboardEvent } from "react";

interface InlineEditProps {
    initialValue: string;
    onChange?: (newValue: string) => void;
    className?: string;
    validate?: (newValue: string) => boolean;
    as?: keyof JSX.IntrinsicElements;
    children?: ReactNode;
    title?: string;
}

export default function InlineEditText({
    title,
    initialValue,
    onChange,
    className,
    validate,
    as: Component = "span",
    children
}: InlineEditProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
        const newText = e.currentTarget.innerText.trim();
        if (validate) {
            const isValid = validate(newText);
            if (!isValid) {
                e.currentTarget.innerText = value;
                setIsEditing(false);
                return;
            }
        }
        setValue(newText);
        setIsEditing(false);
        if (onChange) onChange(newText);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const newText = e.currentTarget.innerText.trim();
            if (validate) {
                const isValid = validate(newText);
                if (!isValid) {
                    e.currentTarget.innerText = value;
                    setIsEditing(false);
                    return;
                }
            }
            setValue(newText);
            setIsEditing(false);
            if (onChange) onChange(newText);
        }
        if (e.key === "Escape") {
            e.currentTarget.innerText = value;
            setIsEditing(false);
        }
    };
    const handleClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(document.querySelector('.editable-text.editing') as Node);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }, 0);
    };
    const elementProps: any = {
        title:title,
        className: `editable-text ${isEditing ? "editing" : ""} ${className || ""}`,
        contentEditable: isEditing,
        suppressContentEditableWarning: true,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
        onClick: handleClick,
    };
    return (
        <Component {...elementProps}>
            {value}
            {children}
        </Component>
    );
}