import {useMemo} from "react";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {ScoreGroups} from "../../../models/filters.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {FilterSelect} from "../inputs/FilterSelect.tsx";
import {useTranslation} from "react-i18next";
import {translateScoreGroupName} from "../../../functions/gameList.ts";

export function CommunityScoreControl() {
    const {t} = useTranslation();
    const options: SelectOption<number>[] = useMemo(() => {
        return ScoreGroups.map((obj) => ({id: obj.value, name: translateScoreGroupName(t, obj.label)}))
    }, [t]);


    return (
        <BaseFilterControl name={t("filters.controls.communityScore")}>
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.communityScore}
                setFilter={(filterActions, filter) => filterActions.setCommunityScore(filter)}
            />
        </BaseFilterControl>
    );
}