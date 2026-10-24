import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import {useCallback, useEffect, useMemo} from "react";
import {useFilterStore} from "../../store/useFilterStore.ts";
import {
    useOueryFilterPresets,
    useQueryAgeRatings,
    useQueryCategories,
    useQueryCompanies,
    useQueryCompletionStatuses,
    useQueryFeatures,
    useQueryGenres,
    useQueryLibraryPlugins,
    useQueryPlatforms,
    useQueryRegions,
    useQueryReleaseYear,
    useQuerySeries,
    useQueryTags
} from "../../hooks/objects.ts";
import {
    GroupableField,
    type IdItemPropertiesDTO,
    InstallSizeGroups,
    PastTimeSegments,
    PlaytimeCategories,
    ScoreGroups,
    SortOrder,
    SortOrderDirection
} from "../../models/filters.ts";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import type {PanelObjectDTO} from "../../models/objects.ts";

const NOT_SELECTED = -1;

function FilterPresetSelect() {
    const {data: filtersPresets, isLoading: filterPresetsLoading} = useOueryFilterPresets()

    const selectedFilterPresetId = useFilterStore((state) => state.selectedFilterPresetId);
    const filterActions = useFilterStore((state) => state.actions);

    useEffect(() => {
        if (!selectedFilterPresetId) {
            return;
        }
        const selectedPreset = filtersPresets?.find((preset) => preset.id === selectedFilterPresetId);
        if (!selectedPreset) {
            return;
        }

        filterActions.setFromFilterPreset(selectedPreset);
    }, [filtersPresets, filterActions, selectedFilterPresetId]);

    return (
        <FormControl fullWidth size="small" sx={{my: "16px"}}>
            <InputLabel id="filter-preset-label" size="small">Filter preset</InputLabel>
            <Select
                labelId="filter-preset-label"
                label="Filter preset"
                disabled={filterPresetsLoading}
                fullWidth
                value={selectedFilterPresetId ?? NOT_SELECTED}
                onChange={(event) => filterActions.setSelectedFilterPresetId(event.target.value as number)}
                size="small">
                <MenuItem value={NOT_SELECTED}>(None)</MenuItem>
                {filtersPresets?.map((preset) => (
                    <MenuItem key={preset.id} value={preset.id ?? ""}>
                        {preset.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

function SortOrderSelect() {
    const sortingOrder = useFilterStore((state) => state.sortingOrder);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{marginTop: "16px", marginBottom: "8px"}}>
            <InputLabel id="sort-order-label" size="small">Sorting order</InputLabel>
            <Select
                labelId="sort-order-label"
                label="Sorting order"
                fullWidth
                value={sortingOrder ?? SortOrder.NAME}
                onChange={(event) => filterActions.setSortingOrder(event.target.value as SortOrder)}
                size="small">
                {Object.values(SortOrder).map(order => (
                    <MenuItem key={order} value={order ?? ''}>
                        {order}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

function SortOrderDirectionSelect() {
    const sortingOrderDirection = useFilterStore((state) => state.sortingOrderDirection);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <InputLabel id="sort-order-direction-label" size="small">Sorting direction</InputLabel>
            <Select
                labelId="sort-order-direction-label"
                label="Sorting direction"
                fullWidth
                value={sortingOrderDirection ?? SortOrderDirection.ASCENDING}
                onChange={(event) => filterActions.setSortingOrderDirection(event.target.value as SortOrderDirection)}
                size="small">
                {Object.values(SortOrderDirection).map(order => (
                    <MenuItem key={order} value={order ?? ''}>
                        {order}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

function GroupingFieldSelect() {
    const groupingOrder = useFilterStore((state) => state.groupingOrder);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{marginTop: "8px", marginBottom: "16px"}}>
            <InputLabel id="grouping-field-label" size="small">Grouping field</InputLabel>
            <Select
                labelId="grouping-field-label"
                label="Grouping field"
                fullWidth
                value={groupingOrder ?? GroupableField.NONE}
                onChange={(event) => filterActions.setGroupingOrder(event.target.value as GroupableField)}
                size="small">
                {Object.values(GroupableField).map(order => (
                    <MenuItem key={order} value={order ?? ''}>
                        {order}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

function IsInstalledCheckbox() {
    const isInstalled = useFilterStore((state) => state.isInstalled);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControlLabel
            control={<Checkbox checked={isInstalled ?? false}
                               onChange={(event) => filterActions.setIsInstalled(event.target.checked)}/>}
            label="Installed"
        />
    )
}

function IsUninstalledCheckbox() {
    const isUninstalled = useFilterStore((state) => state.isUninstalled);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControlLabel
            control={<Checkbox checked={isUninstalled ?? false}
                               onChange={(event) => filterActions.setIsUninstalled(event.target.checked)}/>}
            label="Not installed"
        />
    )
}

function IsHiddenCheckbox() {
    const isHidden = useFilterStore((state) => state.isHidden);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControlLabel
            control={<Checkbox checked={isHidden ?? false}
                               onChange={(event) => filterActions.setIsHidden(event.target.checked)}/>}
            label="Hidden"
        />
    )
}

function IsFavoriteCheckbox() {
    const isFavorite = useFilterStore((state) => state.isFavorite);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControlLabel
            control={<Checkbox checked={isFavorite ?? false}
                               onChange={(event) => filterActions.setIsFavorite(event.target.checked)}/>}
            label="Favorite"
        />
    )
}

function UseAndFilteringStyleCheckbox() {
    const useAndFilteringStyle = useFilterStore((state) => state.useAndFilteringStyle);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControlLabel
            control={<Checkbox checked={useAndFilteringStyle ?? false}
                               onChange={(event) => filterActions.setUseAndFilteringStyle(event.target.checked)}/>}
            label="Match all filters"
        />
    )
}

interface ObjectAutocompleteProps {
    options: PanelObjectDTO[] | undefined;
    disabled?: boolean;
    filter: IdItemPropertiesDTO | null;
    setFilter: (filter: IdItemPropertiesDTO | null) => void;
}

function ObjectAutocomplete({options, disabled, filter, setFilter}: Readonly<ObjectAutocompleteProps>) {
    const optionsWithEmpty = options ? [{playniteId: "", name: '(None)'}, ...options] : [];
    const optionIds = new Set(optionsWithEmpty.map((o) => o.playniteId));

    let selected: string[] = filter?.ids ?? [];
    if (!disabled && options) {
        selected = selected.filter((option) => optionIds.has(option));
    }
    const searchText: string = filter?.text ?? '';

    const setSelected = function (newSelected: string[]) {
        if (searchText != null) {
            setFilter({ids: newSelected, text: ''});
        }
    }

    const setSearchText = function (newText: string) {
        setFilter({ids: [], text: newText});
    }

    return (
        <Autocomplete
            size="small"
            multiple
            options={optionsWithEmpty ?? []}
            disabled={disabled ?? false}
            value={selected}
            disableCloseOnSelect
            disableClearable
            onChange={(_, values) => setSelected(values as string[])}
            getOptionKey={(option) => option.playniteId ?? ""}
            getOptionLabel={(option) => option.name ?? ""}
            getOptionValue={(option) => option.playniteId ?? ""}
            renderOption={(props, option, {selected}) => {
                const {key, ...optionProps} = props;
                const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

                return (
                    <li key={key} {...optionProps}>
                        <SelectionIcon
                            fontSize="small"
                            style={{marginRight: 8, padding: 9, boxSizing: 'content-box'}}
                        />
                        {option.name ?? ""}
                    </li>
                );
            }}
            inputValue={searchText}
            onInputChange={(_, text, reason) => {
                if (reason === "input") {
                    setSearchText(text);
                }
                if (reason === "clear") {
                    setSearchText("");
                }
            }}
            renderInput={(params) => (
                <TextField {...params}
                           value={searchText}
                           slotProps={{
                               ...params.slotProps,
                               input: {
                                   ...params.slotProps.input,
                                   endAdornment: (
                                       <>
                                           {(selected.length > 0 || searchText.length > 0) && (
                                               <IconButton
                                                   size="small"
                                                   aria-label="Clear platform filter"
                                                   onClick={() => {
                                                       setSelected([]);
                                                       setSearchText('');
                                                   }}
                                               >
                                                   <CloseIcon fontSize="small" sx={{
                                                       width: '16px',
                                                       height: '16px',
                                                   }}/>
                                               </IconButton>
                                           )}
                                           {params.slotProps.input.endAdornment}
                                       </>
                                   ),
                               },
                           }}
                />
            )}
            renderValue={(value) => {
                if (searchText) {
                    return null;
                }
                if (value) {
                    return <Chip label={value.length + " selected"} size="small"/>;
                }
                return null;
            }}
        />
    );
}

interface KeyValuePair {
    key: string;
    value: string;
}

interface ValuesMultiSelectProps {
    options: KeyValuePair[] | undefined;
    disabled?: boolean;
    addEmpty?: boolean;
    filter: string[];
    setFilter: (filter: string[]) => void;
}

function ValuesMultiSelect({options, disabled, addEmpty = true, filter, setFilter}: Readonly<ValuesMultiSelectProps>) {
    let optionsWithEmpty = options || [];
    if (addEmpty ?? true) {
        optionsWithEmpty = [{key: "", value: "(None)"}, ...optionsWithEmpty];
    }
    const optionIds = new Set(optionsWithEmpty.map((o) => o.key));

    let selected: string[] = filter ?? [];
    if (!disabled && options) {
        selected = selected.filter((option) => optionIds.has(option));
    }

    return (
        <Autocomplete
            size="small"
            multiple
            options={optionsWithEmpty}
            disabled={disabled ?? false}
            value={selected}
            disableCloseOnSelect
            disableClearable
            onChange={(_, values) => setFilter(values as string[])}
            getOptionKey={(option) => option.key}
            getOptionLabel={(option) => option.value}
            getOptionValue={(option) => option.key}
            renderOption={(props, option, {selected}) => {
                const {key, ...optionProps} = props;
                const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

                return (
                    <li key={key} {...optionProps}>
                        <SelectionIcon
                            fontSize="small"
                            style={{marginRight: 8, padding: 9, boxSizing: 'content-box'}}
                        />
                        {option.value}
                    </li>
                );
            }}
            renderInput={(params) => (
                <TextField {...params}
                           slotProps={{
                               ...params.slotProps,
                               input: {
                                   ...params.slotProps.input,
                                   endAdornment: (
                                       <>
                                           {(selected.length > 0) && (
                                               <IconButton
                                                   size="small"
                                                   aria-label="Clear filter"
                                                   onClick={() => {
                                                       setFilter([]);
                                                   }}
                                               >
                                                   <CloseIcon fontSize="small" sx={{
                                                       width: '16px',
                                                       height: '16px',
                                                   }}/>
                                               </IconButton>
                                           )}
                                           {params.slotProps.input.endAdornment}
                                       </>
                                   ),
                               },
                           }}
                />
            )}
            renderValue={(values) =>
                values.length > 0 ? <Chip size="small" label={`${values.length} selected`}/> : null
            }
        />
    );
}

function PlatformSelect() {
    const {data: platforms, isLoading} = useQueryPlatforms()

    const filter = useFilterStore((state) => state.platform);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px", marginTop: "16px"}}>
            <FormLabel>Platform</FormLabel>
            <ObjectAutocomplete
                options={platforms}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setPlatform}
            />
        </FormControl>
    );
}

function LibraryPluginSelect() {
    const {data: libraryPlugins, isLoading} = useQueryLibraryPlugins()

    const filter = useFilterStore((state) => state.library);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Plugin</FormLabel>
            <ObjectAutocomplete
                options={libraryPlugins}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setLibrary}
            />
        </FormControl>
    );
}

function NameTextField() {
    const name = useFilterStore((state) => state.name);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Name</FormLabel>
            <TextField
                fullWidth
                size="small"
                value={name ?? ''}
                onChange={(event) => filterActions.setName(event.target.value)}
            />
        </FormControl>
    );
}

function GenreSelect() {
    const {data: genres, isLoading} = useQueryGenres()

    const filter = useFilterStore((state) => state.genre);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Genre</FormLabel>
            <ObjectAutocomplete
                options={genres}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setGenre}
            />
        </FormControl>
    );
}

function ReleaseYearSelect() {
    const {data: releaseYears, isLoading} = useQueryReleaseYear()
    const releaseYearsObjects: KeyValuePair[] = releaseYears?.map((year) => ({key: year, value: year})) ?? []

    const filter = useFilterStore((state) => state.releaseYear);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Release year</FormLabel>
            <ValuesMultiSelect
                options={releaseYearsObjects}
                disabled={isLoading}
                filter={filter?.values ?? []}
                setFilter={(values) => filterActions.setReleaseYear({values: values})}
            />
        </FormControl>
    );
}

function DeveloperSelect() {
    const {data: developers, isLoading} = useQueryCompanies()

    const filter = useFilterStore((state) => state.developer);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Developer</FormLabel>
            <ObjectAutocomplete
                options={developers}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setDeveloper}
            />
        </FormControl>
    );
}

function PublisherSelect() {
    const {data: publishers, isLoading} = useQueryCompanies()

    const filter = useFilterStore((state) => state.publisher);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Publisher</FormLabel>
            <ObjectAutocomplete
                options={publishers}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setPublisher}
            />
        </FormControl>
    );
}

function CategorySelect() {
    const {data: categories, isLoading} = useQueryCategories()

    const filter = useFilterStore((state) => state.category);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Category</FormLabel>
            <ObjectAutocomplete
                options={categories}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setCategory}
            />
        </FormControl>
    );
}

function TagSelect() {
    const {data: tags, isLoading} = useQueryTags()

    const filter = useFilterStore((state) => state.tag);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Tag</FormLabel>
            <ObjectAutocomplete
                options={tags}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setTag}
            />
        </FormControl>
    );
}

function FeatureSelect() {
    const {data: features, isLoading} = useQueryFeatures()

    const filter = useFilterStore((state) => state.feature);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Feature</FormLabel>
            <ObjectAutocomplete
                options={features}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setFeature}
            />
        </FormControl>
    );
}

function TimePlayedSelect() {
    const pairs: KeyValuePair[] = useMemo(() => {
        return PlaytimeCategories.map((obj) => ({key: obj.value.toString(), value: obj.label}))
    }, []);

    const filter = useFilterStore((state) => state.playTime);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Time played</FormLabel>
            <ValuesMultiSelect
                options={pairs}
                disabled={false}
                addEmpty={false}
                filter={filter?.values?.map((v) => v.toString()) ?? []}
                setFilter={(values) => filterActions.setPlayTime({values: values.map((v) => Number.parseInt(v))})}
            />
        </FormControl>
    );
}

function InstallSizeSelect() {
    const pairs: KeyValuePair[] = useMemo(() => {
        return InstallSizeGroups.map((obj) => ({key: obj.value.toString(), value: obj.label}))
    }, []);

    const filter = useFilterStore((state) => state.installSize);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Install size</FormLabel>
            <ValuesMultiSelect
                options={pairs}
                disabled={false}
                addEmpty={false}
                filter={filter?.values?.map((v) => v.toString()) ?? []}
                setFilter={(values) => filterActions.setInstallSize({values: values.map((v) => Number.parseInt(v))})}
            />
        </FormControl>
    );
}

function CompletionStatusSelect() {
    const {data, isLoading} = useQueryCompletionStatuses()

    const filter = useFilterStore((state) => state.completionStatuses);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Completion status</FormLabel>
            <ObjectAutocomplete
                options={data}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setCompletionStatuses}
            />
        </FormControl>
    );
}

function SeriesSelect() {
    const {data, isLoading} = useQuerySeries()

    const filter = useFilterStore((state) => state.series);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Series</FormLabel>
            <ObjectAutocomplete
                options={data}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setSeries}
            />
        </FormControl>
    );
}

function RegionSelect() {
    const {data, isLoading} = useQueryRegions()

    const filter = useFilterStore((state) => state.region);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Region</FormLabel>
            <ObjectAutocomplete
                options={data}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setRegion}
            />
        </FormControl>
    );
}

function SourceSelect() {
    const {data, isLoading} = useQuerySeries()

    const filter = useFilterStore((state) => state.source);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Source</FormLabel>
            <ObjectAutocomplete
                options={data}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setSource}
            />
        </FormControl>
    );
}

function AgeRatingSelect() {
    const {data, isLoading} = useQueryAgeRatings()

    const filter = useFilterStore((state) => state.ageRating);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Age rating</FormLabel>
            <ObjectAutocomplete
                options={data}
                disabled={isLoading}
                filter={filter}
                setFilter={filterActions.setAgeRating}
            />
        </FormControl>
    );
}

function VersionTextField() {
    const name = useFilterStore((state) => state.version);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Version</FormLabel>
            <TextField
                fullWidth
                size="small"
                value={name ?? ''}
                onChange={(event) => filterActions.setVersion(event.target.value)}
            />
        </FormControl>
    );
}

function UserScoreSelect() {
    const pairs: KeyValuePair[] = useMemo(() => {
        return ScoreGroups.map((obj) => ({key: obj.value.toString(), value: obj.label}))
    }, []);

    const filter = useFilterStore((state) => state.userScore);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>User score</FormLabel>
            <ValuesMultiSelect
                options={pairs}
                disabled={false}
                addEmpty={false}
                filter={filter?.values?.map((v) => v.toString()) ?? []}
                setFilter={(values) => filterActions.setUserScore({values: values.map((v) => Number.parseInt(v))})}
            />
        </FormControl>
    );
}

function CommunityScoreSelect() {
    const pairs: KeyValuePair[] = useMemo(() => {
        return ScoreGroups.map((obj) => ({key: obj.value.toString(), value: obj.label}))
    }, []);

    const filter = useFilterStore((state) => state.communityScore);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Community score</FormLabel>
            <ValuesMultiSelect
                options={pairs}
                disabled={false}
                addEmpty={false}
                filter={filter?.values?.map((v) => v.toString()) ?? []}
                setFilter={(values) => filterActions.setCommunityScore({values: values.map((v) => Number.parseInt(v))})}
            />
        </FormControl>
    );
}

function CriticScoreSelect() {
    const pairs: KeyValuePair[] = useMemo(() => {
        return ScoreGroups.map((obj) => ({key: obj.value.toString(), value: obj.label}))
    }, []);

    const filter = useFilterStore((state) => state.criticScore);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Critic score</FormLabel>
            <ValuesMultiSelect
                options={pairs}
                disabled={false}
                addEmpty={false}
                filter={filter?.values?.map((v) => v.toString()) ?? []}
                setFilter={(values) => filterActions.setCriticScore({values: values.map((v) => Number.parseInt(v))})}
            />
        </FormControl>
    );
}

function LastPlayedSelect() {
    const pairs: KeyValuePair[] = useMemo(() => {
        return PastTimeSegments.map((obj) => ({key: obj.value.toString(), value: obj.label}))
    }, []);

    const filter = useFilterStore((state) => state.lastActivity);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Last played</FormLabel>
            <ValuesMultiSelect
                options={pairs}
                disabled={false}
                addEmpty={false}
                filter={filter?.values?.map((v) => v.toString()) ?? []}
                setFilter={(values) => filterActions.setLastActivity({values: values.map((v) => Number.parseInt(v))})}
            />
        </FormControl>
    );
}

function RecentActivitySelect() {
    const pairs: KeyValuePair[] = useMemo(() => {
        return PastTimeSegments.map((obj) => ({key: obj.value.toString(), value: obj.label}))
    }, []);

    const filter = useFilterStore((state) => state.recentActivity);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Recent activity</FormLabel>
            <ValuesMultiSelect
                options={pairs}
                disabled={false}
                addEmpty={false}
                filter={filter?.values?.map((v) => v.toString()) ?? []}
                setFilter={(values) => filterActions.setRecentActivity({values: values.map((v) => Number.parseInt(v))})}
            />
        </FormControl>
    );
}

function AddedSelect() {
    const pairs: KeyValuePair[] = useMemo(() => {
        return PastTimeSegments.map((obj) => ({key: obj.value.toString(), value: obj.label}))
    }, []);

    const filter = useFilterStore((state) => state.added);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Date added</FormLabel>
            <ValuesMultiSelect
                options={pairs}
                disabled={false}
                addEmpty={false}
                filter={filter?.values?.map((v) => v.toString()) ?? []}
                setFilter={(values) => filterActions.setAdded({values: values.map((v) => Number.parseInt(v))})}
            />
        </FormControl>
    );
}

function ModifiedSelect() {
    const pairs: KeyValuePair[] = useMemo(() => {
        return PastTimeSegments.map((obj) => ({key: obj.value.toString(), value: obj.label}))
    }, []);

    const filter = useFilterStore((state) => state.modified);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <FormControl fullWidth size="small" sx={{my: "8px"}}>
            <FormLabel>Date modified</FormLabel>
            <ValuesMultiSelect
                options={pairs}
                disabled={false}
                addEmpty={false}
                filter={filter?.values?.map((v) => v.toString()) ?? []}
                setFilter={(values) => filterActions.setModified({values: values.map((v) => Number.parseInt(v))})}
            />
        </FormControl>
    );
}

export function FiltersPane() {
    const filterActions = useFilterStore((state) => state.actions);

    const clearFilters = useCallback(() => {
        filterActions.clear();
    }, [filterActions]);

    return (
        <Box
            sx={{
                height: '100%',
                boxSizing: 'border-box',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                p: 1.5,
            }}
        >
            <Stack
                direction="row"
                sx={{
                    mb: 1.5,
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Typography variant="h6" sx={{fontWeight: 700}}>
                    Filters
                </Typography>

                <Button
                    size="small"
                    startIcon={<ClearAllIcon/>}
                    sx={{color: 'grey.300'}}
                    onClick={clearFilters}
                >
                    Clear
                </Button>
            </Stack>

            <Divider/>

            <FilterPresetSelect/>

            <Divider/>

            <SortOrderSelect/>
            <SortOrderDirectionSelect/>
            <GroupingFieldSelect/>

            <Divider/>

            <IsInstalledCheckbox/>
            <IsUninstalledCheckbox/>
            <IsHiddenCheckbox/>
            <IsFavoriteCheckbox/>
            <UseAndFilteringStyleCheckbox/>

            <Divider/>

            <PlatformSelect/>
            <LibraryPluginSelect/>
            <NameTextField/>
            <GenreSelect/>
            <ReleaseYearSelect/>
            <DeveloperSelect/>
            <PublisherSelect/>
            <CategorySelect/>
            <TagSelect/>
            <FeatureSelect/>
            <TimePlayedSelect/>
            <InstallSizeSelect/>
            <CompletionStatusSelect/>
            <SeriesSelect/>
            <RegionSelect/>
            <SourceSelect/>
            <AgeRatingSelect/>
            <VersionTextField/>
            <UserScoreSelect/>
            <CommunityScoreSelect/>
            <CriticScoreSelect/>
            <LastPlayedSelect/>
            <RecentActivitySelect/>
            <AddedSelect/>
            <ModifiedSelect/>

        </Box>
    )
}