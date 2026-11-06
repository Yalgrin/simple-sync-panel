import {useFilterStore} from "../../../store/useFilterStore.ts";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {GroupableField} from "../../../models/filters.ts";
import {useGroupingFields} from "../../../hooks/useGroupingFields.ts";
import {useTranslation} from "react-i18next";

export function GroupingFieldSelect() {
    const {t} = useTranslation();
    const groupingOrder = useFilterStore((state) => state.groupingOrder);
    const filterActions = useFilterStore((state) => state.actions);

    const groupingFields = useGroupingFields();

    return (
        <FormControl fullWidth size="small" sx={{marginTop: "8px", marginBottom: "16px"}}>
            <InputLabel id="grouping-field-label" size="small">{t("filters.controls.groupingField")}</InputLabel>
            <Select
                labelId="grouping-field-label"
                label={t("filters.controls.groupingField")}
                fullWidth
                value={groupingOrder ?? GroupableField.NONE}
                onChange={(event) => filterActions.setGroupingOrder(event.target.value as GroupableField)}
                size="small">
                {groupingFields.map(order => (
                    <MenuItem key={order.id} value={order.id ?? ''}>
                        {order.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}