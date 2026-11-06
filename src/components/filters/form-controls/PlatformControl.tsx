import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import type {PanelPlatformDTO} from "../../../models/objects.ts";
import {useQueryPlatforms} from "../../../hooks/objects.ts";
import {useTranslation} from "react-i18next";

export function PlatformControl() {
    const {t} = useTranslation();
    const {data: options, isLoading, error} = useQueryPlatforms()

    return (
        <BaseFilterControl name={t("filters.controls.platform")}>
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