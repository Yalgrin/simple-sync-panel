import {SimpleLibraryListPane} from "./SimpleLibraryListPane.tsx";
import type {PanelFeatureDTO} from "../../../models/objects.ts";
import {useDeleteFeature, useQueryFeatures, useSaveFeature} from "../../../hooks/objects.ts";
import {useTranslation} from "react-i18next";

export function LibraryFeatureListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQueryFeatures();
    const {t} = useTranslation();

    const saveMutation = useSaveFeature();
    const deleteMutation = useDeleteFeature();

    return (
        <SimpleLibraryListPane<PanelFeatureDTO>
            name={t('enums.LibraryObjectType.feature')}
            type="feature"
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