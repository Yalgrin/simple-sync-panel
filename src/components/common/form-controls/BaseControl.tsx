import {Box, type SxProps, type Theme} from "@mui/material";
import type {ReactNode} from "react";
import {DEFAULT_LABEL_WIDTH} from "../../../constants/form-controls.ts";

export interface BaseControlProps {
    labelWidth?: string;
    sx?: SxProps<Theme>;
    children?: ReactNode;
}

export function BaseControl({
                                labelWidth = DEFAULT_LABEL_WIDTH,
                                sx,
                                children = undefined
                            }: Readonly<BaseControlProps>) {
    return (
        <Box sx={[
            {
                display: "grid",
                gridTemplateColumns: `${labelWidth} minmax(0, 1fr)`,
                gap: "6px",
                alignItems: "center",
            },
            ...(Array.isArray(sx) ? sx : sx == null ? [] : [sx]),
        ]}>
            {children}
        </Box>
    )
}