import {SimpleLibraryListPane} from "./SimpleLibraryListPane.tsx";
import type {PanelSourceDTO} from "../../../models/objects.ts";
import {useDeleteSource, useQuerySources, useSaveSource} from "../../../hooks/objects.ts";
import {useTranslation} from "react-i18next";

export function LibrarySourceListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQuerySources();
    const {t} = useTranslation();

    const saveMutation = useSaveSource();
    const deleteMutation = useDeleteSource();

    return (
        <SimpleLibraryListPane<PanelSourceDTO>
            name={t('enums.LibraryObjectType.source')}
            type="source"
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