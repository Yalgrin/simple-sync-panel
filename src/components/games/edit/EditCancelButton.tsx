import {useGameListStore} from "../../../store/useGameListStore.ts";
import {useNavigate} from "react-router";
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";

export function EditCancelButton({editMode, gameId}: Readonly<{
    editMode: boolean,
    gameId: number | undefined | null
}>) {
    const selectedGameId = useGameListStore((state) => state.selectedGameId);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleCancel = async () => {
        if (editMode && gameId) {
            await navigate("/games/" + gameId);
        } else if (selectedGameId) {
            await navigate("/games/" + selectedGameId);
        } else {
            await navigate("/games");
        }
    }

    return (<Button variant="outlined" size="small" onClick={handleCancel}>{t('game.edit.cancel')}</Button>)
}