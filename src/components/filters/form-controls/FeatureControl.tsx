import type {PanelTagDTO} from "../../../models/objects.ts";
import {useQueryFeatures} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";

export function FeatureControl() {
    const {data: options, isLoading, error} = useQueryFeatures()

    return (
        <BaseFilterControl name="Feature">
            <ToggleableFilterSelect<PanelTagDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.feature}
                setFilter={(filterActions, values) => filterActions.setFeature(values)}
            />
        </BaseFilterControl>
    );
}