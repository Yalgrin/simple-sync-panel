import {useMemo} from "react";
import {FilterSelect} from "../inputs/FilterSelect.tsx";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {InstallSizeGroups} from "../../../models/filters.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {useTranslation} from "react-i18next";
import {translateInstallSizeName} from "../../../functions/gameList.ts";

export function InstallSizeControl() {
    const {t} = useTranslation();
    const options: SelectOption<number>[] = useMemo(() => {
        return InstallSizeGroups.map((obj) => ({id: obj.value, name: translateInstallSizeName(t, obj.label)}))
    }, [t]);

    return (
        <BaseFilterControl name={t("filters.controls.installSize")}>
            <FilterSelect<number>
                options={options}
                getFilter={(state) => state.installSize}
                setFilter={(filterActions, filter) => filterActions.setInstallSize(filter)}
            />
        </BaseFilterControl>
    );
}