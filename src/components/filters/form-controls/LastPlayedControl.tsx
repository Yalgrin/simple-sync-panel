import {useMemo} from "react";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {PastTimeSegments} from "../../../models/filters.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {FilterSelect} from "../inputs/FilterSelect.tsx";
import {useTranslation} from "react-i18next";
import {translatePastTimeSegmentName} from "../../../functions/gameList.ts";

export function LastPlayedControl() {
    const {t} = useTranslation();
    const options: SelectOption<number>[] = useMemo(() => {
        return PastTimeSegments.map((obj) => ({id: obj.value, name: translatePastTimeSegmentName(t, obj.label)}))
    }, [t]);

    return (
        <BaseFilterControl name={t("filters.controls.lastPlayed")}>
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.lastActivity}
                setFilter={(filterActions, filter) => filterActions.setLastActivity(filter)}
            />
        </BaseFilterControl>
    );
}