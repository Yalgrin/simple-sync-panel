import {Typography} from "@mui/material";
import {formatPlaytime, mergeStyles} from "../../../functions/util.ts";
import {DEFAULT_LABEL_WIDTH} from "../../../constants/form-controls.ts";
import {NumericControl, type NumericControlProps} from "./NumericControl.tsx";

export type TimePlayedControlProps = NumericControlProps

export function TimePlayedControl({
                                      name,
                                      value,
                                      setValue,
                                      disabled = false,
                                      labelWidth = DEFAULT_LABEL_WIDTH,
                                      sx,
                                      children
                                  }: Readonly<TimePlayedControlProps>) {
    return (
        <NumericControl name={name} value={value} setValue={setValue} disabled={disabled} labelWidth={labelWidth}
                        sx={mergeStyles(
                            {
                                gridTemplateColumns: `${labelWidth} minmax(0, 1fr) max-content`,
                            },
                            sx
                        )}>
            <Typography>{formatPlaytime(value)}</Typography>
            {children}
        </NumericControl>
    )
}