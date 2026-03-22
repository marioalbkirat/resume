"use client";
import React, { useRef } from "react";
type Props = {
    initialSrc: string;
    width?: number;
    height?: number;
    alt?: string;
    style?: React.CSSProperties;
    onChange?: (src: string) => void;
    validate?: (file: File) => boolean;
};
export default function InlineEditImageBasic({
    initialSrc,
    width = 120,
    height = 120,
    alt = "",
    style,
    onChange,
    validate,
}: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [src, setSrc] = React.useState(initialSrc);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (validate && !validate(file)) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setSrc(result);
            onChange?.(result);
        };
        reader.readAsDataURL(file);
    };
    return (
        <>
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{ cursor: "pointer", ...style }}
                onClick={() => fileInputRef.current?.click()}
            />

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChange}
            />
        </>
    );
}