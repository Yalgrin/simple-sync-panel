import {useTranslation} from "react-i18next";
import {useMemo} from "react";
import {SortOrder} from "../models/filters.ts";
import type {SelectOption} from "../models/inputs/SelectOption.ts";

export function useSortingOrders(): SelectOption<string>[] {
    const {t} = useTranslation();

    return useMemo(() => {
        const result = Object.entries(SortOrder).map(([id, order]) => {
            return {
                id: order,
                name: t(`enums.SortOrder.${id}`, {defaultValue: order})
            };
        });
        result.sort((a, b) => a.name.localeCompare(b.name));
        return result;
    }, [t]);
}