import {useQueryRegions} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import type {PanelRegionDTO} from "../../../models/objects.ts";

export function RegionControl() {
    const {data: options, isLoading, error} = useQueryRegions()

    return (
        <BaseFilterControl name="Region">
            <ToggleableFilterSelect<PanelRegionDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.region}
                setFilter={(filterActions, values) => filterActions.setRegion(values)}
            />
        </BaseFilterControl>
    );
}