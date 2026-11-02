import type {PanelFilterPresetDTO} from "../../../models/objects.ts";
import {useDeleteFilterPreset, useOueryFilterPresets, useSaveFilterPreset} from "../../../hooks/objects.ts";
import {useEffect, useState} from "react";
import {useLibraryListStore} from "../../../store/useLibraryListStore.ts";
import {useNavigate} from "react-router";
import {Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, Paper, Typography} from "@mui/material";
import {TextControl} from "../../common/form-controls/TextControl.tsx";
import {UnsavedChangesGuard} from "../../common/UnsavedChangesGuard.tsx";
import {ComplexLibraryListPane} from "./ComplexLibraryListPane.tsx";

export interface FilterPresetEditFormProps {
    initialValues: PanelFilterPresetDTO;
    isLoading: boolean;
    error: Error | null;
}

function FilterPresetEditForm({
                                  initialValues,
                                  isLoading,
                              }: Readonly<FilterPresetEditFormProps>) {
    const [values, setValues] = useState<PanelFilterPresetDTO>(() => structuredClone(initialValues));

    const saveObject = useSaveFilterPreset();
    const libraryListStoreActions = useLibraryListStore((state) => state.actions);
    const navigate = useNavigate();

    const isDirty = initialValues.name !== values.name || initialValues.showInFullscreenQuickSelection != values.showInFullscreenQuickSelection;
    const [savedDestination, setSavedDestination] = useState<string | null>(null);

    useEffect(() => {
        if (savedDestination !== null) {
            libraryListStoreActions.clear();
            void navigate(savedDestination);
        }
    }, [savedDestination, libraryListStoreActions, navigate]);

    return (
        <Box sx={{
            height: "100%",
            minHeight: 0,
            flex: 2,
            borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
        }}>
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
            }}>
                <Box sx={{
                    position: 'relative',
                    flexDirection: 'column',
                    padding: '16px',
                }}>
                    <Typography variant="h6" sx={{fontWeight: 700, mb: 1}}>
                        Editing filter preset: {initialValues.name}
                    </Typography>

                    <Divider sx={{marginY: "8px"}}/>

                    <TextControl sx={{marginY: "8px"}} name="Name" value={values.name ?? ""}
                                 setValue={(value) => setValues({...values, name: value})}/>
                    <FormControlLabel control={<Checkbox
                        size="small"
                        sx={{justifySelf: "start"}}
                        checked={values.showInFullscreenQuickSelection ?? false}
                        onChange={(event) => setValues({
                            ...values,
                            showInFullscreenQuickSelection: event.target.checked
                        })}
                    />} label="Show as quick filter in Fullscreen mode"/>

                </Box>
            </Box>
            <Paper
                sx={{
                    display: "flex",
                    flexShrink: 0,
                    flexGrow: 0,
                    justifyContent: "space-between",
                    gap: 1,
                    p: 1,
                }}
                elevation={1}
            >
                <Box sx={{flex: 1}}/>
                <Box sx={{display: "flex", gap: 1}}>
                    <Button variant="contained" size="small"
                            disabled={isLoading || saveObject.isPending}
                            onClick={(event) => {
                                event.preventDefault();
                                saveObject.mutate(values, {
                                    onSuccess: () => {
                                        setSavedDestination('/library/filter-preset');
                                    }
                                })
                            }}>Save</Button>
                    <Button variant="outlined" size="small" onClick={() => {
                        libraryListStoreActions.clear();
                    }}>Cancel</Button>
                </Box>
            </Paper>
            <UnsavedChangesGuard preventChange={isDirty && savedDestination === null}/>
        </Box>);
}

export interface FilterPresetEditPaneProps {
    objectList: PanelFilterPresetDTO[];
    isLoading: boolean;
    error: Error | null;
}

function FilterPresetEditPane({
                                  objectList,
                                  isLoading,
                                  error
                              }: Readonly<FilterPresetEditPaneProps>) {
    const selectedObjectId = useLibraryListStore((state) => state.selectedObjectId);
    if (!selectedObjectId) {
        return null;
    }

    if (isLoading) {
        return (
            <Box
                sx={{
                    height: '100%',
                    overflowY: 'auto',
                    flex: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress enableTrackSlot size="10vh" aria-label="Loading..."/>
            </Box>
        )
    }

    const object = objectList.find((o) => o.id === selectedObjectId);

    if (!object) {
        return null;
    }

    return (<FilterPresetEditForm
        key={object.id?.toString()}
        initialValues={object}
        isLoading={isLoading}
        error={error}
    />);
}

export function LibraryFilterPresetListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useOueryFilterPresets();

    const saveMutation = useSaveFilterPreset();
    const deleteMutation = useDeleteFilterPreset();

    return (
        <ComplexLibraryListPane<PanelFilterPresetDTO>
            name="Filter presets"
            type="filter-preset"
            objectList={objectList ?? []}
            isLoading={isLoading || saveMutation.isPending || deleteMutation.isPending}
            isPlaceholderData={isPlaceholderData}
            error={error}
            onSave={async (dto) => {
                await saveMutation.mutateAsync(dto)
            }}
            onDelete={async (dto) => {
                await deleteMutation.mutateAsync(dto)
            }}
        >
            <FilterPresetEditPane
                objectList={objectList ?? []}
                isLoading={isLoading}
                error={error}
            />
        </ComplexLibraryListPane>
    );
}