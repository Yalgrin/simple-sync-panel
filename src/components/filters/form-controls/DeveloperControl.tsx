import {useQueryCompanies} from "../../../hooks/objects.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import type {PanelCompanyDTO} from "../../../models/objects.ts";
import {useTranslation} from "react-i18next";

export function DeveloperControl() {
    const {t} = useTranslation();
    const {data: options, isLoading, error} = useQueryCompanies()

    return (
        <BaseFilterControl name={t("filters.controls.developer")}>
            <ToggleableFilterSelect<PanelCompanyDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.developer}
                setFilter={(filterActions, values) => filterActions.setDeveloper(values)}
            />
        </BaseFilterControl>
    );
}