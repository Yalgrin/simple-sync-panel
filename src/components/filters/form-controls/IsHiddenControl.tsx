import {useFilterStore} from "../../../store/useFilterStore.ts";
import {Checkbox, FormControlLabel} from "@mui/material";
import type {BaseProps} from "../../common/BaseProps.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {mergeStyles} from "../../../functions/util.ts";
import {useTranslation} from "react-i18next";

export function IsHiddenControl({sx, children}: Readonly<BaseProps>) {
    const {t} = useTranslation();
    const isHidden = useFilterStore((state) => state.isHidden);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl sx={mergeStyles(
            {
                my: "0",
            },
            sx
        )}>
            <FormControlLabel
                control={<Checkbox checked={isHidden ?? false}
                                   onChange={(event) => filterActions.setIsHidden(event.target.checked)}/>}
                label={t("filters.controls.hidden")}
            />
            {children}
        </BaseFilterControl>
    )
}