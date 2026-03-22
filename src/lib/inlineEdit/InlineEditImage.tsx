"use client";
import React, { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
type InlineImageEditProps = {
    initialSrc: string | StaticImageData;
    alt?: string;
    width?: number;
    height?: number;
    onChange?: (newSrc: string) => void;
    validate?: (file: File) => boolean;
};
export default function InlineEditImage({
    initialSrc,
    alt = "",
    width = 500,
    height = 350,
    onChange,
    validate,
}: InlineImageEditProps) {
    const [src, setSrc] = useState(initialSrc);
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (validate && !validate(file)) return;
        const tempURL = URL.createObjectURL(file);
        setSrc(tempURL);
        const formData = new FormData();
        formData.append("image", file);
        formData.append("nameImage", src as string);
        setUploading(true);
        try {
            const res = await fetch("/api/upload-Images", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                setSrc(data.url);
                onChange?.(data.url);
            } else {
                console.error("Upload failed", data);
            }
        } catch (err) {
            console.error("Error uploading image:", err);
        } finally {
            setUploading(false);
        }
    };
    return (
        <div
            className="inline-image-wrapper"
            style={{ display: "inline-block", cursor: "pointer", position: "relative" }}
            onClick={() => inputRef.current?.click()}
        >
            <Image unoptimized src={src} alt={alt} width={width} height={height} priority />
            {uploading && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    Uploading...
                </div>
            )}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </div>
    );
}