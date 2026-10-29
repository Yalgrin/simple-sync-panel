import type {PanelObjectDTO} from "../../../models/objects.ts";
import {Typography} from "@mui/material";
import {MultipleObjectSelect} from "../inputs/MultipleObjectSelect.tsx";
import {BaseControl, type BaseControlProps} from "./BaseControl.tsx";
import {DEFAULT_LABEL_WIDTH} from "../../../constants/form-controls.ts";

export interface MultipleObjectControlProps<T extends PanelObjectDTO> extends BaseControlProps {
    name: string;
    value: T[];
    setValue: (value: T[]) => void;
    options: T[];
    setOptions: (options: T[]) => void;
    allowAdd?: boolean;
}

export function MultipleObjectControl<T extends PanelObjectDTO>({
                                                                    name,
                                                                    value,
                                                                    setValue,
                                                                    options,
                                                                    setOptions,
                                                                    allowAdd = false,
                                                                    labelWidth = DEFAULT_LABEL_WIDTH,
                                                                    sx,
                                                                    children
                                                                }: Readonly<MultipleObjectControlProps<T>>) {
    return (
        <BaseControl labelWidth={labelWidth} sx={sx}>
            <Typography>{name}</Typography>
            <MultipleObjectSelect<T> value={value} setValue={setValue} options={options} setOptions={setOptions}
                                     allowAdd={allowAdd}/>
            {children}
        </BaseControl>
    );
}