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
    PanelObjectDTO,
    PanelPlatformDTO,
    PanelRegionDTO,
    PanelSeriesDTO,
    PanelSourceDTO,
    PanelTagDTO
} from "../../models/objects.ts";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    IconButton,
    Paper,
    Popover,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import {type ChangeEvent, type ReactNode, useEffect, useMemo, useState} from "react";
import {DatePicker, DateTimePicker} from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import {useGameListStore} from "../../store/useGameListStore.ts";
import {List, type RowComponentProps} from "react-window";
import {useDialog} from "../../hooks/useDialog.ts";
import {AddObjectDialog} from "../dialogs/AddObjectDialog.tsx";
import NumberField from "../NumberField.tsx";
import {formatPlaytime} from "../../functions/util.ts";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

//TODO extract components
//TODO change blocker on change
//TODO media and links tabs

function RegularTextField({name, value, setValue, disabled = false}: Readonly<{
    name: string;
    value: string;
    setValue: (value: string) => void;
    disabled?: boolean;
}>) {
    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "120px minmax(0, 1fr)",
            gap: "6px",
            alignItems: "center",
        }}>
            <Typography>{name}</Typography>
            <TextField
                size="small"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                fullWidth
                disabled={disabled}
            />
        </Box>
    )
}

function TimePlayedField({name, value, setValue, disabled = false}: Readonly<{
    name: string;
    value: number;
    setValue: (value: number) => void;
    disabled?: boolean;
}>) {
    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "120px minmax(0, 1fr) max-content",
            gap: "6px",
            alignItems: "center",
        }}>
            <Typography>{name}</Typography>
            <TextField
                size="small"
                type="number"
                slotProps={{htmlInput: {min: 0, step: 1}}}
                value={value}
                onChange={(event) => {
                    const input = event.target.value;
                    if (input === "") {
                        setValue(0);
                        return;
                    }

                    const nextValue = Number(input);
                    if (Number.isSafeInteger(nextValue) && nextValue >= 0) {
                        setValue(nextValue);
                    }
                }}
                sx={{
                    "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                    },
                    "& input[type=number]": {
                        MozAppearance: "textfield",
                    },
                }}
                fullWidth
                disabled={disabled}
            />
            <Typography>{formatPlaytime(value)}</Typography>
        </Box>
    )
}

function NumericField({name, value, setValue, disabled = false}: Readonly<{
    name: string;
    value: number;
    setValue: (value: number) => void;
    disabled?: boolean;
}>) {
    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "120px minmax(0, 1fr)",
            gap: "6px",
            alignItems: "center",
        }}>
            <Typography>{name}</Typography>
            <TextField
                size="small"
                type="number"
                slotProps={{htmlInput: {min: 0, step: 1}}}
                value={value}
                onChange={(event) => {
                    const input = event.target.value;
                    if (input === "") {
                        setValue(0);
                        return;
                    }

                    const nextValue = Number(input);
                    if (Number.isSafeInteger(nextValue) && nextValue >= 0) {
                        setValue(nextValue);
                    }
                }}
                sx={{
                    "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                    },
                    "& input[type=number]": {
                        MozAppearance: "textfield",
                    },
                }}
                fullWidth
                disabled={disabled}
            />
        </Box>
    )
}

function LargeTextField({name, value, setValue}: Readonly<{
    name: string;
    value: string;
    setValue: (value: string) => void;
}>) {
    return (
        <Box sx={{
            gridColumn: "1 / -1",
            display: "grid",
            gridTemplateColumns: "120px minmax(0, 1fr)",
            gap: "6px",
            alignItems: "center",
        }}>
            <Typography>{name}</Typography>
            <TextField
                size="small"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                fullWidth
                multiline
                minRows={10}
                maxRows={50}
            />
        </Box>
    )
}

function CheckboxField({name, value, setValue}: Readonly<{
    name: string;
    value: boolean;
    setValue: (value: boolean) => void;
}>) {
    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "120px minmax(0, 1fr)",
            gap: "6px",
            alignItems: "center",
        }}>
            <Typography>{name}</Typography>
            <Checkbox
                size="small"
                sx={{justifySelf: "start"}}
                checked={value ?? false}
                onChange={(event) => setValue(event.target.checked)}
            />
        </Box>
    )
}

function ScoreField({name, value, setValue}: Readonly<{
    name: string;
    value: number | undefined | null;
    setValue: (value: number | null) => void;
}>) {
    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "120px minmax(0, 1fr)",
            gap: "6px",
            alignItems: "center",
        }}>
            <Typography>{name}</Typography>
            <NumberField
                size="small"
                value={value}
                onValueChange={setValue}
                min={0}
                max={100}/>
        </Box>
    )
}

function DateField({name, value, setValue}: Readonly<{
    name: string;
    value: string;
    setValue: (value: string) => void;
}>) {
    const format = "YYYY-MM-DDTHH:mm:ss"

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "120px minmax(0, 1fr)",
            gap: "6px",
            alignItems: "center",
        }}>
            <Typography>{name}</Typography>
            <DatePicker
                value={value ? dayjs(value, format) : null}
                onChange={(newValue) => setValue(newValue ? dayjs(newValue).format(format) : "")}
                slotProps={{
                    textField: {size: "small", fullWidth: true},
                }}
            />
        </Box>
    )
}

function DateTimeField({name, value, setValue, disabled = false}: Readonly<{
    name: string;
    value: string;
    setValue: (value: string) => void;
    disabled?: boolean;
}>) {
    const format = "YYYY-MM-DDTHH:mm:ssZ"

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "120px minmax(0, 1fr)",
            gap: "6px",
            alignItems: "center",
        }}>
            <Typography>{name}</Typography>
            <DateTimePicker
                views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                value={value ? dayjs(value, format) : null}
                onChange={(newValue) => setValue(newValue ? dayjs(newValue).format(format) : "")}
                slotProps={{
                    textField: {size: "small", fullWidth: true},
                }}
                disabled={disabled}
            />
        </Box>
    )
}

function SingleSelectButton<T extends PanelObjectDTO>({name, value, setValue, options, setOptions}: Readonly<{
    name: string;
    value: T | undefined | null;
    setValue: (value: T | null) => void;
    options: T[];
    setOptions: (options: T[]) => void;
}>) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [searchText, setSearchText] = useState("");

    const optionsWithEmpty = useMemo(() => {
        return [{name: "(None)"} as T, ...options];
    }, [options]);

    const filteredOptions = useMemo(() => {
        const query = searchText.trim().toLowerCase();
        return query
            ? optionsWithEmpty.filter((option) => (option.name ?? "").toLowerCase().includes(query))
            : optionsWithEmpty;
    }, [optionsWithEmpty, searchText]);

    const setOption = (option: T | null) => {
        setAnchorEl(null);
        setSearchText("");
        setValue(option);
    }

    const addOption = (name: string) => {
        const option = options.find((option) => option.name === name);
        if (!option) {
            const newOption = {name: name} as T;
            let newOptionList = [...options, newOption];
            newOptionList = newOptionList.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
            setOptions(newOptionList);
            setOption(newOption);
        }
    }

    const {openDialog} = useDialog();

    const openAddDialog = () => {
        openDialog({
            title: "Add new object",
            render: ({close}) => {
                return <AddObjectDialog close={close} callback={addOption}/>;
            },
        });
    }

    function OptionRow({
                           index,
                           style,
                           items,
                           onSelect,
                           ariaAttributes,
                       }: RowComponentProps<{
        items: T[];
        onSelect: (option: T | null) => void;
    }>) {
        const option = items[index];

        return (
            <Box style={style} {...ariaAttributes}>
                <Box
                    component="button"
                    type="button"
                    onClick={() => onSelect(option)}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        px: 1,
                        border: 0,
                        bgcolor: "transparent",
                        color: "text.primary",
                        textAlign: "left",
                        cursor: "pointer",
                        "&:hover": {bgcolor: "action.hover"},
                    }}
                >
                    <Typography noWrap>{option.name ?? ""}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "120px minmax(0, 1fr) 18px",
            gap: "6px",
            alignItems: "center",
        }}>
            <Typography>{name}</Typography>
            <Button
                variant="outlined"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    minWidth: 0,
                    overflow: "hidden",
                    height: "40px",
                    maxHeight: "40px",
                    color: "text.primary",
                    borderColor: (theme) =>
                        theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.23)"
                            : "rgba(0, 0, 0, 0.23)",
                    "&:hover": {
                        borderColor: "text.primary",
                    },
                    "&:focus-visible": {
                        borderColor: "primary.main",
                    },
                }}
            >
                <Typography noWrap>
                    {value?.name ?? ""}
                </Typography>
            </Button>

            <Button size="small" variant="contained" sx={{
                color: "text.primary",
                minWidth: 18,
                width: 18, height: "100%", p: 0, fontSize: 14, lineHeight: 1
            }} onClick={() => {
                setAnchorEl(null);
                setSearchText("");
                openAddDialog();
            }}>+</Button>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                    setAnchorEl(null);
                    setSearchText("");
                }}
                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                transformOrigin={{vertical: "top", horizontal: "left"}}
                slotProps={{
                    paper: {sx: {width: anchorEl?.clientWidth, overflow: "hidden"}},
                }}
            >
                <Box sx={{p: 1}}>
                    <TextField
                        size="small"
                        fullWidth
                        autoFocus
                        placeholder="Search..."
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                </Box>
                <List
                    rowComponent={OptionRow}
                    rowCount={filteredOptions.length}
                    rowHeight={40}
                    rowProps={{
                        items: filteredOptions,
                        onSelect: setOption,
                    }}
                    style={{
                        height: Math.min(filteredOptions.length * 40, 320),
                        width: "100%",
                    }}
                />
            </Popover>
        </Box>
    );
}

function MultipleSelectButton<T extends PanelObjectDTO>({name, value, setValue, options, setOptions}: Readonly<{
    name: string;
    value: T[];
    setValue: (value: T[]) => void;
    options: T[];
    setOptions: (options: T[]) => void;
}>) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [searchText, setSearchText] = useState("");
    const [onlySelected, setOnlySelected] = useState(false);

    const selectedIds = useMemo(
        () => new Set(value.map((option) => option.id)),
        [value]
    );

    const filteredOptions = useMemo(() => {
        const query = searchText.trim().toLowerCase();
        let filtered = options;
        if (onlySelected) {
            filtered = filtered.filter((option) => selectedIds.has(option.id));
        }
        return query
            ? filtered.filter((option) => (option.name ?? "").toLowerCase().includes(query))
            : filtered;
    }, [options, onlySelected, selectedIds, searchText]);

    const toggleOption = (option: T) => {
        setValue(
            selectedIds.has(option.id)
                ? value.filter((selected) => selected.id !== option.id)
                : [...value, option]
        );
    };

    const addOption = (name: string) => {
        const option = options.find((option) => option.name === name);
        if (!option) {
            const newOption = {name: name} as T;
            setOptions([...options, newOption]);
            toggleOption(newOption);
        }
    }

    const {openDialog} = useDialog();

    const openAddDialog = () => {
        openDialog({
            title: "Add new object",
            render: ({close}) => {
                return <AddObjectDialog close={close} callback={addOption}/>;
            },
        });
    }

    function OptionRow({
                           index,
                           style,
                           items,
                           selected,
                           onToggle,
                           ariaAttributes,
                       }: RowComponentProps<{
        items: T[];
        selected: Set<T["id"]>;
        onToggle: (option: T) => void;
    }>) {
        const option = items[index];

        return (
            <Box style={style} {...ariaAttributes}>
                <Box
                    component="button"
                    type="button"
                    onClick={() => onToggle(option)}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        px: 1,
                        border: 0,
                        bgcolor: "transparent",
                        color: "text.primary",
                        textAlign: "left",
                        cursor: "pointer",
                        "&:hover": {bgcolor: "action.hover"},
                    }}
                >
                    <Checkbox checked={selected.has(option.id)} tabIndex={-1}/>
                    <Typography noWrap>{option.name ?? ""}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "120px minmax(0, 1fr) 18px",
            gap: "6px",
            alignItems: "center",
        }}>
            <Typography>{name}</Typography>
            <Box sx={{position: "relative", minWidth: 0}}>
                <Button
                    variant="outlined"
                    onClick={(event) => {
                        setOnlySelected(false);
                        setAnchorEl(event.currentTarget);
                    }}
                    sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        minWidth: 0,
                        width: "100%",
                        overflow: "hidden",
                        height: "40px",
                        maxHeight: "40px",
                        color: "text.primary",
                        borderColor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.23)"
                                : "rgba(0, 0, 0, 0.23)",
                        "&:hover": {
                            borderColor: "text.primary",
                        },
                        "&:focus-visible": {
                            borderColor: "primary.main",
                        },
                    }}
                >
                    <Typography noWrap sx={{
                        paddingRight: "16px"
                    }}>
                        {value
                            .map((option) => option.name ?? "")
                            .sort((a, b) => a.localeCompare(b)).join(", ")}
                    </Typography>
                </Button>
                <IconButton
                    size="small"
                    onClick={() => setValue([])}
                    sx={{
                        position: "absolute",
                        right: 4,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    disabled={value.length === 0}
                >
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </Box>

            <Button size="small" variant="contained" sx={{
                color: "text.primary",
                minWidth: 18,
                width: 18, height: "100%", p: 0, fontSize: 14, lineHeight: 1
            }} onClick={() => {
                setAnchorEl(null);
                setSearchText("");
                openAddDialog();
            }}>+</Button>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                    setAnchorEl(null);
                    setSearchText("");
                }}
                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                transformOrigin={{vertical: "top", horizontal: "left"}}
                slotProps={{
                    paper: {sx: {width: anchorEl?.clientWidth, overflow: "hidden"}},
                }}
            >
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) 24px",
                    gap: "6px",
                    p: 1
                }}>
                    <TextField
                        size="small"
                        fullWidth
                        autoFocus
                        placeholder="Search..."
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                    <Checkbox checked={onlySelected ?? false}
                              onChange={() => setOnlySelected(!onlySelected)}></Checkbox>
                </Box>
                <List
                    rowComponent={OptionRow}
                    rowCount={filteredOptions.length}
                    rowHeight={40}
                    rowProps={{
                        items: filteredOptions,
                        selected: selectedIds,
                        onToggle: toggleOption,
                    }}
                    style={{
                        height: Math.min(filteredOptions.length * 40, 320),
                        width: "100%",
                    }}
                />
            </Popover>
        </Box>
    );
}

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
        <RegularTextField
            name="Name"
            value={values.name ?? ""}
            setValue={(value) => setValues({...values, name: value})}
        />
        <DateField
            name="Release date"
            value={values.releaseDate ?? ""}
            setValue={(value) => setValues({...values, releaseDate: value})}
        />
        <RegularTextField
            name="Sorting name"
            value={values.sortingName ?? ""}
            setValue={(value) => setValues({...values, sortingName: value})}
        />
        <MultipleSelectButton
            name="Series"
            value={values.series ?? []}
            setValue={(value) => setValues({...values, series: value})}
            options={optionsSeries ?? []}
            setOptions={setOptionsSeries}
        />
        <MultipleSelectButton
            name="Platform"
            value={values.platforms ?? []}
            setValue={(value) => setValues({...values, platforms: value})}
            options={optionsPlatforms ?? []}
            setOptions={setOptionsPlatforms}
        />
        <MultipleSelectButton
            name="Age rating"
            value={values.ageRatings ?? []}
            setValue={(value) => setValues({...values, ageRatings: value})}
            options={optionsAgeRatings ?? []}
            setOptions={setOptionsAgeRatings}
        />
        <MultipleSelectButton
            name="Genres"
            value={values.genres ?? []}
            setValue={(value) => setValues({...values, genres: value})}
            options={optionsGenres ?? []}
            setOptions={setOptionsGenres}
        />
        <MultipleSelectButton
            name="Region"
            value={values.regions ?? []}
            setValue={(value) => setValues({...values, regions: value})}
            options={optionsRegions ?? []}
            setOptions={setOptionsRegions}
        />
        <MultipleSelectButton
            name="Developers"
            value={values.developers ?? []}
            setValue={(value) => setValues({...values, developers: value})}
            options={optionsCompanies ?? []}
            setOptions={setOptionsCompanies}
        />
        <SingleSelectButton
            name="Source"
            value={values.source}
            setValue={(value) => setValues({...values, source: value})}
            options={optionsSources ?? []}
            setOptions={setOptionsSources}
        />
        <MultipleSelectButton
            name="Publishers"
            value={values.publishers ?? []}
            setValue={(value) => setValues({...values, publishers: value})}
            options={optionsCompanies ?? []}
            setOptions={setOptionsCompanies}
        />
        <SingleSelectButton
            name="Completion status"
            value={values.completionStatus}
            setValue={(value) => setValues({...values, completionStatus: value})}
            options={optionsCompletionStatuses ?? []}
            setOptions={setOptionsCompletionStatuses}
        />
        <MultipleSelectButton
            name="Categories"
            value={values.categories ?? []}
            setValue={(value) => setValues({...values, categories: value})}
            options={optionsCategories ?? []}
            setOptions={setOptionsCategories}
        />
        <ScoreField
            name="User score"
            value={values.userScore}
            setValue={(value) => setValues({...values, userScore: value})}
        />
        <MultipleSelectButton
            name="Features"
            value={values.features ?? []}
            setValue={(value) => setValues({...values, features: value})}
            options={optionsFeatures ?? []}
            setOptions={setOptionsFeatures}
        />
        <ScoreField
            name="Critic score"
            value={values.criticScore}
            setValue={(value) => setValues({...values, criticScore: value})}
        />
        <MultipleSelectButton
            name="Tags"
            value={values.tags ?? []}
            setValue={(value) => setValues({...values, tags: value})}
            options={optionsTags ?? []}
            setOptions={setOptionsTags}
        />
        <ScoreField
            name="Community score"
            value={values.communityScore}
            setValue={(value) => setValues({...values, communityScore: value})}
        />
        <LargeTextField
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
        <DateTimeField
            name="Last played"
            value={values.lastActivity ?? ""}
            setValue={(value) => setValues({...values, lastActivity: value})}
        />
        <RegularTextField
            name="Game id"
            value={values.gameId ?? ""}
            setValue={() => {
            }}
            disabled={true}
        />
        <TimePlayedField
            name="Time played"
            value={values.playtime}
            setValue={(value) => setValues({...values, playtime: value})}
        />
        <RegularTextField
            name="Database id"
            value={values.playniteId ?? ""}
            setValue={() => {
            }}
            disabled={true}
        />
        <NumericField
            name="Play count"
            value={values.playCount}
            setValue={(value) => setValues({...values, playCount: value})}
        />
        <RegularTextField
            name="Library"
            value={values.plugin?.name ?? "Playnite"}
            setValue={() => {
            }}
            disabled={true}
        />
        <RegularTextField
            name="Version"
            value={values.version ?? ""}
            setValue={(value) => setValues({...values, version: value})}
        />
        <Box/>
        <RegularTextField
            name="Manual"
            value={values.manual ?? ""}
            setValue={(value) => setValues({...values, manual: value})}
        />
        <Box/>
        <CheckboxField
            name="Hidden"
            value={values.isHidden ?? false}
            setValue={(value) => setValues({...values, isHidden: value})}
        />
        <CheckboxField
            name="Favorite"
            value={values.isFavorite ?? false}
            setValue={(value) => setValues({...values, isFavorite: value})}
        />
        <DateTimeField
            name="Added"
            value={values.added ?? ""}
            setValue={(value) => setValues({...values, added: value})}
        />
        <DateTimeField
            name="Modified"
            value={values.modified ?? ""}
            setValue={(value) => setValues({...values, modified: value})}
            disabled={true}
        />
        <LargeTextField
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
        if (selectedFile) {
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
                previewElement = (<Typography>Previous image will be removed</Typography>)
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

interface LinksTabProps {
    values: PanelGameDTO;
    setValues: (value: PanelGameDTO) => void;
}

function LinksTab({
                      values,
                      setValues
                  }: Readonly<LinksTabProps>) {
    type LinkRow = { key: string; link: LinkDTO };

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

    const updateLink = (key: string, changes: Partial<LinkDTO>) => {
        updateRows(rows.map((row) =>
            row.key === key
                ? {...row, link: {...row.link, ...changes}}
                : row
        ));
    };

    const moveLink = (index: number, direction: -1 | 1) => {
        const nextRows = [...rows];
        const target = index + direction;
        [nextRows[index], nextRows[target]] = [nextRows[target], nextRows[index]];
        updateRows(nextRows);
    };

    return <>
        <Stack sx={{
            gridColumn: "1 / -1",
        }}>
            <Button variant="contained" sx={{
                maxWidth: "240px",
                marginBottom: "16px",
            }}
                    onClick={() => updateRows([
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
                        onClick={() => updateRows(rows.filter((row) => row.key !== key))}
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

    const saveGame = useSaveGame();
    const navigate = useNavigate();
    const setSelectedGameId = useGameListStore((state) => state.actions.setSelectedGameId);

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
                    values={values}
                    setValues={setValues}
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
                                        setSelectedGameId(result.id);
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

    return <GameEditForm editMode={false} initialValues={gameDetails} series={series ?? []} platforms={platforms ?? []}
                         ageRatings={ageRatings ?? []}
                         genres={genres ?? []} regions={regions ?? []} companies={companies ?? []}
                         sources={sources ?? []} completionStatuses={completionStatuses ?? []}
                         categories={categories ?? []} features={features ?? []} tags={tags ?? []}/>;
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

    return <GameEditForm editMode={true} initialValues={gameDetails} series={series ?? []} platforms={platforms ?? []}
                         ageRatings={ageRatings ?? []}
                         genres={genres ?? []} regions={regions ?? []} companies={companies ?? []}
                         sources={sources ?? []} completionStatuses={completionStatuses ?? []}
                         categories={categories ?? []} features={features ?? []} tags={tags ?? []}/>
}

export function GameAddEditPane() {
    const {id} = useParams();
    if (id == null) {
        return <GameAddPane/>
    } else {
        return <GameEditPane id={id}/>
    }
}