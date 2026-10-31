import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import {useQueryCompanies} from "../../../hooks/objects.ts";
import type {PanelCompanyDTO} from "../../../models/objects.ts";

export function PublisherControl() {
    const {data: options, isLoading, error} = useQueryCompanies()

    return (
        <BaseFilterControl name="Publisher">
            <ToggleableFilterSelect<PanelCompanyDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.publisher}
                setFilter={(filterActions, values) => filterActions.setPublisher(values)}
            />
        </BaseFilterControl>
    );
}