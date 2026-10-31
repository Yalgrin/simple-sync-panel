import {useFilterStore} from "../../../store/useFilterStore.ts";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {SortOrderDirection} from "../../../models/filters.ts";

export function SortOrderDirectionSelect() {
    const sortingOrderDirection = useFilterStore((state) => state.sortingOrderDirection);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <InputLabel id="sort-order-direction-label" size="small">Sorting direction</InputLabel>
            <Select
                labelId="sort-order-direction-label"
                label="Sorting direction"
                fullWidth
                value={sortingOrderDirection ?? SortOrderDirection.ASCENDING}
                onChange={(event) => filterActions.setSortingOrderDirection(event.target.value as SortOrderDirection)}
                size="small">
                {Object.values(SortOrderDirection).map(order => (
                    <MenuItem key={order} value={order ?? ''}>
                        {order}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}