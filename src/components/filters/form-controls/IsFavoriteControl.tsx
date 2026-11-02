import {useFilterStore} from "../../../store/useFilterStore.ts";
import {Checkbox, FormControlLabel} from "@mui/material";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import type {BaseProps} from "../../common/BaseProps.ts";
import {mergeStyles} from "../../../functions/util.ts";

export function IsFavoriteControl({sx, children}: Readonly<BaseProps>) {
    const isFavorite = useFilterStore((state) => state.isFavorite);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl sx={mergeStyles(
            {
                my: "0",
            },
            sx
        )}>
            <FormControlLabel
                control={<Checkbox checked={isFavorite ?? false}
                                   onChange={(event) => filterActions.setIsFavorite(event.target.checked)}/>}
                label="Favorite"
            />
            {children}
        </BaseFilterControl>
    )
}