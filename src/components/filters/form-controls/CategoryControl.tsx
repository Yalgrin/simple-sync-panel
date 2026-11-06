import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {ToggleableFilterSelect} from "../inputs/ToggleableFilterSelect.tsx";
import {useQueryCategories} from "../../../hooks/objects.ts";
import type {PanelCategoryDTO} from "../../../models/objects.ts";
import {useTranslation} from "react-i18next";

export function CategoryControl() {
    const {t} = useTranslation();
    const {data: options, isLoading, error} = useQueryCategories()

    return (
        <BaseFilterControl name={t("filters.controls.category")}>
            <ToggleableFilterSelect<PanelCategoryDTO>
                options={options}
                isLoading={isLoading}
                error={error}
                getFilter={(filter) => filter.category}
                setFilter={(filterActions, values) => filterActions.setCategory(values)}
            />
        </BaseFilterControl>
    );
}