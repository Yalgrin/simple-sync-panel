import {useFilterStore} from "../../../store/useFilterStore.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {TextField} from "@mui/material";
import {useTranslation} from "react-i18next";

export function NameTextControl() {
    const {t} = useTranslation();
    const name = useFilterStore((state) => state.name);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl name={t("common.name")}>
            <TextField
                fullWidth
                size="small"
                value={name ?? ''}
                onChange={(event) => filterActions.setName(event.target.value)}
            />
        </BaseFilterControl>
    );
}