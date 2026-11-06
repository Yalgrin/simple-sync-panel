import {useQueryReleaseYear} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {FilterSelect} from "../inputs/FilterSelect.tsx";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import {useTranslation} from "react-i18next";

export function ReleaseYearControl() {
    const {t} = useTranslation();
    const {data: options, isLoading, error} = useQueryReleaseYear()
    const releaseYearsObjects: SelectOption<string>[] =
        [
            {id: "{}", name: t("common.none")},
            ...(options?.map((year) => ({id: year, name: year})) ?? [])
        ]

    return (
        <BaseFilterControl name={t("filters.controls.releaseYear")}>
            <FilterSelect<string>
                options={releaseYearsObjects}
                disabled={isLoading || Boolean(error)}
                getFilter={(state) => state.releaseYear}
                setFilter={(filterActions, filter) => filterActions.setReleaseYear(filter)}
            />
        </BaseFilterControl>
    );
}