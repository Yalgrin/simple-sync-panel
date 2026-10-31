import {useQueryTags} from "../../../hooks/objects.ts";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import type {PanelTagDTO} from "../../../models/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";

export function TagControl() {
    const {data: options, isLoading, error} = useQueryTags()

    return (
        <BaseFilterControl name="Tag">
            <ToggleableFilterSelect<PanelTagDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.tag}
                setFilter={(filterActions, values) => filterActions.setTag(values)}
            />
        </BaseFilterControl>
    );
}