import {useMemo} from "react";
import {FilterSelect} from "../inputs/FilterSelect.tsx";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {PlaytimeCategories} from "../../../models/filters.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {useTranslation} from "react-i18next";
import {translatePlaytimeCategoryName} from "../../../functions/gameList.ts";

export function TimePlayedControl() {
    const {t} = useTranslation();
    const options: SelectOption<number>[] = useMemo(() => {
        return PlaytimeCategories.map((obj) => ({id: obj.value, name: translatePlaytimeCategoryName(t, obj.label)}))
    }, [t]);

    return (
        <BaseFilterControl name={t("filters.controls.timePlayed")}>
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.playTime}
                setFilter={(filterActions, filter) => filterActions.setPlayTime(filter)}
            />
        </BaseFilterControl>
    );
}