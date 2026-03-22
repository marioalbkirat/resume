"use client";
import React, { createContext, useContext,ReactNode } from "react";
const ResumeContext = createContext<any | undefined>(undefined);
export const ResumeProvider: React.FC<{ children: ReactNode; resumeId?: string }> = ({ children, resumeId }) => {
    return (
        <ResumeContext.Provider>
            {children}
        </ResumeContext.Provider>
    );
};
export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) throw new Error("useResume must be used inside a ResumeProvider");
    return context;
};