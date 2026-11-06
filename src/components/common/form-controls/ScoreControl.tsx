import {Typography} from "@mui/material";
import NumberField from "../inputs/NumberField.tsx";
import {BaseControl, type BaseControlProps} from "./BaseControl.tsx";
import {DEFAULT_LABEL_WIDTH} from "../../../constants/form-controls.ts";

export interface ScoreControlProps extends BaseControlProps {
    name: string;
    value: number | undefined | null;
    setValue: (value: number | null) => void;
    disabled?: boolean;
}

export function ScoreControl({
                                 name,
                                 value,
                                 setValue,
                                 disabled = false,
                                 labelWidth = DEFAULT_LABEL_WIDTH,
                                 sx,
                                 children
                             }: Readonly<ScoreControlProps>) {
    return (
        <BaseControl labelWidth={labelWidth} sx={sx}>
            <Typography>{name}</Typography>
            <NumberField
                size="small"
                value={value}
                onValueChange={setValue}
                min={0}
                max={100}
                disabled={disabled}
            />
            {children}
        </BaseControl>
    )
}