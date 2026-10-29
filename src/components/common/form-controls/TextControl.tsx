import {TextField, Typography} from "@mui/material";
import {BaseControl, type BaseControlProps} from "./BaseControl.tsx";
import {DEFAULT_LABEL_WIDTH} from "../../../constants/form-controls.ts";

export interface TextControlProps extends BaseControlProps {
    name: string;
    value: string;
    setValue: (value: string) => void;
    disabled?: boolean;
    multiline?: boolean;
    minRows?: number;
    maxRows?: number;
}

export function TextControl({
                                name,
                                value,
                                setValue,
                                disabled = false,
                                labelWidth = DEFAULT_LABEL_WIDTH,
                                multiline = false,
                                minRows = undefined,
                                maxRows = undefined,
                                sx,
                                children
                            }: Readonly<TextControlProps>) {
    return (
        <BaseControl labelWidth={labelWidth} sx={sx}>
            <Typography>{name}</Typography>
            <TextField
                size="small"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                fullWidth
                disabled={disabled}
                multiline={multiline}
                minRows={minRows}
                maxRows={maxRows}
            />
            {children}
        </BaseControl>
    )
}