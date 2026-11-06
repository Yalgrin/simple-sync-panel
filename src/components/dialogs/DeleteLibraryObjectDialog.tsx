import {Button, DialogActions, DialogContent, DialogContentText} from "@mui/material";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();
    return (<>
        <DialogContent sx={{minWidth: '360px'}}>
            <DialogContentText>
                {t("library.delete.confirmation", {objectName})}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={close} autoFocus sx={{color: 'text.primary'}}>{t("common.cancel")}</Button>
            <Button variant="contained" color="error" onClick={async () => {
                await onDelete()
                close()
            }} disabled={disabledButtons}>{t("common.delete")}</Button>
        </DialogActions>
    </>)
}