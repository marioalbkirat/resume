import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/src/style/globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
            </head>

            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ToastContainer />
                {children}
            </body>
        </html>
    );
}