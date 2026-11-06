import {SimpleLibraryListPane} from "./SimpleLibraryListPane.tsx";
import type {PanelLibraryPluginDTO} from "../../../models/objects.ts";
import {useDeleteLibraryPlugin, useQueryLibraryPlugins, useSaveLibraryPlugin} from "../../../hooks/objects.ts";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

function Description() {
    const {t} = useTranslation();

    return (
        <Typography
            variant="body2"
            color="error"
        >
            {t('library.edit.libraryPluginWarning')}
        </Typography>
    );
}

export function LibraryPluginListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQueryLibraryPlugins();
    const {t} = useTranslation();

    const saveMutation = useSaveLibraryPlugin();
    const deleteMutation = useDeleteLibraryPlugin();

    return (
        <SimpleLibraryListPane<PanelLibraryPluginDTO>
            name={t('enums.LibraryObjectType.library-plugin')}
            type="library-plugin"
            description={<Description/>}
            objectList={objectList ?? []}
            isLoading={isLoading || saveMutation.isPending || deleteMutation.isPending}
            isPlaceholderData={isPlaceholderData}
            error={error}
            onSave={async (dto) => {
                await saveMutation.mutateAsync({
                    dto,
                    icon: null,
                    backgroundImage: null
                })
            }}
            onDelete={async (dto) => {
                await deleteMutation.mutateAsync(dto)
            }}
        />
    );
}