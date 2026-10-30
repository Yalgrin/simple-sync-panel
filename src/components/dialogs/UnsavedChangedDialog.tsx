import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from "@mui/material";
import {type Blocker} from "react-router";

export function UnsavedChangedDialog({blocker}: Readonly<{ blocker: Blocker }>) {
    return (
        <Dialog
            open={blocker.state === "blocked"}
            onClose={() => blocker.state === "blocked" && blocker.reset()}
        >
            <DialogTitle>Discard unsaved changes?</DialogTitle>
            <DialogContent>
                <DialogContentText>Your changes have not been saved.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    if (blocker.state === "blocked") blocker.reset();
                }} autoFocus sx={{color: 'text.primary'}}>
                    Keep editing
                </Button>
                <Button variant="contained" color="error" onClick={() => {
                    if (blocker.state === "blocked") blocker.proceed();
                }}>
                    Discard changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}