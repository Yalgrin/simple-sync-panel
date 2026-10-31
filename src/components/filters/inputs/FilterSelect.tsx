import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import type {FilterActions, FilterData, ValueListItemPropertiesDTO} from "../../../models/filters.ts";
import {useCallback, useMemo} from "react";
import {useFilterStore} from "../../../store/useFilterStore.ts";
import {Box} from "@mui/material";
import {MultipleSearchSelect} from "../../common/inputs/MultipleSearchSelect.tsx";

export interface FilterSelectProps<T> {
    options: SelectOption<T>[] | undefined;
    disabled?: boolean;
    error?: Error | null;
    getFilter: (state: FilterData) => ValueListItemPropertiesDTO<T> | null;
    setFilter: (actions: FilterActions, filter: ValueListItemPropertiesDTO<T> | null) => void;
}

export function FilterSelect<T>({
                                    options,
                                    disabled = false,
                                    getFilter,
                                    setFilter,
                                }: Readonly<FilterSelectProps<T>>) {

    const stringMappings: Map<string, SelectOption<T>> = useMemo(() => {
        const map = new Map<string, SelectOption<T>>;
        options?.forEach((o) => {
            map.set(`${o.id}`, o);
        })
        return map;
    }, [options]);

    const objMappings: Map<T, SelectOption<string>> = useMemo(() => {
        const map = new Map<T, SelectOption<string>>;
        options?.forEach((o) => {
            map.set(o.id, {id: `${o.id}`, name: o.name});
        })
        return map;
    }, [options]);

    const optionsNonNull: SelectOption<string>[] = options?.map((o) => {
        return objMappings.get(o.id);
    }).filter((o) => o != null) ?? [];

    const filter = useFilterStore(getFilter);
    const filterActions = useFilterStore((state) => state.actions);

    const value = useMemo(() => filter?.values?.map((v) => objMappings.get(v)).filter((o) => o != null) ?? [],
        [filter, objMappings]
    );

    const handleValueChange = useCallback((values: SelectOption<string>[]) => {
        setFilter(filterActions, {
            values: values.map((v) => {
                return stringMappings.get(v.id)?.id
            }).filter((v) => v != null) ?? []
        });
    }, [setFilter, filterActions, stringMappings]);

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
        }}>
            <MultipleSearchSelect value={value}
                                  setValue={handleValueChange}
                                  options={optionsNonNull}
                                  disabled={disabled}
            />
        </Box>
    );
}