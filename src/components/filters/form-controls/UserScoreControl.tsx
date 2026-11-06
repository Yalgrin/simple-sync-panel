import {useMemo} from "react";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {ScoreGroups} from "../../../models/filters.ts";
import {FilterSelect} from "../inputs/FilterSelect.tsx";
import {useTranslation} from "react-i18next";
import {translateScoreGroupName} from "../../../functions/gameList.ts";

export function UserScoreControl() {
    const {t} = useTranslation();
    const options: SelectOption<number>[] = useMemo(() => {
        return ScoreGroups.map((obj) => ({id: obj.value, name: translateScoreGroupName(t, obj.label)}))
    }, [t]);


    return (
        <BaseFilterControl name={t("filters.controls.userScore")}>
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.userScore}
                setFilter={(filterActions, filter) => filterActions.setUserScore(filter)}
            />
        </BaseFilterControl>
    );
}