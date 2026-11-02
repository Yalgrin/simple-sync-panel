import type {PanelSourceDTO} from "../../../models/objects.ts";
import {useQuerySources} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";

export function SourceControl() {
    const {data: options, isLoading, error} = useQuerySources()

    return (
        <BaseFilterControl name="Source">
            <ToggleableFilterSelect<PanelSourceDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.source}
                setFilter={(filterActions, values) => filterActions.setSource(values)}
            />
        </BaseFilterControl>
    );
}