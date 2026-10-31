import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import type {PanelPlatformDTO} from "../../../models/objects.ts";
import {useQueryPlatforms} from "../../../hooks/objects.ts";

export function PlatformControl() {
    const {data: options, isLoading, error} = useQueryPlatforms()

    return (
        <BaseFilterControl name="Platform">
            <ToggleableFilterSelect<PanelPlatformDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.platform}
                setFilter={(filterActions, values) => filterActions.setPlatform(values)}
            />
        </BaseFilterControl>
    );
}