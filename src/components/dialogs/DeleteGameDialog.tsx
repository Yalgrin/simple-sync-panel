import {Button, DialogActions, DialogContent, DialogContentText} from "@mui/material";
import type {PanelGameDTO} from "../../models/objects.ts";
import {useDeleteGame} from "../../hooks/objects.ts";
import {useTranslation} from "react-i18next";

export function DeleteGameDialog({close, game}: Readonly<{
    close: () => void;
    game: PanelGameDTO;
}>) {
    const {t} = useTranslation();
    const deleteMutation = useDeleteGame(game);

    const handleDelete = () => {
        deleteMutation.mutate(undefined, {
            onSuccess: () => close()
        });
    };

    return (<>
        <DialogContent sx={{minWidth: '360px'}}>
            <DialogContentText>
                {t("game.delete.confirmation")}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={close} autoFocus sx={{color: 'text.primary'}}>{t("common.cancel")}</Button>
            <Button variant="contained" color="error" onClick={handleDelete}
                    disabled={deleteMutation.isPending}>{t("common.delete")}</Button>
        </DialogActions>
    </>)
}