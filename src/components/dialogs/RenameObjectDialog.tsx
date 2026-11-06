import {Button, DialogActions, DialogContent, TextField} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export function RenameObjectDialog({close, oldName, disabledButtons, onRename}: Readonly<{
    close: () => void;
    oldName: string;
    disabledButtons: boolean;
    onRename: (name: string) => Promise<void>;
}>) {
    const [name, setName] = useState<string>(() => oldName)
    const {t} = useTranslation();

    const handleAdd = async () => {
        if (name) {
            await onRename(name);
            close();
        }
    }

    return (<>
        <DialogContent sx={{minWidth: '360px'}}>
            <TextField
                autoFocus
                required
                margin="dense"
                name="name"
                label={t("common.name")}
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={close} sx={{color: 'text.primary'}}>{t("common.cancel")}</Button>
            <Button variant="contained" color="primary" onClick={handleAdd}
                    disabled={disabledButtons}>{t("common.rename")}</Button>
        </DialogActions>
    </>)
}