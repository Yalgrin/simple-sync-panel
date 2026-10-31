import {useFilterStore} from "../../../store/useFilterStore.ts";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {SortOrder} from "../../../models/filters.ts";

export function SortOrderSelect() {
    const sortingOrder = useFilterStore((state) => state.sortingOrder);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{marginTop: "16px", marginBottom: "8px"}}>
            <InputLabel id="sort-order-label" size="small">Sorting order</InputLabel>
            <Select
                labelId="sort-order-label"
                label="Sorting order"
                fullWidth
                value={sortingOrder ?? SortOrder.NAME}
                onChange={(event) => filterActions.setSortingOrder(event.target.value as SortOrder)}
                size="small">
                {Object.values(SortOrder).map(order => (
                    <MenuItem key={order} value={order ?? ''}>
                        {order}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}