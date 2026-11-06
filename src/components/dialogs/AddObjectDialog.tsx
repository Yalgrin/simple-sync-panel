import {Button, DialogActions, DialogContent, TextField} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export function AddObjectDialog({close, callback}: Readonly<{
    close: () => void;
    callback: (name: string) => void;
}>) {
    const [name, setName] = useState<string>("")
    const {t} = useTranslation();

    const handleAdd = () => {
        if (name) {
            callback(name);
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
            <Button variant="contained" color="primary" onClick={handleAdd}>{t("common.add")}</Button>
        </DialogActions>
    </>)
}