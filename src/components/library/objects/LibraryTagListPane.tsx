import {SimpleLibraryListPane} from "./SimpleLibraryListPane.tsx";
import type {PanelTagDTO} from "../../../models/objects.ts";
import {useDeleteTag, useQueryTags, useSaveTag} from "../../../hooks/objects.ts";

export function LibraryTagListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQueryTags();

    const saveMutation = useSaveTag();
    const deleteMutation = useDeleteTag();

    return (
        <SimpleLibraryListPane<PanelTagDTO>
            name="Tags"
            type="tag"
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