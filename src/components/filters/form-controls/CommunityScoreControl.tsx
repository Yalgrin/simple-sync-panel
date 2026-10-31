import {useMemo} from "react";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {ScoreGroups} from "../../../models/filters.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {FilterSelect} from "../inputs/FilterSelect.tsx";

export function CommunityScoreControl() {
    const options: SelectOption<number>[] = useMemo(() => {
        return ScoreGroups.map((obj) => ({id: obj.value, name: obj.label}))
    }, []);

    return (
        <BaseFilterControl name="Community score">
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.communityScore}
                setFilter={(filterActions, filter) => filterActions.setCommunityScore(filter)}
            />
        </BaseFilterControl>
    );
}