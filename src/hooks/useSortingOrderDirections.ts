import {useTranslation} from "react-i18next";
import {useMemo} from "react";
import {SortOrderDirection} from "../models/filters.ts";
import type {SelectOption} from "../models/inputs/SelectOption.ts";

export function useSortingOrderDirections(): SelectOption<string>[] {
    const {t} = useTranslation();

    return useMemo(() => {
        return Object.entries(SortOrderDirection).map(([id, order]) => {
            return {
                id: order,
                name: t(`enums.SortOrderDirection.${id}`, {defaultValue: order})
            };
        });
    }, [t]);
}