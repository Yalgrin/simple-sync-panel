import type {PanelAgeRatingDTO} from "../../../models/objects.ts";
import {useQueryAgeRatings} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";

export function AgeRatingControl() {
    const {data: options, isLoading, error} = useQueryAgeRatings()

    return (
        <BaseFilterControl name="Age rating">
            <ToggleableFilterSelect<PanelAgeRatingDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.ageRating}
                setFilter={(filterActions, values) => filterActions.setAgeRating(values)}
            />
        </BaseFilterControl>
    );
}