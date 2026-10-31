import {useMemo} from "react";
import {FilterSelect} from "../inputs/FilterSelect.tsx";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {ScoreGroups} from "../../../models/filters.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";

export function CriticScoreControl() {
    const options: SelectOption<number>[] = useMemo(() => {
        return ScoreGroups.map((obj) => ({id: obj.value, name: obj.label}))
    }, []);

    return (
        <BaseFilterControl name="Critic score">
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.criticScore}
                setFilter={(filterActions, filter) => filterActions.setCriticScore(filter)}
            />
        </BaseFilterControl>
    );
}