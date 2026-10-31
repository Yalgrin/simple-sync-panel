import {Checkbox, FormControlLabel} from "@mui/material";
import {useFilterStore} from "../../../store/useFilterStore.ts";
import type {BaseProps} from "../../common/BaseProps.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";

export function IsUninstalledControl({sx, children}: Readonly<BaseProps>) {
    const isUninstalled = useFilterStore((state) => state.isUninstalled);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl sx={[
            {
                my: "0",
            },
            ...(Array.isArray(sx) ? sx : sx == null ? [] : [sx]),
        ]}>
            <FormControlLabel
                control={<Checkbox checked={isUninstalled ?? false}
                                   onChange={(event) => filterActions.setIsUninstalled(event.target.checked)}/>}
                label="Not installed"
            />
            {children}
        </BaseFilterControl>
    )
}