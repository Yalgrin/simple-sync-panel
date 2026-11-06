import type {PanelSourceDTO} from "../../../models/objects.ts";
import {useQuerySources} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import {useTranslation} from "react-i18next";

export function SourceControl() {
    const {t} = useTranslation();
    const {data: options, isLoading, error} = useQuerySources()

    return (
        <BaseFilterControl name={t("filters.controls.source")}>
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