import {useMemo} from "react";
import {FilterSelect} from "../inputs/FilterSelect.tsx";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {PlaytimeCategories} from "../../../models/filters.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";

export function TimePlayedControl() {
    const options: SelectOption<number>[] = useMemo(() => {
        return PlaytimeCategories.map((obj) => ({id: obj.value, name: obj.label}))
    }, []);

    return (
        <BaseFilterControl name="Time played">
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.playTime}
                setFilter={(filterActions, filter) => filterActions.setPlayTime(filter)}
            />
        </BaseFilterControl>
    );
}