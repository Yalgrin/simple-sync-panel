import {useMemo} from "react";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {PastTimeSegments} from "../../../models/filters.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {FilterSelect} from "../inputs/FilterSelect.tsx";

export function ModifiedControl() {
    const options: SelectOption<number>[] = useMemo(() => {
        return PastTimeSegments.map((obj) => ({id: obj.value, name: obj.label}))
    }, []);

    return (
        <BaseFilterControl name="Date modified">
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.modified}
                setFilter={(filterActions, filter) => filterActions.setModified(filter)}
            />
        </BaseFilterControl>
    );
}