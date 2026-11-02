import {SimpleLibraryListPane} from "./SimpleLibraryListPane.tsx";
import type {PanelCompanyDTO} from "../../../models/objects.ts";
import {useDeleteCompany, useQueryCompanies, useSaveCompany} from "../../../hooks/objects.ts";

export function LibraryCompanyListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQueryCompanies();

    const saveMutation = useSaveCompany();
    const deleteMutation = useDeleteCompany();

    return (
        <SimpleLibraryListPane<PanelCompanyDTO>
            name="Company"
            type="company"
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