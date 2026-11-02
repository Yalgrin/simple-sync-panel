import {SimpleLibraryListPane} from "./SimpleLibraryListPane.tsx";
import type {PanelAgeRatingDTO} from "../../../models/objects.ts";
import {useDeleteAgeRating, useQueryAgeRatings, useSaveAgeRating} from "../../../hooks/objects.ts";

export function LibraryAgeRatingListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQueryAgeRatings();

    const saveMutation = useSaveAgeRating();
    const deleteMutation = useDeleteAgeRating();

    return (
        <SimpleLibraryListPane<PanelAgeRatingDTO>
            name="Age ratings"
            type="age-rating"
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