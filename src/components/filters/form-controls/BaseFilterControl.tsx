import {FormControl, FormLabel} from "@mui/material";
import type {BaseProps} from "../../common/BaseProps.ts";

export interface BaseFilterControlProps extends BaseProps {
    name?: string;
}

export function BaseFilterControl({
                                      name,
                                      sx,
                                      children
                                  }: Readonly<BaseFilterControlProps>) {
    return (
        <FormControl fullWidth size="small" sx={[
            {
                my: "8px",
            },
            ...(Array.isArray(sx) ? sx : sx == null ? [] : [sx]),
        ]}>
            {Boolean(name) && <FormLabel>{name}</FormLabel>}
            {children}
        </FormControl>
    );
}