import {Button, DialogActions, DialogContent, DialogContentText} from "@mui/material";

export function DeleteLibraryObjectDialog({
                                              close,
                                              objectName,
                                              disabledButtons,
                                              onDelete
                                          }: Readonly<{
    close: () => void;
    objectName: string;
    disabledButtons: boolean;
    onDelete: () => Promise<void>;
}>) {
    return (<>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete the selected object: "{objectName}"?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={close} autoFocus sx={{color: 'text.primary'}}>Cancel</Button>
            <Button variant="contained" color="error" onClick={async () => {
                await onDelete()
                close()
            }} disabled={disabledButtons}>Delete</Button>
        </DialogActions>
    </>)
}