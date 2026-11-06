import {useQuerySeries} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import type {PanelSeriesDTO} from "../../../models/objects.ts";
import {useTranslation} from "react-i18next";

export function SeriesControl() {
    const {t} = useTranslation();
    const {data: options, isLoading, error} = useQuerySeries()

    return (
        <BaseFilterControl name={t("filters.controls.series")}>
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