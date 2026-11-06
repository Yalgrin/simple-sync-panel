import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import {useQueryCompanies} from "../../../hooks/objects.ts";
import type {PanelCompanyDTO} from "../../../models/objects.ts";
import {useTranslation} from "react-i18next";

export function PublisherControl() {
    const {t} = useTranslation();
    const {data: options, isLoading, error} = useQueryCompanies()

    return (
        <BaseFilterControl name={t("filters.controls.publisher")}>
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