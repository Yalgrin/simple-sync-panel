import {SimpleLibraryListPane} from "./SimpleLibraryListPane.tsx";
import type {PanelGenreDTO} from "../../../models/objects.ts";
import {useDeleteGenre, useQueryGenres, useSaveGenre} from "../../../hooks/objects.ts";
import {useTranslation} from "react-i18next";

export function LibraryGenreListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQueryGenres();
    const {t} = useTranslation();

    const saveMutation = useSaveGenre();
    const deleteMutation = useDeleteGenre();

    return (
        <SimpleLibraryListPane<PanelGenreDTO>
            name={t('enums.LibraryObjectType.genre')}
            type="genre"
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