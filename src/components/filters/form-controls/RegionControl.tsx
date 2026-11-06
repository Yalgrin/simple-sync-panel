import {useQueryRegions} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import type {PanelRegionDTO} from "../../../models/objects.ts";
import {useTranslation} from "react-i18next";

export function RegionControl() {
    const {t} = useTranslation();
    const {data: options, isLoading, error} = useQueryRegions()

    return (
        <BaseFilterControl name={t("filters.controls.region")}>
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