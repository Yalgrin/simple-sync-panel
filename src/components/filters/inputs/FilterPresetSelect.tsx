import {useFilterStore} from "../../../store/useFilterStore.ts";
import {useEffect} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useOueryFilterPresets} from "../../../hooks/objects.ts";
import {useTranslation} from "react-i18next";

const NOT_SELECTED = -1;

export function FilterPresetSelect() {
    const {t} = useTranslation();
    const {data: filtersPresets, isLoading: filterPresetsLoading} = useOueryFilterPresets()

    const selectedFilterPresetId = useFilterStore((state) => state.selectedFilterPresetId);
    const filterActions = useFilterStore((state) => state.actions);

    useEffect(() => {
        if (!selectedFilterPresetId) {
            return;
        }
        const selectedPreset = filtersPresets?.find((preset) => preset.id === selectedFilterPresetId);
        if (!selectedPreset) {
            return;
        }

        filterActions.setFromFilterPreset(selectedPreset);
    }, [filtersPresets, filterActions, selectedFilterPresetId]);

    return (
        <FormControl fullWidth size="small" sx={{my: "16px"}}>
            <InputLabel id="filter-preset-label" size="small">{t("filters.controls.filterPreset")}</InputLabel>
            <Select
                labelId="filter-preset-label"
                label={t("filters.controls.filterPreset")}
                disabled={filterPresetsLoading}
                fullWidth
                value={selectedFilterPresetId ?? NOT_SELECTED}
                onChange={(event) => filterActions.setSelectedFilterPresetId(event.target.value as number)}
                size="small">
                <MenuItem value={NOT_SELECTED}>{t("common.none")}</MenuItem>
                {filtersPresets?.map((preset) => (
                    <MenuItem key={preset.id} value={preset.id ?? ""}>
                        {preset.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}