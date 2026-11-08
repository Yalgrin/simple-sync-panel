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
import {Box, Button, CircularProgress, Divider, Paper, Tab, Tabs, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {EditCancelButton} from "./edit/EditCancelButton.tsx";
import {MainParametersTab} from "./edit/tabs/MainParametersTab.tsx";
import {AdvancedParametersTab} from "./edit/tabs/AdvancedParametersTab.tsx";
import {type LinkRow, LinksTab} from "./edit/tabs/LinksTab.tsx";
import {MediaTab} from "./edit/tabs/MediaTab.tsx";
import {UnsavedChangesGuard} from "../common/UnsavedChangesGuard.tsx";
import {hasGameNotBeenChanged} from "../../functions/game.ts";
import {useTranslation} from "react-i18next";

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

    const [savedDestination, setSavedDestination] = useState<string | null>(null);

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
    const {t} = useTranslation();

    const [tab, setTab] = useState(0);

    const isDirty = !editMode || !hasGameNotBeenChanged(initialValues, values) ||
        iconFile !== null || coverImageFile !== null || backgroundImageFile !== null;

    useEffect(() => {
        if (savedDestination !== null) {
            void navigate(savedDestination);
        }
    }, [savedDestination, navigate]);

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
                    {editMode ? t("game.edit.title", {name: initialValues?.name ?? ""}) : t("game.add.title")}
                </Typography>
            </Paper>

            <Divider orientation="horizontal" sx={{mb: '8px'}}/>

            <Tabs
                value={tab}
                onChange={(_, value: number) => setTab(value)}
            >
                <Tab key="0" label={t("game.edit.tabs.general")}/>
                <Tab key="1" label={t("game.edit.tabs.advanced")}/>
                <Tab key="2" label={t("game.edit.tabs.media")}/>
                <Tab key="3" label={t("game.edit.tabs.links")}/>
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
                                        setSavedDestination('/games/' + result.id);
                                    }
                                })
                            }}>{t("game.edit.save")}</Button>
                    <EditCancelButton editMode={editMode} gameId={initialValues.id}/>
                </Box>
            </Paper>
            <UnsavedChangesGuard preventChange={isDirty && savedDestination === null}/>
        </Box>
    )
}

function GameAddPane() {
    const {t} = useTranslation();
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
        name: t("game.add.defaultName")
    };

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

    const anythingLoading = seriesLoading || platformsLoading || ageRatingsLoading || genresLoading || regionsLoading || companiesLoading || sourcesLoading || completionStatusesLoading || categoriesLoading || featuresLoading || tagsLoading;

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
                    <CircularProgress enableTrackSlot size="10vh" aria-label={t("common.loading")}/>
                </Box>
        )
    }

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
    const {t} = useTranslation();
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
                <CircularProgress enableTrackSlot size="10vh" aria-label={t("common.loading")}/>
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