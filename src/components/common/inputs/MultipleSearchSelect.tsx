import {useMemo, useState} from "react";
import {useDialog} from "../../../hooks/useDialog.ts";
import {AddObjectDialog} from "../../dialogs/AddObjectDialog.tsx";
import {List, type RowComponentProps} from "react-window";
import {Box, Button, Checkbox, IconButton, Popover, TextField, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";

export interface MultipleSearchSelectProps {
    value: SelectOption[];
    setValue: (value: SelectOption[]) => void;
    options: SelectOption[];
    setOptions?: (options: SelectOption[]) => void;
    allowAdd?: boolean;
    disabled?: boolean;
}

export function MultipleSearchSelect({
                                         value,
                                         setValue,
                                         options,
                                         setOptions = () => {
                                         },
                                         allowAdd = false,
                                         disabled = false
                                     }: Readonly<MultipleSearchSelectProps>) {
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

    const toggleOption = (option: SelectOption) => {
        setValue(
            selectedIds.has(option.id)
                ? value.filter((selected) => selected.id !== option.id)
                : [...value, option]
        );
    };

    const addOption = (name: string) => {
        const option = options.find((option) => option.name === name);
        if (!option) {
            const newOption = {id: "new-" + crypto.randomUUID(), name: name} as SelectOption;
            setOptions([...options, newOption]);
            toggleOption(newOption);
        } else {
            if (!selectedIds.has(option.id)) {
                toggleOption(option);
            }
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
        items: SelectOption[];
        selected: Set<string>;
        onToggle: (option: SelectOption) => void;
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
            gridTemplateColumns: allowAdd ? "minmax(0, 1fr) 40px" : "minmax(0, 1fr)",
            gap: "6px",
            alignItems: "center",
        }}>
            <Box sx={{position: "relative", minWidth: 0}}>
                <Button
                    variant="outlined"
                    onClick={(event) => {
                        setOnlySelected(false);
                        setAnchorEl(event.currentTarget);
                    }}
                    disabled={disabled}
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
                    disabled={disabled || value.length === 0}
                >
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </Box>

            {allowAdd && (
                <IconButton
                    size="small"
                    aria-label="Add new object"
                    sx={{width: 40, height: "100%", p: 0}}
                    disabled={disabled}
                    onClick={() => {
                        setAnchorEl(null);
                        setSearchText("");
                        openAddDialog();
                    }}
                >
                    <AddIcon fontSize="small"/>
                </IconButton>
            )}

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
                        disabled={disabled}
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