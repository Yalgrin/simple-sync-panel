import {useFilterStore} from "../../../store/useFilterStore.ts";
import {useEffect} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useOueryFilterPresets} from "../../../hooks/objects.ts";

const NOT_SELECTED = -1;

export function FilterPresetSelect() {
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
            <InputLabel id="filter-preset-label" size="small">Filter preset</InputLabel>
            <Select
                labelId="filter-preset-label"
                label="Filter preset"
                disabled={filterPresetsLoading}
                fullWidth
                value={selectedFilterPresetId ?? NOT_SELECTED}
                onChange={(event) => filterActions.setSelectedFilterPresetId(event.target.value as number)}
                size="small">
                <MenuItem value={NOT_SELECTED}>(None)</MenuItem>
                {filtersPresets?.map((preset) => (
                    <MenuItem key={preset.id} value={preset.id ?? ""}>
                        {preset.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}