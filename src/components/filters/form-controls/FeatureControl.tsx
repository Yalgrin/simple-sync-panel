import type {PanelTagDTO} from "../../../models/objects.ts";
import {useQueryFeatures} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import {useTranslation} from "react-i18next";

export function FeatureControl() {
    const {t} = useTranslation();
    const {data: options, isLoading, error} = useQueryFeatures()

    return (
        <BaseFilterControl name={t("filters.controls.feature")}>
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