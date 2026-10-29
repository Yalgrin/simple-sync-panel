import {Typography} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {BaseControl, type BaseControlProps} from "./BaseControl.tsx";
import {DEFAULT_DATE_TIME_CONTROL_FORMAT, DEFAULT_LABEL_WIDTH} from "../../../constants/form-controls.ts";

export interface DateTimeControlProps extends BaseControlProps {
    name: string;
    value: string;
    setValue: (value: string) => void;
    valueFormat?: string;
    disabled?: boolean;
}

export function DateTimeControl({
                                    name,
                                    value,
                                    setValue,
                                    valueFormat = DEFAULT_DATE_TIME_CONTROL_FORMAT,
                                    disabled = false,
                                    labelWidth = DEFAULT_LABEL_WIDTH,
                                    sx,
                                    children
                                }: Readonly<DateTimeControlProps>) {

    return (
        <BaseControl labelWidth={labelWidth} sx={sx}>
            <Typography>{name}</Typography>
            <DateTimePicker
                views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
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