import {useQueryLibraryPlugins} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import type {PanelLibraryPluginDTO} from "../../../models/objects.ts";

export function LibraryPluginControl() {
    const {data: options, isLoading, error} = useQueryLibraryPlugins()

    return (
        <BaseFilterControl name="Plugin">
            <ToggleableFilterSelect<PanelLibraryPluginDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                addEmptyOption={false}
                getFilter={(filter) => filter.library}
                setFilter={(filterActions, values) => filterActions.setLibrary(values)}
            />
        </BaseFilterControl>
    );
}