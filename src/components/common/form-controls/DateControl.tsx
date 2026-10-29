import {BaseControl, type BaseControlProps} from "./BaseControl.tsx";
import {DatePicker} from "@mui/x-date-pickers";
import {Typography} from "@mui/material";
import dayjs from "dayjs";
import {DEFAULT_DATE_CONTROL_FORMAT, DEFAULT_LABEL_WIDTH} from "../../../constants/form-controls.ts";

export interface DateControlProps extends BaseControlProps {
    name: string;
    value: string;
    setValue: (value: string) => void;
    valueFormat?: string;
    disabled?: boolean;
}

export function DateControl({
                                name,
                                value,
                                setValue,
                                valueFormat = DEFAULT_DATE_CONTROL_FORMAT,
                                disabled = false,
                                labelWidth = DEFAULT_LABEL_WIDTH,
                                sx,
                                children
                            }: Readonly<DateControlProps>) {
    return (
        <BaseControl labelWidth={labelWidth} sx={sx}>
            <Typography>{name}</Typography>
            <DatePicker
                value={value ? dayjs(value, valueFormat) : null}
                onChange={(newValue) => setValue(newValue ? dayjs(newValue).format(valueFormat) : "")}
                slotProps={{
                    textField: {size: "small", fullWidth: true},
                }}
                disabled={disabled}
            />
            {children}
        </BaseControl>
    )
}