import {Box} from "@mui/material";
import {DEFAULT_LABEL_WIDTH} from "../../../constants/form-controls.ts";
import type {BaseProps} from "../BaseProps.ts";
import {mergeStyles} from "../../../functions/util.ts";

export interface BaseControlProps extends BaseProps {
    labelWidth?: string;
}

export function BaseControl({
                                labelWidth = DEFAULT_LABEL_WIDTH,
                                sx,
                                children = undefined
                            }: Readonly<BaseControlProps>) {
    return (
        <Box sx={mergeStyles(
            {
                display: "grid",
                gridTemplateColumns: `${labelWidth} minmax(0, 1fr)`,
                gap: "6px",
                alignItems: "center",
            }, sx)}>
            {children}
        </Box>
    )
}