import {FormControl, FormLabel} from "@mui/material";
import type {BaseProps} from "../../common/BaseProps.ts";
import {mergeStyles} from "../../../functions/util.ts";

export interface BaseFilterControlProps extends BaseProps {
    name?: string;
}

export function BaseFilterControl({
                                      name,
                                      sx,
                                      children
                                  }: Readonly<BaseFilterControlProps>) {
    return (
        <FormControl fullWidth size="small" sx={mergeStyles(
            {
                my: "8px",
            },
            sx,
        )}>
            {Boolean(name) && <FormLabel>{name}</FormLabel>}
            {children}
        </FormControl>
    );
}