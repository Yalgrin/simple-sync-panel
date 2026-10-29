import type {PanelObjectDTO} from "../../../models/objects.ts";
import {Typography} from "@mui/material";
import {SingleObjectSelect} from "../inputs/SingleObjectSelect.tsx";
import {BaseControl, type BaseControlProps} from "./BaseControl.tsx";
import {DEFAULT_LABEL_WIDTH} from "../../../constants/form-controls.ts";

export interface SingleObjectControlProps<T extends PanelObjectDTO> extends BaseControlProps {
    name: string;
    value: T | undefined | null;
    setValue: (value: T | null) => void;
    options: T[];
    setOptions: (options: T[]) => void;
    allowAdd?: boolean;
}

export function SingleObjectControl<T extends PanelObjectDTO>({
                                                                  name,
                                                                  value,
                                                                  setValue,
                                                                  options,
                                                                  setOptions,
                                                                  allowAdd = false,
                                                                  labelWidth = DEFAULT_LABEL_WIDTH,
                                                                  sx,
                                                                  children
                                                              }: Readonly<SingleObjectControlProps<T>>) {
    return (
        <BaseControl labelWidth={labelWidth} sx={sx}>
            <Typography>{name}</Typography>
            <SingleObjectSelect<T> value={value} setValue={setValue} options={options} setOptions={setOptions}
                                   allowAdd={allowAdd}/>
            {children}
        </BaseControl>
    );
}