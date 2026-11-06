import {useFilterStore} from "../../../store/useFilterStore.ts";
import {TextField} from "@mui/material";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {useTranslation} from "react-i18next";

export function VersionTextControl() {
    const {t} = useTranslation();
    const name = useFilterStore((state) => state.version);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl name={t("filters.controls.version")}>
            <TextField
                fullWidth
                size="small"
                value={name ?? ''}
                onChange={(event) => filterActions.setVersion(event.target.value)}
            />
        </BaseFilterControl>
    );
}