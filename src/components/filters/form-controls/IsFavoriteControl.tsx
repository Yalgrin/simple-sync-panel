import {useFilterStore} from "../../../store/useFilterStore.ts";
import {Checkbox, FormControlLabel} from "@mui/material";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import type {BaseProps} from "../../common/BaseProps.ts";

export function IsFavoriteControl({sx, children}: Readonly<BaseProps>) {
    const isFavorite = useFilterStore((state) => state.isFavorite);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl sx={[
            {
                my: "0",
            },
            ...(Array.isArray(sx) ? sx : sx == null ? [] : [sx]),
        ]}>
            <FormControlLabel
                control={<Checkbox checked={isFavorite ?? false}
                                   onChange={(event) => filterActions.setIsFavorite(event.target.checked)}/>}
                label="Favorite"
            />
            {children}
        </BaseFilterControl>
    )
}