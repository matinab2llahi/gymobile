import React from "react";

export interface HeaderFormProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
}