import {useTranslation} from "react-i18next";
import {useMemo} from "react";
import {GroupableField} from "../models/filters.ts";
import type {SelectOption} from "../models/inputs/SelectOption.ts";

export function useGroupingFields(): SelectOption<string>[] {
    const {t} = useTranslation();

    return useMemo(() => {
        const result = Object.entries(GroupableField).map(([id, order]) => {
            return {
                id: order,
                name: t(`enums.GroupableField.${id}`, {defaultValue: order})
            };
        });
        result.sort((a, b) => a.name.localeCompare(b.name));
        return result;
    }, [t]);
}