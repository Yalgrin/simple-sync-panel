import {useQueryLibraryPlugins} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import type {PanelLibraryPluginDTO} from "../../../models/objects.ts";
import {useTranslation} from "react-i18next";

export function LibraryPluginControl() {
    const {t} = useTranslation();
    const {data: options, isLoading, error} = useQueryLibraryPlugins()

    return (
        <BaseFilterControl name={t("filters.controls.plugin")}>
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