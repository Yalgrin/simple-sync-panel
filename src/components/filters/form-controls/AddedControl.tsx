import {useMemo} from "react";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {PastTimeSegments} from "../../../models/filters.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {FilterSelect} from "../inputs/FilterSelect.tsx";
import {useTranslation} from "react-i18next";
import {translatePastTimeSegmentName} from "../../../functions/gameList.ts";

export function AddedControl() {
    const {t} = useTranslation();
    const options: SelectOption<number>[] = useMemo(() => {
        return PastTimeSegments.map((obj) => ({id: obj.value, name: translatePastTimeSegmentName(t, obj.label)}))
    }, [t]);

    return (
        <BaseFilterControl name={t("filters.controls.dateAdded")}>
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.added}
                setFilter={(filterActions, filter) => filterActions.setAdded(filter)}
            />
        </BaseFilterControl>
    );
}