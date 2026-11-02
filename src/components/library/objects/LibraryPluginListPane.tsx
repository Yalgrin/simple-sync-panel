import {SimpleLibraryListPane} from "./SimpleLibraryListPane.tsx";
import type {PanelLibraryPluginDTO} from "../../../models/objects.ts";
import {useDeleteLibraryPlugin, useQueryLibraryPlugins, useSaveLibraryPlugin} from "../../../hooks/objects.ts";
import {Typography} from "@mui/material";

function Description() {
    return (
        <Typography
            variant="body2"
            color="error"
        >
            Warning! Changes made in this section will not be sent to the plugin users. It's main purpose is to allow
            you to clean up excessive data. Each Playnite instance manages its own plugins and it will likely be
            overwritten on next sync.
        </Typography>
    );
}

export function LibraryPluginListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQueryLibraryPlugins();

    const saveMutation = useSaveLibraryPlugin();
    const deleteMutation = useDeleteLibraryPlugin();

    return (
        <SimpleLibraryListPane<PanelLibraryPluginDTO>
            name="Library plugins"
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