import {SimpleLibraryListPane} from "./SimpleLibraryListPane.tsx";
import type {PanelCompletionStatusDTO} from "../../../models/objects.ts";
import {
    useDeleteCompletionStatus,
    useQueryCompletionStatuses,
    useSaveCompletionStatus
} from "../../../hooks/objects.ts";
import {useTranslation} from "react-i18next";

export function LibraryCompletionStatusListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQueryCompletionStatuses();
    const {t} = useTranslation();

    const saveMutation = useSaveCompletionStatus();
    const deleteMutation = useDeleteCompletionStatus();

    return (
        <SimpleLibraryListPane<PanelCompletionStatusDTO>
            name={t('enums.LibraryObjectType.completion-status')}
            type="completion-status"
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