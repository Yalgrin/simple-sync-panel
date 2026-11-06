import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from "@mui/material";
import {type Blocker} from "react-router";
import {useTranslation} from "react-i18next";

export function UnsavedChangedDialog({blocker}: Readonly<{ blocker: Blocker }>) {
    const {t} = useTranslation();
    return (
        <Dialog
            open={blocker.state === "blocked"}
            onClose={() => blocker.state === "blocked" && blocker.reset()}
            slotProps={{
                paper: {
                    sx: {
                        '--dialog-surface': (theme) =>
                            theme.palette.mode === 'dark'
                                ? theme.palette.grey[800]
                                : theme.palette.background.paper,
                        bgcolor: 'var(--dialog-surface)',
                        backgroundImage: 'none',
                    },
                },
            }}
        >
            <DialogTitle>{t("unsavedChangeGuard.title")}</DialogTitle>
            <DialogContent sx={{minWidth: '360px'}}>
                <DialogContentText>{t("unsavedChangeGuard.message")}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    if (blocker.state === "blocked") blocker.reset();
                }} autoFocus sx={{color: 'text.primary'}}>
                    {t("unsavedChangeGuard.keepEditing")}
                </Button>
                <Button variant="contained" color="error" onClick={() => {
                    if (blocker.state === "blocked") blocker.proceed();
                }}>
                    {t("unsavedChangeGuard.discardChanges")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}