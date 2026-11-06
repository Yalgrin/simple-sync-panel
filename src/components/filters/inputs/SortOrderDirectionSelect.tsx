import {useFilterStore} from "../../../store/useFilterStore.ts";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {SortOrderDirection} from "../../../models/filters.ts";
import {useSortingOrderDirections} from "../../../hooks/useSortingOrderDirections.ts";
import {useTranslation} from "react-i18next";

export function SortOrderDirectionSelect() {
    const {t} = useTranslation();
    const sortingOrderDirection = useFilterStore((state) => state.sortingOrderDirection);
    const filterActions = useFilterStore((state) => state.actions);

    const sortingOrderDirections = useSortingOrderDirections();

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <InputLabel id="sort-order-direction-label"
                        size="small">{t("filters.controls.sortingDirection")}</InputLabel>
            <Select
                labelId="sort-order-direction-label"
                label={t("filters.controls.sortingDirection")}
                fullWidth
                value={sortingOrderDirection ?? SortOrderDirection.ASCENDING}
                onChange={(event) => filterActions.setSortingOrderDirection(event.target.value as SortOrderDirection)}
                size="small">
                {sortingOrderDirections.map(order => (
                    <MenuItem key={order.id} value={order.id ?? ''}>
                        {order.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}