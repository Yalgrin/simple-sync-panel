import {useFilterStore} from "../../../store/useFilterStore.ts";
import {Checkbox, FormControlLabel, Stack, Tooltip} from "@mui/material";
import type {BaseProps} from "../../common/BaseProps.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {mergeStyles} from "../../../functions/util.ts";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {useTranslation} from "react-i18next";

export function IsInstalledControl({sx, children}: Readonly<BaseProps>) {
    const {t} = useTranslation();
    const isInstalled = useFilterStore((state) => state.isInstalled);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl sx={mergeStyles(
            {
                my: "0",
            },
            sx
        )}>
            <FormControlLabel
                control={<Checkbox checked={isInstalled ?? false}
                                   onChange={(event) => filterActions.setIsInstalled(event.target.checked)}/>}
                label={
                    <Stack direction="row" spacing={0.5} sx={{alignItems: "center"}}>
                        <span>{t("filters.controls.installed")}</span>
                        <Tooltip title={t("filters.controls.notYetImplemented")}>
                            <InfoOutlinedIcon fontSize="small" tabIndex={0}/>
                        </Tooltip>
                    </Stack>
                }
            />
            {children}
        </BaseFilterControl>
    )
}