import {useFilterStore} from "../../../store/useFilterStore.ts";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {GroupableField} from "../../../models/filters.ts";

export function GroupingFieldSelect() {
    const groupingOrder = useFilterStore((state) => state.groupingOrder);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{marginTop: "8px", marginBottom: "16px"}}>
            <InputLabel id="grouping-field-label" size="small">Grouping field</InputLabel>
            <Select
                labelId="grouping-field-label"
                label="Grouping field"
                fullWidth
                value={groupingOrder ?? GroupableField.NONE}
                onChange={(event) => filterActions.setGroupingOrder(event.target.value as GroupableField)}
                size="small">
                {Object.values(GroupableField).map(order => (
                    <MenuItem key={order} value={order ?? ''}>
                        {order}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}