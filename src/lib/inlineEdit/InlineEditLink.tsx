"use client";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

interface InlineEditLinkProps {
    initialText: string;
    initialHref: string;
    onChange?: (newText: string, newHref: string) => void;
    validate?: (newValue: string, nawlink: string) => boolean;
}

export default function InlineEditLink({
    initialText,
    initialHref,
    onChange,
    validate
}: InlineEditLinkProps) {
    const [text, setText] = useState(initialText);
    const [href, setHref] = useState(initialHref);

    const editLinkSweetAlert2 = () => {
        Swal.fire({
            title: "Edit Link",
            html: `
        <input id="swal2-text" class="swal2-input" placeholder="Link text" value="${text.replace(
                /"/g,
                "&quot;"
            )}">
        <input id="swal2-href" class="swal2-input" placeholder="https://example.com" value="${href.replace(
                /"/g,
                "&quot;"
            )}">
      `,
            showCancelButton: true,
            confirmButtonText: "Save",
            focusConfirm: false,
            didOpen: () => {
                const textInput = document.getElementById(
                    "swal2-text"
                ) as HTMLInputElement;
                const hrefInput = document.getElementById(
                    "swal2-href"
                ) as HTMLInputElement;

                if (textInput && hrefInput) {
                    textInput.focus();

                    const handleKeyDown = (e: KeyboardEvent) => {
                        if (e.key === "Enter") Swal.clickConfirm();
                        if (e.key === "Escape") Swal.close();
                    };

                    textInput.addEventListener("keydown", handleKeyDown);
                    hrefInput.addEventListener("keydown", handleKeyDown);
                    const cleanup = () => {
                        textInput.removeEventListener("keydown", handleKeyDown);
                        hrefInput.removeEventListener("keydown", handleKeyDown);
                    };

                    Swal.getPopup()?.addEventListener("remove", cleanup);
                }
            },
            preConfirm: () => {
                const newText =
                    (document.getElementById("swal2-text") as HTMLInputElement)
                        ?.value || "";
                const newHref =
                    (document.getElementById("swal2-href") as HTMLInputElement)
                        ?.value || "";
                return { newText, newHref };
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const newText = result.value.newText.trim();
                const newHref = result.value.newHref.trim();
                if (validate) {
                    const isValid = validate(newText, newHref);
                    if (!isValid) {
                        return;
                    }
                }
                setText(newText);
                setHref(newHref);
                onChange?.(newText, newHref);
            }
        });
    };
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
                e.preventDefault();
                editLinkSweetAlert2();
            }}
            title={`Click to edit link\nCurrent URL: ${href}`}
        >
            {text}
        </Link>
    );
}