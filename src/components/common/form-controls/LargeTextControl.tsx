import {TextControl, type TextControlProps} from "./TextControl.tsx";
import {DEFAULT_LABEL_WIDTH} from "../../../constants/form-controls.ts";
import {mergeStyles} from "../../../functions/util.ts";

export type LargeTextControlProps = TextControlProps;

export function LargeTextControl({
                                     name,
                                     value,
                                     setValue,
                                     disabled = false,
                                     labelWidth = DEFAULT_LABEL_WIDTH,
                                     multiline = true,
                                     minRows = 10,
                                     maxRows = 50,
                                     sx
                                 }: Readonly<LargeTextControlProps>) {
    return (
        <TextControl
            name={name}
            value={value}
            setValue={setValue}
            disabled={disabled}
            labelWidth={labelWidth}
            multiline={multiline}
            minRows={minRows}
            maxRows={maxRows}
            sx={mergeStyles(
                {
                    gridColumn: "1 / -1",
                },
                sx
            )}
        />
    )
}