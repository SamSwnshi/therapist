"use client";

import { cn } from "@/lib/utils";

export function Container({ children, className, ...props }) {
    return (
        <div
            className={cn(
                "w-full max-w-screen-2xl mx-auto px-2.5 md:px-20",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
