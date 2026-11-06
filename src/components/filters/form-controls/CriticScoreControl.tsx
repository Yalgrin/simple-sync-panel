import {useMemo} from "react";
import {FilterSelect} from "../inputs/FilterSelect.tsx";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {ScoreGroups} from "../../../models/filters.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {useTranslation} from "react-i18next";
import {translateScoreGroupName} from "../../../functions/gameList.ts";

export function CriticScoreControl() {
    const {t} = useTranslation();
    const options: SelectOption<number>[] = useMemo(() => {
        return ScoreGroups.map((obj) => ({id: obj.value, name: translateScoreGroupName(t, obj.label)}))
    }, [t]);

    return (
        <BaseFilterControl name={t("filters.controls.criticScore")}>
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.criticScore}
                setFilter={(filterActions, filter) => filterActions.setCriticScore(filter)}
            />
        </BaseFilterControl>
    );
}