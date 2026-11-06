import type {PanelPlatformDTO} from "../../../models/objects.ts";
import {
    useDeletePlatform,
    useQueryPlatforms,
    useQueryPlatformSpecifications,
    useSavePlatform
} from "../../../hooks/objects.ts";
import {ComplexLibraryListPane} from "./ComplexLibraryListPane.tsx";
import {Box, Button, CircularProgress, Divider, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useLibraryListStore} from "../../../store/useLibraryListStore.ts";
import {MediaControl} from "../../games/edit/MediaControl.tsx";
import {TextControl} from "../../common/form-controls/TextControl.tsx";
import type {PlatformSpecification} from "../../../models/library/PlatformSpecification.ts";
import {SingleSearchSelect} from "../../common/inputs/SingleSearchSelect.tsx";
import {BaseControl} from "../../common/form-controls/BaseControl.tsx";
import {UnsavedChangesGuard} from "../../common/UnsavedChangesGuard.tsx";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

export interface PlatformEditFormProps {
    initialValues: PanelPlatformDTO;
    specifications: PlatformSpecification[];
    isLoading: boolean;
    error: Error | null;
}

function PlatformEditForm({
                              initialValues,
                              specifications,
                              isLoading,
                              error
                          }: Readonly<PlatformEditFormProps>) {
    const [values, setValues] = useState<PanelPlatformDTO>(() => structuredClone(initialValues));
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(null);

    const saveObject = useSavePlatform();
    const libraryListStoreActions = useLibraryListStore((state) => state.actions);
    const navigate = useNavigate();

    const isDirty = initialValues.name !== values.name || initialValues.specificationId != values.specificationId ||
        iconFile !== null || coverImageFile !== null || backgroundImageFile !== null;
    const [savedDestination, setSavedDestination] = useState<string | null>(null);

    const specValue = specifications.find(spec => spec.id === values.specificationId);
    const {t} = useTranslation();

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
                        {t('library.edit.editingPlatform', {name: initialValues.name})}
                    </Typography>

                    <Divider sx={{marginY: "8px"}}/>

                    <TextControl sx={{marginY: "8px"}} name={t('library.edit.name')} value={values.name ?? ""}
                                 setValue={(value) => setValues({...values, name: value})}/>
                    <BaseControl sx={{marginY: "8px"}}>
                        <Typography>{t('library.edit.specification')}</Typography>
                        <SingleSearchSelect
                            value={specValue}
                            setValue={(spec) => setValues({...values, specificationId: spec?.id})}
                            options={specifications}
                            disabled={isLoading || Boolean(error)}
                        />
                    </BaseControl>

                    <Divider sx={{marginY: "8px"}}/>

                    <MediaControl
                        name={t('library.edit.icon')}
                        initialUrl={initialValues.iconUrl}
                        isSaving={values.isSavingIcon ?? false}
                        setIsSaving={(value) => setValues({...values, isSavingIcon: value})}
                        file={iconFile}
                        setFile={setIconFile}
                        minImageWidth="128px"
                        maxImageHeight="400px"
                        sx={{minHeight: '256px'}}
                    />
                    <MediaControl
                        name={t('library.edit.coverImage')}
                        initialUrl={initialValues.coverImageUrl}
                        isSaving={values.isSavingCoverImage ?? false}
                        setIsSaving={(value) => setValues({...values, isSavingCoverImage: value})}
                        file={coverImageFile}
                        setFile={setCoverImageFile}
                        minImageWidth="128px"
                        maxImageHeight="400px"
                        sx={{minHeight: '256px'}}
                    />
                    <MediaControl
                        name={t('library.edit.backgroundImage')}
                        initialUrl={initialValues.backgroundImageUrl}
                        isSaving={values.isSavingBackgroundImage ?? false}
                        setIsSaving={(value) => setValues({...values, isSavingBackgroundImage: value})}
                        file={backgroundImageFile}
                        setFile={setBackgroundImageFile}
                        minImageWidth="128px"
                        maxImageHeight="400px"
                        sx={{minHeight: '256px'}}
                    />
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
                                saveObject.mutate({
                                    dto: values,
                                    icon: iconFile,
                                    backgroundImage: backgroundImageFile,
                                    coverImage: coverImageFile
                                }, {
                                    onSuccess: () => {
                                        setSavedDestination('/library/platform');
                                    }
                                })
                            }}>{t('library.edit.save')}</Button>
                    <Button variant="outlined" size="small" onClick={() => {
                        libraryListStoreActions.clear();
                    }}>{t('library.edit.cancel')}</Button>
                </Box>
            </Paper>
            <UnsavedChangesGuard preventChange={isDirty && savedDestination === null}/>
        </Box>);
}

export interface PlatformEditPaneProps {
    objectList: PanelPlatformDTO[];
    specifications: PlatformSpecification[];
    isLoading: boolean;
    error: Error | null;
}

function PlatformEditPane({
                              objectList,
                              specifications,
                              isLoading,
                              error
                          }: Readonly<PlatformEditPaneProps>) {
    const {t} = useTranslation();
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
                <CircularProgress enableTrackSlot size="10vh" aria-label={t("common.loading")}/>
            </Box>
        )
    }

    const object = objectList.find((o) => o.id === selectedObjectId);

    if (!object) {
        return null;
    }

    return (<PlatformEditForm
        key={object.id?.toString()}
        initialValues={object}
        specifications={specifications}
        isLoading={isLoading}
        error={error}
    />);
}

export function LibraryPlatformListPane() {
    const {data: objectList, isLoading, isPlaceholderData, error} = useQueryPlatforms();
    const {data: specifications, isLoading: isSpecLoading, error: specError} = useQueryPlatformSpecifications();
    const {t} = useTranslation();

    const saveMutation = useSavePlatform();
    const deleteMutation = useDeletePlatform();

    return (
        <ComplexLibraryListPane<PanelPlatformDTO>
            name={t('enums.LibraryObjectType.platform')}
            type="platform"
            addNewEnabled={true}
            objectList={objectList ?? []}
            isLoading={isLoading || isSpecLoading || saveMutation.isPending || deleteMutation.isPending}
            isPlaceholderData={isPlaceholderData}
            error={error}
            onCreate={async (name: string) => {
                await saveMutation.mutateAsync({
                    dto: {name},
                    icon: null,
                    backgroundImage: null,
                    coverImage: null
                })
            }}
            onSave={async (dto) => {
                await saveMutation.mutateAsync({
                    dto,
                    icon: null,
                    backgroundImage: null,
                    coverImage: null
                })
            }}
            onDelete={async (dto) => {
                await deleteMutation.mutateAsync(dto)
            }}
        >
            <PlatformEditPane
                objectList={objectList ?? []}
                specifications={specifications ?? []}
                isLoading={isLoading || isSpecLoading}
                error={error || specError}
            />
        </ComplexLibraryListPane>
    );
}