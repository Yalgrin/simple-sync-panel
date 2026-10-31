import {useQuerySeries} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import type {PanelSeriesDTO} from "../../../models/objects.ts";

export function SeriesControl() {
    const {data: options, isLoading, error} = useQuerySeries()

    return (
        <BaseFilterControl name="Series">
            <ToggleableFilterSelect<PanelSeriesDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.series}
                setFilter={(filterActions, values) => filterActions.setSeries(values)}
            />
        </BaseFilterControl>
    );
}