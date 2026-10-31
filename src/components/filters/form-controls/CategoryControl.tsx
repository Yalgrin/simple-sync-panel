import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import {useQueryCategories} from "../../../hooks/objects.ts";
import type {PanelCategoryDTO} from "../../../models/objects.ts";

export function CategoryControl() {
    const {data: options, isLoading, error} = useQueryCategories()

    return (
        <BaseFilterControl name="Category">
            <ToggleableFilterSelect<PanelCategoryDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.category}
                setFilter={(filterActions, values) => filterActions.setCategory(values)}
            />
        </BaseFilterControl>
    );
}