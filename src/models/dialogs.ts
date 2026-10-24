import {type ComponentType} from "react";

export type DialogOptions = {
    title: string;
    render: ComponentType<{ close: () => void }>;
};

export type DialogContextValue = {
    openDialog: (options: DialogOptions) => void;
    closeDialog: () => void;
};