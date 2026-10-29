import {BaseControl, type BaseControlProps} from "./BaseControl.tsx";
import {DEFAULT_LABEL_WIDTH} from "../../../constants/form-controls.ts";
import {TextField, Typography} from "@mui/material";

export interface NumericControlProps extends BaseControlProps {
    name: string;
    value: number;
    setValue: (value: number) => void;
    disabled?: boolean;
}

export function NumericControl({
                                   name,
                                   value,
                                   setValue,
                                   disabled = false,
                                   labelWidth = DEFAULT_LABEL_WIDTH,
                                   sx,
                                   children
                               }: Readonly<NumericControlProps>) {
    return (
        <BaseControl labelWidth={labelWidth} sx={sx}>
            <Typography>{name}</Typography>
            <TextField
                size="small"
                type="number"
                slotProps={{htmlInput: {min: 0, step: 1}}}
                value={value}
                onChange={(event) => {
                    const input = event.target.value;
                    if (input === "") {
                        setValue(0);
                        return;
                    }

                    const nextValue = Number(input);
                    if (Number.isSafeInteger(nextValue) && nextValue >= 0) {
                        setValue(nextValue);
                    }
                }}
                sx={{
                    "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                    },
                    "& input[type=number]": {
                        MozAppearance: "textfield",
                    },
                }}
                fullWidth
                disabled={disabled}
            />
            {children}
        </BaseControl>
    )
}