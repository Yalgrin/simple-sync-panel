import {useQueryTags} from "../../../hooks/objects.ts";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import type {PanelTagDTO} from "../../../models/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {useTranslation} from "react-i18next";

export function TagControl() {
    const {t} = useTranslation();
    const {data: options, isLoading, error} = useQueryTags()

    return (
        <BaseFilterControl name={t("filters.controls.tag")}>
            <ToggleableFilterSelect<PanelTagDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.tag}
                setFilter={(filterActions, values) => filterActions.setTag(values)}
            />
        </BaseFilterControl>
    );
}