import {useMemo} from "react";
import {FilterSelect} from "../inputs/FilterSelect.tsx";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {InstallSizeGroups} from "../../../models/filters.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";

export function InstallSizeControl() {
    const options: SelectOption<number>[] = useMemo(() => {
        return InstallSizeGroups.map((obj) => ({id: obj.value, name: obj.label}))
    }, []);

    return (
        <BaseFilterControl name="Install size">
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.installSize}
                setFilter={(filterActions, filter) => filterActions.setInstallSize(filter)}
            />
        </BaseFilterControl>
    );
}