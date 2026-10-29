import {useNavigate, useParams} from "react-router";
import {
    useQueryAgeRatings,
    useQueryCategories,
    useQueryCompanies,
    useQueryCompletionStatuses,
    useQueryFeatures,
    useQueryGameDetails,
    useQueryGenres,
    useQueryPlatforms,
    useQueryRegions,
    useQuerySeries,
    useQuerySources,
    useQueryTags,
    useSaveGame
} from "../../hooks/objects.ts";
import type {
    LinkDTO,
    PanelAgeRatingDTO,
    PanelCategoryDTO,
    PanelCompanyDTO,
    PanelCompletionStatusDTO,
    PanelFeatureDTO,
    PanelGameDTO,
    PanelGenreDTO,
    PanelPlatformDTO,
    PanelRegionDTO,
    PanelSeriesDTO,
    PanelSourceDTO,
    PanelTagDTO
} from "../../models/objects.ts";
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import {type ChangeEvent, type ReactNode, useEffect, useState} from "react";
import {useGameListStore} from "../../store/useGameListStore.ts";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import {TextControl} from "../common/form-controls/TextControl.tsx";
import {LargeTextControl} from "../common/form-controls/LargeTextControl.tsx";
import {CheckboxControl} from "../common/form-controls/CheckboxControl.tsx";
import {DateTimeControl} from "../common/form-controls/DateTimeControl.tsx";
import {DateControl} from "../common/form-controls/DateControl.tsx";
import {ScoreControl} from "../common/form-controls/ScoreControl.tsx";
import {TimePlayedControl} from "../common/form-controls/TimePlayedControl.tsx";
import {NumericControl} from "../common/form-controls/NumericControl.tsx";
import {MultipleObjectControl} from "../common/form-controls/MultipleObjectControl.tsx";
import {SingleObjectControl} from "../common/form-controls/SingleObjectControl.tsx";

//TODO extract components
//TODO change blocker on change
//TODO media and links tabs

function CancelButton({editMode, gameId}: Readonly<{ editMode: boolean, gameId: number | undefined | null }>) {
    const selectedGameId = useGameListStore((state) => state.selectedGameId);
    const navigate = useNavigate();

    const handleCancel = () => {
        if (editMode && gameId) {
            navigate("/games/" + gameId);
        } else if (selectedGameId) {
            navigate("/games/" + selectedGameId);
        } else {
            navigate("/games");
        }
    }

    return (<Button variant="outlined" size="small" onClick={handleCancel}>Cancel</Button>)
}

interface MainParametersTabProps {
    values: PanelGameDTO;
    setValues: (value: PanelGameDTO) => void;
    optionsSeries: PanelSeriesDTO[];
    setOptionsSeries: (value: PanelSeriesDTO[]) => void;
    optionsPlatforms: PanelPlatformDTO[];
    setOptionsPlatforms: (value: PanelPlatformDTO[]) => void;
    optionsAgeRatings: PanelAgeRatingDTO[];
    setOptionsAgeRatings: (value: PanelAgeRatingDTO[]) => void;
    optionsGenres: PanelGenreDTO[];
    setOptionsGenres: (value: PanelGenreDTO[]) => void;
    optionsRegions: PanelRegionDTO[];
    setOptionsRegions: (value: PanelRegionDTO[]) => void;
    optionsCompanies: PanelCompanyDTO[];
    setOptionsCompanies: (value: PanelCompanyDTO[]) => void;
    optionsSources: PanelSourceDTO[];
    setOptionsSources: (value: PanelSourceDTO[]) => void;
    optionsCompletionStatuses: PanelCompletionStatusDTO[];
    setOptionsCompletionStatuses: (value: PanelCompletionStatusDTO[]) => void;
    optionsCategories: PanelCategoryDTO[];
    setOptionsCategories: (value: PanelCategoryDTO[]) => void;
    optionsFeatures: PanelFeatureDTO[];
    setOptionsFeatures: (value: PanelFeatureDTO[]) => void;
    optionsTags: PanelTagDTO[];
    setOptionsTags: (value: PanelTagDTO[]) => void;
}

function MainParametersTab({
                               values,
                               setValues,
                               optionsSeries,
                               setOptionsSeries,
                               optionsPlatforms,
                               setOptionsPlatforms,
                               optionsAgeRatings,
                               setOptionsAgeRatings,
                               optionsGenres,
                               setOptionsGenres,
                               optionsRegions,
                               setOptionsRegions,
                               optionsCompanies,
                               setOptionsCompanies,
                               optionsSources,
                               setOptionsSources,
                               optionsCompletionStatuses,
                               setOptionsCompletionStatuses,
                               optionsCategories,
                               setOptionsCategories,
                               optionsFeatures,
                               setOptionsFeatures,
                               optionsTags,
                               setOptionsTags,
                           }: Readonly<MainParametersTabProps>) {
    return <>
        <TextControl
            name="Name"
            value={values.name ?? ""}
            setValue={(value) => setValues({...values, name: value})}
        />
        <DateControl
            name="Release date"
            value={values.releaseDate ?? ""}
            setValue={(value) => setValues({...values, releaseDate: value})}
        />
        <TextControl
            name="Sorting name"
            value={values.sortingName ?? ""}
            setValue={(value) => setValues({...values, sortingName: value})}
        />
        <MultipleObjectControl
            name="Series"
            value={values.series ?? []}
            setValue={(value) => setValues({...values, series: value})}
            options={optionsSeries ?? []}
            setOptions={setOptionsSeries}
            allowAdd={true}
        />
        <MultipleObjectControl
            name="Platform"
            value={values.platforms ?? []}
            setValue={(value) => setValues({...values, platforms: value})}
            options={optionsPlatforms ?? []}
            setOptions={setOptionsPlatforms}
            allowAdd={true}
        />
        <MultipleObjectControl
            name="Age rating"
            value={values.ageRatings ?? []}
            setValue={(value) => setValues({...values, ageRatings: value})}
            options={optionsAgeRatings ?? []}
            setOptions={setOptionsAgeRatings}
            allowAdd={true}
        />
        <MultipleObjectControl
            name="Genres"
            value={values.genres ?? []}
            setValue={(value) => setValues({...values, genres: value})}
            options={optionsGenres ?? []}
            setOptions={setOptionsGenres}
            allowAdd={true}
        />
        <MultipleObjectControl
            name="Region"
            value={values.regions ?? []}
            setValue={(value) => setValues({...values, regions: value})}
            options={optionsRegions ?? []}
            setOptions={setOptionsRegions}
            allowAdd={true}
        />
        <MultipleObjectControl
            name="Developers"
            value={values.developers ?? []}
            setValue={(value) => setValues({...values, developers: value})}
            options={optionsCompanies ?? []}
            setOptions={setOptionsCompanies}
            allowAdd={true}
        />
        <SingleObjectControl
            name="Source"
            value={values.source}
            setValue={(value) => setValues({...values, source: value})}
            options={optionsSources ?? []}
            setOptions={setOptionsSources}
            allowAdd={true}
        />
        <MultipleObjectControl
            name="Publishers"
            value={values.publishers ?? []}
            setValue={(value) => setValues({...values, publishers: value})}
            options={optionsCompanies ?? []}
            setOptions={setOptionsCompanies}
            allowAdd={true}
        />
        <SingleObjectControl
            name="Completion status"
            value={values.completionStatus}
            setValue={(value) => setValues({...values, completionStatus: value})}
            options={optionsCompletionStatuses ?? []}
            setOptions={setOptionsCompletionStatuses}
            allowAdd={true}
        />
        <MultipleObjectControl
            name="Categories"
            value={values.categories ?? []}
            setValue={(value) => setValues({...values, categories: value})}
            options={optionsCategories ?? []}
            setOptions={setOptionsCategories}
            allowAdd={true}
        />
        <ScoreControl
            name="User score"
            value={values.userScore}
            setValue={(value) => setValues({...values, userScore: value})}
        />
        <MultipleObjectControl
            name="Features"
            value={values.features ?? []}
            setValue={(value) => setValues({...values, features: value})}
            options={optionsFeatures ?? []}
            setOptions={setOptionsFeatures}
            allowAdd={true}
        />
        <ScoreControl
            name="Critic score"
            value={values.criticScore}
            setValue={(value) => setValues({...values, criticScore: value})}
        />
        <MultipleObjectControl
            name="Tags"
            value={values.tags ?? []}
            setValue={(value) => setValues({...values, tags: value})}
            options={optionsTags ?? []}
            setOptions={setOptionsTags}
            allowAdd={true}
        />
        <ScoreControl
            name="Community score"
            value={values.communityScore}
            setValue={(value) => setValues({...values, communityScore: value})}
        />
        <LargeTextControl
            name="Description"
            value={values.description ?? ""}
            setValue={(value) => setValues({...values, description: value})}
        />
    </>;
}

interface AdvancedParametersTabProps {
    values: PanelGameDTO;
    setValues: (value: PanelGameDTO) => void;
}

function AdvancedParametersTab({
                                   values,
                                   setValues,
                               }: Readonly<AdvancedParametersTabProps>) {
    return <>
        <DateTimeControl
            name="Last played"
            value={values.lastActivity ?? ""}
            setValue={(value) => setValues({...values, lastActivity: value})}
        />
        <TextControl
            name="Game id"
            value={values.gameId ?? ""}
            setValue={() => {
            }}
            disabled={true}
        />
        <TimePlayedControl
            name="Time played"
            value={values.playtime}
            setValue={(value) => setValues({...values, playtime: value})}
        />
        <TextControl
            name="Database id"
            value={values.playniteId ?? ""}
            setValue={() => {
            }}
            disabled={true}
        />
        <NumericControl
            name="Play count"
            value={values.playCount}
            setValue={(value) => setValues({...values, playCount: value})}
        />
        <TextControl
            name="Library"
            value={values.plugin?.name ?? "Playnite"}
            setValue={() => {
            }}
            disabled={true}
        />
        <TextControl
            name="Version"
            value={values.version ?? ""}
            setValue={(value) => setValues({...values, version: value})}
        />
        <Box/>
        <TextControl
            name="Manual"
            value={values.manual ?? ""}
            setValue={(value) => setValues({...values, manual: value})}
        />
        <Box/>
        <CheckboxControl
            name="Hidden"
            value={values.isHidden ?? false}
            setValue={(value) => setValues({...values, isHidden: value})}
        />
        <CheckboxControl
            name="Favorite"
            value={values.isFavorite ?? false}
            setValue={(value) => setValues({...values, isFavorite: value})}
        />
        <DateTimeControl
            name="Added"
            value={values.added ?? ""}
            setValue={(value) => setValues({...values, added: value})}
        />
        <DateTimeControl
            name="Modified"
            value={values.modified ?? ""}
            setValue={(value) => setValues({...values, modified: value})}
            disabled={true}
        />
        <LargeTextControl
            name="Notes"
            value={values.notes ?? ""}
            setValue={(value) => setValues({...values, notes: value})}
        />
    </>;
}

function MediaField({name, wideInput = false, initialUrl, isSaving, setIsSaving, file, setFile}: Readonly<{
    name: string;
    wideInput?: boolean;
    initialUrl: string | undefined;
    isSaving: boolean;
    setIsSaving: (value: boolean) => void;
    file: File | null;
    setFile: (value: File | null) => void;
}>) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [file, setPreviewUrl]);

    const handleImageChange = function (event: ChangeEvent<HTMLInputElement>) {
        const selectedFile = event.currentTarget.files?.[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
            setIsSaving(true);
        }
        event.currentTarget.value = "";
    }

    const handleClear = function () {
        setFile(null);
        setIsSaving(true);
    }

    const handleReset = function () {
        setFile(null);
        setIsSaving(false);
    }

    let previewElement: ReactNode
    if (isSaving) {
        if (previewUrl) {
            previewElement = (
                <Box component="img" src={previewUrl} alt="Preview"
                     sx={{display: "block", maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}/>
            )
        } else {
            if (initialUrl) {
                previewElement = (<Typography>Existing image will be removed</Typography>)
            } else {
                previewElement = (<Typography>No image</Typography>)
            }
        }
    } else {
        if (initialUrl) {
            previewElement = (
                <Box component="img" src={initialUrl} alt="Preview"
                     sx={{display: "block", maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}/>
            )
        } else {
            previewElement = (<Typography>No image</Typography>)
        }
    }

    return (
        <Stack direction="column" sx={{
            gridColumn: wideInput ? "1 / -1" : undefined,
            gap: "6px",
            minWidth: 0,
            minHeight: 0,
            border: "1px solid rgba(255, 255, 255, 0.08)",
        }}>
            <Paper>
                <Typography variant="h6" sx={{
                    padding: "8px",
                }}>{name}</Typography>
            </Paper>
            <Stack direction="row" sx={{
                padding: "8px",
                gap: "8px",
            }}>
                <Button variant="contained" component="label">
                    Add
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>
                <Button variant="contained" onClick={handleClear}>Clear</Button>
                <Button variant="contained" onClick={handleReset}>Reset</Button>
            </Stack>
            <Divider/>
            <Box sx={{
                flex: 1,
                minHeight: 0,
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}>
                {previewElement}
            </Box>
        </Stack>
    )
}

interface MediaTabProps {
    values: PanelGameDTO;
    setValues: (value: PanelGameDTO) => void;
    initialValues: PanelGameDTO;
    iconFile: File | null;
    setIconFile: (value: File | null) => void;
    coverImageFile: File | null;
    setCoverImageFile: (value: File | null) => void;
    backgroundImageFile: File | null;
    setBackgroundImageFile: (value: File | null) => void;
}

function MediaTab({
                      values,
                      setValues,
                      initialValues,
                      iconFile,
                      setIconFile,
                      coverImageFile,
                      setCoverImageFile,
                      backgroundImageFile,
                      setBackgroundImageFile
                  }: Readonly<MediaTabProps>) {
    return <>
        <MediaField
            name="Icon"
            initialUrl={initialValues.iconUrl}
            isSaving={values.isSavingIcon ?? false}
            setIsSaving={(value) => setValues({...values, isSavingIcon: value})}
            file={iconFile}
            setFile={setIconFile}
        />
        <MediaField
            name="Cover image"
            initialUrl={initialValues.coverImageUrl}
            isSaving={values.isSavingCoverImage ?? false}
            setIsSaving={(value) => setValues({...values, isSavingCoverImage: value})}
            file={coverImageFile}
            setFile={setCoverImageFile}
        />
        <MediaField
            name="Background image"
            wideInput={true}
            initialUrl={initialValues.backgroundImageUrl}
            isSaving={values.isSavingBackgroundImage ?? false}
            setIsSaving={(value) => setValues({...values, isSavingBackgroundImage: value})}
            file={backgroundImageFile}
            setFile={setBackgroundImageFile}
        />
    </>;
}

type LinkRow = { key: string; link: LinkDTO };

interface LinksTabProps {
    rows: LinkRow[];
    setRows: (value: LinkRow[]) => void;
}

function LinksTab({
                      rows,
                      setRows
                  }: Readonly<LinksTabProps>) {

    const updateLink = (key: string, changes: Partial<LinkDTO>) => {
        setRows(rows.map((row) =>
            row.key === key
                ? {...row, link: {...row.link, ...changes}}
                : row
        ));
    };

    const moveLink = (index: number, direction: -1 | 1) => {
        const nextRows = [...rows];
        const target = index + direction;
        [nextRows[index], nextRows[target]] = [nextRows[target], nextRows[index]];
        setRows(nextRows);
    };

    return <>
        <Stack sx={{
            gridColumn: "1 / -1",
        }}>
            <Button variant="contained" sx={{
                maxWidth: "240px",
                marginBottom: "16px",
            }}
                    onClick={() => setRows([
                        ...rows,
                        {key: crypto.randomUUID(), link: {name: "", url: ""}},
                    ])}>Add link</Button>

            {rows.length === 0 && <Typography>No links</Typography>}

            {rows.map(({key, link}, index) => (
                <Box
                    key={key}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "minmax(100px, 1fr) minmax(200px, 2fr) 40px 40px 40px",
                        padding: "8px",
                        gap: "8px",
                    }}
                >
                    <TextField
                        size="small"
                        value={link.name ?? ""}
                        onChange={(event) => updateLink(key, {name: event.target.value})}
                    />
                    <TextField
                        size="small"
                        value={link.url ?? ""}
                        onChange={(event) => updateLink(key, {url: event.target.value})}
                    />

                    <IconButton
                        disabled={index === 0}
                        onClick={() => moveLink(index, -1)}
                    >
                        <ArrowUpwardRoundedIcon/>
                    </IconButton>
                    <IconButton
                        disabled={index === rows.length - 1}
                        onClick={() => moveLink(index, 1)}
                    >
                        <ArrowDownwardRoundedIcon/>
                    </IconButton>
                    <IconButton
                        onClick={() => setRows(rows.filter((row) => row.key !== key))}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>
            ))}
        </Stack>
    </>;
}

interface GameEditFormProps {
    editMode: boolean;
    initialValues: PanelGameDTO;
    series: PanelSeriesDTO[];
    platforms: PanelPlatformDTO[];
    ageRatings: PanelAgeRatingDTO[];
    genres: PanelGenreDTO[];
    regions: PanelRegionDTO[];
    companies: PanelCompanyDTO[];
    sources: PanelSourceDTO[];
    completionStatuses: PanelCompletionStatusDTO[];
    categories: PanelCategoryDTO[];
    features: PanelFeatureDTO[];
    tags: PanelTagDTO[];
}

function GameEditForm({
                          editMode,
                          initialValues,
                          series,
                          platforms,
                          ageRatings,
                          genres,
                          regions,
                          companies,
                          sources,
                          completionStatuses,
                          categories,
                          features,
                          tags
                      }: Readonly<GameEditFormProps>) {

    const [values, setValues] = useState<PanelGameDTO>(() => structuredClone(initialValues));
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(null);

    const [optionsSeries, setOptionsSeries] = useState<PanelSeriesDTO[]>(() => structuredClone(series));
    const [optionsPlatforms, setOptionsPlatforms] = useState<PanelPlatformDTO[]>(() => structuredClone(platforms));
    const [optionsAgeRatings, setOptionsAgeRatings] = useState<PanelAgeRatingDTO[]>(() => structuredClone(ageRatings));
    const [optionsGenres, setOptionsGenres] = useState<PanelGenreDTO[]>(() => structuredClone(genres));
    const [optionsRegions, setOptionsRegions] = useState<PanelRegionDTO[]>(() => structuredClone(regions));
    const [optionsCompanies, setOptionsCompanies] = useState<PanelCompanyDTO[]>(() => structuredClone(companies));
    const [optionsSources, setOptionsSources] = useState<PanelSourceDTO[]>(() => structuredClone(sources));
    const [optionsCompletionStatuses, setOptionsCompletionStatuses] = useState<PanelCompletionStatusDTO[]>(() => structuredClone(completionStatuses));
    const [optionsCategories, setOptionsCategories] = useState<PanelCategoryDTO[]>(() => structuredClone(categories));
    const [optionsFeatures, setOptionsFeatures] = useState<PanelFeatureDTO[]>(() => structuredClone(features));
    const [optionsTags, setOptionsTags] = useState<PanelTagDTO[]>(() => structuredClone(tags));

    const [rows, setRows] = useState<LinkRow[]>(() =>
        (values.links ?? []).map((link) => ({
            key: crypto.randomUUID(),
            link,
        }))
    );

    const updateRows = (nextRows: LinkRow[]) => {
        setRows(nextRows);
        setValues({...values, links: nextRows.map((row) => row.link)});
    };

    const saveGame = useSaveGame();
    const navigate = useNavigate();

    const [tab, setTab] = useState(0);

    return (
        <Box sx={{
            height: "100%",
            minHeight: 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
        }}>
            <Paper elevation={1} sx={{padding: '8px'}}>
                <Typography variant="h6" sx={{fontWeight: 700}}>
                    {editMode ? `Editing game: ${initialValues?.name ?? ""}` : "Adding new game"}
                </Typography>
            </Paper>

            <Divider orientation="horizontal" sx={{mb: '8px'}}/>

            <Tabs
                value={tab}
                onChange={(_, value: number) => setTab(value)}
            >
                <Tab key="0" label="General"/>
                <Tab key="1" label="Advanced"/>
                <Tab key="2" label="Media"/>
                <Tab key="3" label="Links"/>
            </Tabs>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: tab === 2
                    ? "minmax(500px, 1fr) minmax(500px, 1fr)"
                    : undefined,
                columnGap: '16px',
                rowGap: '8px',
                padding: '8px',
                alignContent: tab === 2 ? "stretch" : "start",
                flex: 1,
                minHeight: 0,
                overflowY: "auto"
            }}>
                {tab == 0 && <MainParametersTab
                    values={values}
                    setValues={setValues}
                    optionsSeries={optionsSeries}
                    setOptionsSeries={setOptionsSeries}
                    optionsPlatforms={optionsPlatforms}
                    setOptionsPlatforms={setOptionsPlatforms}
                    optionsAgeRatings={optionsAgeRatings}
                    setOptionsAgeRatings={setOptionsAgeRatings}
                    optionsGenres={optionsGenres}
                    setOptionsGenres={setOptionsGenres}
                    optionsRegions={optionsRegions}
                    setOptionsRegions={setOptionsRegions}
                    optionsCompanies={optionsCompanies}
                    setOptionsCompanies={setOptionsCompanies}
                    optionsSources={optionsSources}
                    setOptionsSources={setOptionsSources}
                    optionsCompletionStatuses={optionsCompletionStatuses}
                    setOptionsCompletionStatuses={setOptionsCompletionStatuses}
                    optionsCategories={optionsCategories}
                    setOptionsCategories={setOptionsCategories}
                    optionsFeatures={optionsFeatures}
                    setOptionsFeatures={setOptionsFeatures}
                    optionsTags={optionsTags}
                    setOptionsTags={setOptionsTags}
                />}
                {tab == 1 && <AdvancedParametersTab
                    values={values}
                    setValues={setValues}
                />}
                {tab == 2 && <MediaTab
                    values={values}
                    setValues={setValues}
                    initialValues={initialValues}
                    iconFile={iconFile}
                    setIconFile={setIconFile}
                    coverImageFile={coverImageFile}
                    setCoverImageFile={setCoverImageFile}
                    backgroundImageFile={backgroundImageFile}
                    setBackgroundImageFile={setBackgroundImageFile}
                />}
                {tab == 3 && <LinksTab
                    rows={rows}
                    setRows={updateRows}
                />}
            </Box>

            <Paper
                sx={{
                    display: "flex",
                    flexShrink: 0,
                    justifyContent: "space-between",
                    gap: 1,
                    p: 1,
                }}
                elevation={1}
            >
                <Box sx={{flex: 1}}/>
                <Box sx={{display: "flex", gap: 1}}>
                    <Button variant="contained" size="small"
                            disabled={saveGame.isPending}
                            onClick={(event) => {
                                event.preventDefault();
                                saveGame.mutate({
                                    game: values,
                                    icon: iconFile,
                                    backgroundImage: backgroundImageFile,
                                    coverImage: coverImageFile
                                }, {
                                    onSuccess: (result) => {
                                        navigate('/games/' + result.id);
                                    }
                                })
                            }}>Save</Button>
                    <CancelButton editMode={editMode} gameId={initialValues.id}/>
                </Box>
            </Paper>
        </Box>
    )
}

function GameAddPane() {
    const gameDetails: PanelGameDTO = {
        ageRatings: [],
        categories: [],
        developers: [],
        features: [],
        genres: [],
        isFavorite: false,
        isHidden: false,
        links: [],
        platforms: [],
        playCount: 0,
        playtime: 0,
        publishers: [],
        regions: [],
        series: [],
        tags: [],
        name: "New game"
    };

    const {data: series} = useQuerySeries();
    const {data: platforms} = useQueryPlatforms();
    const {data: ageRatings} = useQueryAgeRatings();
    const {data: genres} = useQueryGenres();
    const {data: regions} = useQueryRegions();
    const {data: companies} = useQueryCompanies();
    const {data: sources} = useQuerySources();
    const {data: completionStatuses} = useQueryCompletionStatuses();
    const {data: categories} = useQueryCategories();
    const {data: features} = useQueryFeatures();
    const {data: tags} = useQueryTags();

    return <GameEditForm key="new"
                         editMode={false}
                         initialValues={gameDetails}
                         series={series ?? []}
                         platforms={platforms ?? []}
                         ageRatings={ageRatings ?? []}
                         genres={genres ?? []}
                         regions={regions ?? []}
                         companies={companies ?? []}
                         sources={sources ?? []}
                         completionStatuses={completionStatuses ?? []}
                         categories={categories ?? []}
                         features={features ?? []}
                         tags={tags ?? []}/>;
}

function GameEditPane({id}: Readonly<{ id: string }>) {
    const {data: gameDetails, isLoading: gameLoading} = useQueryGameDetails(Number.parseInt(id));
    const {data: series, isLoading: seriesLoading} = useQuerySeries();
    const {data: platforms, isLoading: platformsLoading} = useQueryPlatforms();
    const {data: ageRatings, isLoading: ageRatingsLoading} = useQueryAgeRatings();
    const {data: genres, isLoading: genresLoading} = useQueryGenres();
    const {data: regions, isLoading: regionsLoading} = useQueryRegions();
    const {data: companies, isLoading: companiesLoading} = useQueryCompanies();
    const {data: sources, isLoading: sourcesLoading} = useQuerySources();
    const {data: completionStatuses, isLoading: completionStatusesLoading} = useQueryCompletionStatuses();
    const {data: categories, isLoading: categoriesLoading} = useQueryCategories();
    const {data: features, isLoading: featuresLoading} = useQueryFeatures();
    const {data: tags, isLoading: tagsLoading} = useQueryTags();

    const anythingLoading = gameLoading || seriesLoading || platformsLoading || ageRatingsLoading || genresLoading || regionsLoading || companiesLoading || sourcesLoading || completionStatusesLoading || categoriesLoading || featuresLoading || tagsLoading;

    if (anythingLoading) {
        return (
            <Box
                sx={{
                    height: '100%',
                    overflowY: 'auto',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress enableTrackSlot size="10vh" aria-label="Loading..."/>
            </Box>
        )
    }

    if (gameDetails == null) {
        return null;
    }

    return <GameEditForm key={gameDetails.id}
                         editMode={true}
                         initialValues={gameDetails}
                         series={series ?? []}
                         platforms={platforms ?? []}
                         ageRatings={ageRatings ?? []}
                         genres={genres ?? []}
                         regions={regions ?? []}
                         companies={companies ?? []}
                         sources={sources ?? []}
                         completionStatuses={completionStatuses ?? []}
                         categories={categories ?? []}
                         features={features ?? []}
                         tags={tags ?? []}/>
}

export function GameAddEditPane() {
    const {id} = useParams();
    if (id == null) {
        return <GameAddPane/>
    } else {
        return <GameEditPane id={id}/>
    }
}