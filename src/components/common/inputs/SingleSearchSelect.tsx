import {useMemo, useState} from "react";
import {useDialog} from "../../../hooks/useDialog.ts";
import {AddObjectDialog} from "../../dialogs/AddObjectDialog.tsx";
import {List, type RowComponentProps} from "react-window";
import {Box, Button, IconButton, Popover, TextField, Typography} from "@mui/material";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export interface SingleSearchSelectProps {
    value: SelectOption<string> | undefined | null;
    setValue: (value: SelectOption<string> | null) => void;
    options: SelectOption<string>[];
    setOptions?: (options: SelectOption<string>[]) => void;
    allowAdd?: boolean;
    disabled?: boolean;
}

export function SingleSearchSelect({
                                       value, setValue, options, setOptions = () => {
    }, allowAdd = false, disabled = false
                                   }: Readonly<SingleSearchSelectProps>) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [searchText, setSearchText] = useState("");

    const filteredOptions = useMemo(() => {
        const query = searchText.trim().toLowerCase();
        return query
            ? options.filter((option) => (option.name ?? "").toLowerCase().includes(query))
            : options;
    }, [options, searchText]);

    const setOption = (option: SelectOption<string> | null) => {
        setAnchorEl(null);
        setSearchText("");
        setValue(option);
    }

    const addOption = (name: string) => {
        const option = options.find((option) => option.name === name);
        if (!option) {
            const newOption = {id: crypto.randomUUID(), name: name} as SelectOption<string>;
            let newOptionList = [...options, newOption];
            newOptionList = newOptionList.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
            setOptions(newOptionList);
            setOption(newOption);
        } else {
            setOption(option);
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
        items: SelectOption<string>[];
        onSelect: (option: SelectOption<string> | null) => void;
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
            gridTemplateColumns: allowAdd ? "minmax(0, 1fr) 40px" : "minmax(0, 1fr)",
            gap: "6px",
            alignItems: "center",
        }}>
            <Box sx={{position: "relative", minWidth: 0}}>
                <Button
                    variant="outlined"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
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
                    <Typography noWrap>
                        {value?.name ?? ""}
                    </Typography>
                </Button>
                <IconButton
                    size="small"
                    onClick={() => setValue(null)}
                    sx={{
                        position: "absolute",
                        right: 4,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    disabled={disabled || !value}
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
                <Box sx={{p: 1}}>
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Search..."
                        disabled={disabled}
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