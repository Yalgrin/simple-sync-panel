import type {PanelObjectDTO} from "../../../models/objects.ts";
import {Box, Button, Divider, IconButton, LinearProgress, ListItem, ListItemButton, Typography} from "@mui/material";
import {List, type RowComponentProps} from "react-window";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {type ReactNode} from "react";
import {useLibraryListStore} from "../../../store/useLibraryListStore.ts";
import {DeleteLibraryObjectDialog} from "../../dialogs/DeleteLibraryObjectDialog.tsx";
import {useDialog} from "../../../hooks/useDialog.ts";
import {RenameObjectDialog} from "../../dialogs/RenameObjectDialog.tsx";
import type {BaseProps} from "../../common/BaseProps.ts";
import {useNavigate} from "react-router";
import {AddObjectDialog} from "../../dialogs/AddObjectDialog.tsx";
import {mergeStyles} from "../../../functions/util.ts";

const ROW_HEIGHT = 40;

export interface LibraryRowProps<T extends PanelObjectDTO> {
    objectList: T[];
    onSelect: (obj: T) => void;
    onEdit: (obj: T) => void;
    onDelete: (obj: T) => void;
}

function LibraryRow<T extends PanelObjectDTO>({
                                                  index,
                                                  style,
                                                  objectList,
                                                  onSelect,
                                                  onEdit,
                                                  onDelete,
                                              }: RowComponentProps<LibraryRowProps<T>> & LibraryRowProps<T>) {
    const dto = objectList?.[index];
    const selectedObjectId = useLibraryListStore((state) => state.selectedObjectId);

    if (!dto) {
        return <div style={style}/>;
    }

    const isSelected = dto.id == selectedObjectId;

    return (
        <div style={style}>
            <ListItem
                disablePadding
                secondaryAction={
                    <>
                        <IconButton edge="end" aria-label="edit" onClick={() => onEdit(dto)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(dto)}>
                            <DeleteIcon/>
                        </IconButton>
                    </>
                }>
                <ListItemButton
                    selected={isSelected}
                    onClick={() => onSelect(dto)}
                    sx={{
                        height: ROW_HEIGHT,
                        alignItems: 'flex-start',
                        px: 1.5,
                        py: 1.25,
                    }}
                >
                    <Typography>{dto.name}</Typography>
                </ListItemButton>
            </ListItem>
        </div>
    );
}

export interface SimpleLibraryListPaneProps<T extends PanelObjectDTO> extends BaseProps {
    name: string;
    type: string;
    description?: ReactNode;
    addNewEnabled?: boolean;
    objectList: T[];
    isLoading: boolean;
    isPlaceholderData: boolean;
    error: Error | null;
    onCreate?: (name: string) => Promise<void>;
    onSave: (obj: T) => Promise<void>;
    onDelete: (obj: T) => Promise<void>;
}

export function SimpleLibraryListPane<T extends PanelObjectDTO>({
                                                                    name,
                                                                    type,
                                                                    description,
                                                                    addNewEnabled = false,
                                                                    objectList,
                                                                    isLoading,
                                                                    isPlaceholderData,
                                                                    error,
                                                                    onCreate = () => Promise.resolve(),
                                                                    onSave,
                                                                    onDelete,
                                                                    sx
                                                                }: Readonly<SimpleLibraryListPaneProps<T>>) {
    let loaderNode: ReactNode;
    if (isLoading || isPlaceholderData) {
        loaderNode = (<Box sx={{marginBottom: "12px", width: "100%"}}>
            <LinearProgress sx={{height: "4px"}}/>
        </Box>)
    } else if (error) {
        loaderNode = (<Box sx={{marginBottom: "12px", width: "100%"}}>
            <LinearProgress variant="determinate" color="error" value={100} sx={{height: "4px"}}/>
        </Box>)
    } else {
        loaderNode = (<Box sx={{marginBottom: "16px", width: "100%"}}/>)
    }

    const {openDialog} = useDialog();
    const navigate = useNavigate();

    const handleAddNew = () => {
        openDialog({
            title: "Add new object",
            render: ({close}) => {
                return <AddObjectDialog
                    close={close}
                    callback={async (newName: string) => {
                        await onCreate(newName)
                    }}
                />;
            },
        });
    };

    const handleRename = (obj: T) => {
        openDialog({
            title: "Rename object",
            render: ({close}) => {
                if (obj == null) {
                    return null;
                }
                return <RenameObjectDialog
                    close={close}
                    oldName={obj.name ?? ""}
                    onRename={async (newName: string) => {
                        const newObj = {...obj}
                        newObj.name = newName
                        await onSave(newObj)
                    }}
                    disabledButtons={isLoading}
                />;
            },
        });
    };

    const handleDelete = (obj: T) => {
        openDialog({
            title: "Delete object",
            render: ({close}) => {
                if (obj == null) {
                    return null;
                }
                return <DeleteLibraryObjectDialog
                    close={close}
                    objectName={obj.name ?? ""}
                    onDelete={async () => {
                        await onDelete(obj)
                    }}
                    disabledButtons={isLoading}
                />;
            },
        });
    };

    return (
        <Box
            sx={mergeStyles(
                {
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                },
                sx
            )}
        >

            <Box sx={{p: 1.5, flex: 0}}>
                <Typography variant="h6" sx={{fontWeight: 700, mb: 1}}>
                    {name}
                </Typography>
                {description}
                {addNewEnabled && <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddNew}
                >
                    Add new
                </Button>}
            </Box>

            <Divider/>

            <Box sx={{marginTop: "8px", flex: 0, minHeight: 0}}>
                {loaderNode}
            </Box>

            <Box sx={{marginTop: "8px", flex: 1, minHeight: 0}}>
                {Boolean(objectList.length) &&
                    (
                        <List
                            style={{height: '100%', minHeight: 0, flex: 1}}
                            rowComponent={LibraryRow<T>}
                            rowCount={objectList.length}
                            rowHeight={ROW_HEIGHT}
                            rowProps={{
                                objectList,
                                onSelect: async (obj: T) => {
                                    if (obj?.id) {
                                        await navigate("/library/" + type + "/" + obj.id)
                                    } else {
                                        await navigate("/library/" + type)
                                    }
                                },
                                onEdit: (obj: T) => handleRename(obj),
                                onDelete: (obj: T) => handleDelete(obj),
                            }}
                        />
                    )}
            </Box>
        </Box>
    )
}