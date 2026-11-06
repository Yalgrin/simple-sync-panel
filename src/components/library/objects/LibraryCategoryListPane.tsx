import {SimpleLibraryListPane} from "./SimpleLibraryListPane.tsx";
import type {PanelCategoryDTO} from "../../../models/objects.ts";
import {useDeleteCategory, useQueryCategories, useSaveCategory} from "../../../hooks/objects.ts";
import {useTranslation} from "react-i18next";

export function LibraryCategoryListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQueryCategories();
    const {t} = useTranslation();

    const saveMutation = useSaveCategory();
    const deleteMutation = useDeleteCategory();

    return (
        <SimpleLibraryListPane<PanelCategoryDTO>
            name={t('enums.LibraryObjectType.category')}
            type="category"
            addNewEnabled={true}
            objectList={objectList ?? []}
            isLoading={isLoading || saveMutation.isPending || deleteMutation.isPending}
            isPlaceholderData={isPlaceholderData}
            error={error}
            onCreate={async (name: string) => {
                await saveMutation.mutateAsync({name})
            }}
            onSave={async (dto) => {
                await saveMutation.mutateAsync(dto)
            }}
            onDelete={async (dto) => {
                await deleteMutation.mutateAsync(dto)
            }}
        />
    );
}