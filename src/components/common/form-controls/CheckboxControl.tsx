import {Checkbox, Typography} from "@mui/material";
import {BaseControl, type BaseControlProps} from "./BaseControl.tsx";
import {DEFAULT_LABEL_WIDTH} from "../../../constants/form-controls.ts";

export interface CheckboxControlProps extends BaseControlProps {
    name: string;
    value: boolean;
    setValue: (value: boolean) => void;
    disabled?: boolean;
}

export function CheckboxControl({
                                    name,
                                    value,
                                    setValue,
                                    disabled,
                                    labelWidth = DEFAULT_LABEL_WIDTH,
                                    sx,
                                    children
                                }: Readonly<CheckboxControlProps>) {
    return (
        <BaseControl labelWidth={labelWidth} sx={sx}>
            <Typography>{name}</Typography>
            <Checkbox
                size="small"
                sx={{justifySelf: "start"}}
                checked={value ?? false}
                onChange={(event) => setValue(event.target.checked)}
                disabled={disabled}
            />
            {children}
        </BaseControl>
    )
}