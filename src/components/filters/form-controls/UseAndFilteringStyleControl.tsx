import {Checkbox, FormControlLabel} from "@mui/material";
import {useFilterStore} from "../../../store/useFilterStore.ts";
import type {BaseProps} from "../../common/BaseProps.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";

export function UseAndFilteringStyleControl({sx, children}: Readonly<BaseProps>) {
    const useAndFilteringStyle = useFilterStore((state) => state.useAndFilteringStyle);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl sx={[
            {
                my: "0",
            },
            ...(Array.isArray(sx) ? sx : sx == null ? [] : [sx]),
        ]}>
            <FormControlLabel
                control={<Checkbox checked={useAndFilteringStyle ?? false}
                                   onChange={(event) => filterActions.setUseAndFilteringStyle(event.target.checked)}/>}
                label="Match all filters"
            />
            {children}
        </BaseFilterControl>
    )
}