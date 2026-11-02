import type {PanelRegionDTO} from "../../../models/objects.ts";
import {useDeleteRegion, useQueryRegions, useQueryRegionSpecifications, useSaveRegion} from "../../../hooks/objects.ts";
import {useEffect, useState} from "react";
import {useLibraryListStore} from "../../../store/useLibraryListStore.ts";
import {useNavigate} from "react-router";
import {Box, Button, CircularProgress, Divider, Paper, Typography} from "@mui/material";
import {TextControl} from "../../common/form-controls/TextControl.tsx";
import {BaseControl} from "../../common/form-controls/BaseControl.tsx";
import {SingleSearchSelect} from "../../common/inputs/SingleSearchSelect.tsx";
import {UnsavedChangesGuard} from "../../common/UnsavedChangesGuard.tsx";
import {ComplexLibraryListPane} from "./ComplexLibraryListPane.tsx";
import type {RegionSpecification} from "../../../models/library/RegionSpecification.ts";

export interface RegionEditFormProps {
    initialValues: PanelRegionDTO;
    specifications: RegionSpecification[];
    isLoading: boolean;
    error: Error | null;
}

function RegionEditForm({
                            initialValues,
                            specifications,
                            isLoading,
                            error
                        }: Readonly<RegionEditFormProps>) {
    const [values, setValues] = useState<PanelRegionDTO>(() => structuredClone(initialValues));

    const saveObject = useSaveRegion();
    const libraryListStoreActions = useLibraryListStore((state) => state.actions);
    const navigate = useNavigate();

    const isDirty = initialValues.name !== values.name || initialValues.specificationId != values.specificationId;
    const [savedDestination, setSavedDestination] = useState<string | null>(null);

    const specValue = specifications.find(spec => spec.id === values.specificationId);

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
                        Editing region: {initialValues.name}
                    </Typography>

                    <Divider sx={{marginY: "8px"}}/>

                    <TextControl sx={{marginY: "8px"}} name="Name" value={values.name ?? ""}
                                 setValue={(value) => setValues({...values, name: value})}/>
                    <BaseControl sx={{marginY: "8px"}}>
                        <Typography>Specification</Typography>
                        <SingleSearchSelect
                            value={specValue}
                            setValue={(spec) => setValues({...values, specificationId: spec?.id})}
                            options={specifications}
                            disabled={isLoading || Boolean(error)}
                        />
                    </BaseControl>
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
                                        setSavedDestination('/library/region');
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

export interface RegionEditPaneProps {
    objectList: PanelRegionDTO[];
    specifications: RegionSpecification[];
    isLoading: boolean;
    error: Error | null;
}

function RegionEditPane({
                            objectList,
                            specifications,
                            isLoading,
                            error
                        }: Readonly<RegionEditPaneProps>) {
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

    return (<RegionEditForm
        key={object.id?.toString()}
        initialValues={object}
        specifications={specifications}
        isLoading={isLoading}
        error={error}
    />);
}

export function LibraryRegionListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQueryRegions();
    const {data: specifications, isLoading: isSpecLoading, error: specError} = useQueryRegionSpecifications();

    const saveMutation = useSaveRegion();
    const deleteMutation = useDeleteRegion();

    return (
        <ComplexLibraryListPane<PanelRegionDTO>
            name="Regions"
            type="region"
            addNewEnabled={true}
            objectList={objectList ?? []}
            isLoading={isLoading || isSpecLoading || saveMutation.isPending || deleteMutation.isPending}
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
        >
            <RegionEditPane
                objectList={objectList ?? []}
                specifications={specifications ?? []}
                isLoading={isLoading || isSpecLoading}
                error={error || specError}
            />
        </ComplexLibraryListPane>
    );
}