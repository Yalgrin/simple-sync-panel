import {useQueryGenres} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import type {PanelGenreDTO} from "../../../models/objects.ts";

export function GenreControl() {
    const {data: options, isLoading, error} = useQueryGenres()

    return (
        <BaseFilterControl name="Genre">
            <ToggleableFilterSelect<PanelGenreDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.genre}
                setFilter={(filterActions, values) => filterActions.setGenre(values)}
            />
        </BaseFilterControl>
    );
}