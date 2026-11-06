import {SimpleLibraryListPane} from "./SimpleLibraryListPane.tsx";
import type {PanelSeriesDTO} from "../../../models/objects.ts";
import {useDeleteSeries, useQuerySeries, useSaveSeries} from "../../../hooks/objects.ts";
import {useTranslation} from "react-i18next";

export function LibrarySeriesListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQuerySeries();
    const {t} = useTranslation();

    const saveMutation = useSaveSeries();
    const deleteMutation = useDeleteSeries();

    return (
        <SimpleLibraryListPane<PanelSeriesDTO>
            name={t('enums.LibraryObjectType.series')}
            type="series"
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