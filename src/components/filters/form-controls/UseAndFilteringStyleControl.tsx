import {Checkbox, FormControlLabel} from "@mui/material";
import {useFilterStore} from "../../../store/useFilterStore.ts";
import type {BaseProps} from "../../common/BaseProps.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {mergeStyles} from "../../../functions/util.ts";
import {useTranslation} from "react-i18next";

export function UseAndFilteringStyleControl({sx, children}: Readonly<BaseProps>) {
    const {t} = useTranslation();
    const useAndFilteringStyle = useFilterStore((state) => state.useAndFilteringStyle);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl sx={mergeStyles(
            {
                my: "0",
            },
            sx
        )}>
            <FormControlLabel
                control={<Checkbox checked={useAndFilteringStyle ?? false}
                                   onChange={(event) => filterActions.setUseAndFilteringStyle(event.target.checked)}/>}
                label={t("filters.controls.matchAll")}
            />
            {children}
        </BaseFilterControl>
    )
}