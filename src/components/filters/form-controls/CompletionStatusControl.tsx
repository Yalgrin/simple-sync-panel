import type {PanelCompletionStatusDTO} from "../../../models/objects.ts";
import {useQueryCompletionStatuses} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import {useTranslation} from "react-i18next";

export function CompletionStatusControl() {
    const {t} = useTranslation();
    const {data: options, isLoading, error} = useQueryCompletionStatuses()

    return (
        <BaseFilterControl name={t("filters.controls.completionStatus")}>
            <ToggleableFilterSelect<PanelCompletionStatusDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.completionStatuses}
                setFilter={(filterActions, values) => filterActions.setCompletionStatuses(values)}
            />
        </BaseFilterControl>
    );
}