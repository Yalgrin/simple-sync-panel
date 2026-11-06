import {useFilterStore} from "../../../store/useFilterStore.ts";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {SortOrder} from "../../../models/filters.ts";
import {useSortingOrders} from "../../../hooks/useSortingOrders.ts";
import {useTranslation} from "react-i18next";

export function SortOrderSelect() {
    const {t} = useTranslation();
    const sortingOrder = useFilterStore((state) => state.sortingOrder);
    const filterActions = useFilterStore((state) => state.actions);

    const sortingOrders = useSortingOrders();

    return (
        <FormControl fullWidth size="small" sx={{marginTop: "16px", marginBottom: "8px"}}>
            <InputLabel id="sort-order-label" size="small">{t("filters.controls.sortingOrder")}</InputLabel>
            <Select
                labelId="sort-order-label"
                label={t("filters.controls.sortingOrder")}
                fullWidth
                value={sortingOrder ?? SortOrder.NAME}
                onChange={(event) => filterActions.setSortingOrder(event.target.value as SortOrder)}
                size="small">
                {sortingOrders.map(order => (
                    <MenuItem key={order.id} value={order.id ?? ''}>
                        {order.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}