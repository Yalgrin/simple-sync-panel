import {useQueryReleaseYear} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {FilterSelect} from "../inputs/FilterSelect.tsx";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";

export function ReleaseYearControl() {
    const {data: options, isLoading, error} = useQueryReleaseYear()
    const releaseYearsObjects: SelectOption<string>[] =
        [
            {id: "{}", name: "(None)"},
            ...(options?.map((year) => ({id: year, name: year})) ?? [])
        ]

    return (
        <BaseFilterControl name="Release year">
            <FilterSelect<string>
                options={releaseYearsObjects}
                disabled={isLoading || Boolean(error)}
                getFilter={(state) => state.releaseYear}
                setFilter={(filterActions, filter) => filterActions.setReleaseYear(filter)}
            />
        </BaseFilterControl>
    );
}