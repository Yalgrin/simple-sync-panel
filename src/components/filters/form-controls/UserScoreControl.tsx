import {useMemo} from "react";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {ScoreGroups} from "../../../models/filters.ts";
import {FilterSelect} from "../inputs/FilterSelect.tsx";

export function UserScoreControl() {
    const options: SelectOption<number>[] = useMemo(() => {
        return ScoreGroups.map((obj) => ({id: obj.value, name: obj.label}))
    }, []);

    return (
        <BaseFilterControl name="User score">
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.userScore}
                setFilter={(filterActions, filter) => filterActions.setUserScore(filter)}
            />
        </BaseFilterControl>
    );
}