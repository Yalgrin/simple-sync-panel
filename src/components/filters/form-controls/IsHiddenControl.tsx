import {useFilterStore} from "../../../store/useFilterStore.ts";
import {Checkbox, FormControlLabel} from "@mui/material";
import type {BaseProps} from "../../common/BaseProps.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";

export function IsHiddenControl({sx, children}: Readonly<BaseProps>) {
    const isHidden = useFilterStore((state) => state.isHidden);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl sx={[
            {
                my: "0",
            },
            ...(Array.isArray(sx) ? sx : sx == null ? [] : [sx]),
        ]}>
            <FormControlLabel
                control={<Checkbox checked={isHidden ?? false}
                                   onChange={(event) => filterActions.setIsHidden(event.target.checked)}/>}
                label="Hidden"
            />
            {children}
        </BaseFilterControl>
    )
}