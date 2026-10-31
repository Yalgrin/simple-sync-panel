import {useFilterStore} from "../../../store/useFilterStore.ts";
import {Checkbox, FormControlLabel} from "@mui/material";
import type {BaseProps} from "../../common/BaseProps.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";

export function IsInstalledControl({sx, children}: Readonly<BaseProps>) {
    const isInstalled = useFilterStore((state) => state.isInstalled);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl sx={[
            {
                my: "0",
            },
            ...(Array.isArray(sx) ? sx : sx == null ? [] : [sx]),
        ]}>
            <FormControlLabel
                control={<Checkbox checked={isInstalled ?? false}
                                   onChange={(event) => filterActions.setIsInstalled(event.target.checked)}/>}
                label="Installed"
            />
            {children}
        </BaseFilterControl>
    )
}