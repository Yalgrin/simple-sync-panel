import {useGameListStore} from "../../../store/useGameListStore.ts";
import {useNavigate} from "react-router";
import {Button} from "@mui/material";

export function EditCancelButton({editMode, gameId}: Readonly<{
    editMode: boolean,
    gameId: number | undefined | null
}>) {
    const selectedGameId = useGameListStore((state) => state.selectedGameId);
    const navigate = useNavigate();

    const handleCancel = () => {
        if (editMode && gameId) {
            navigate("/games/" + gameId);
        } else if (selectedGameId) {
            navigate("/games/" + selectedGameId);
        } else {
            navigate("/games");
        }
    }

    return (<Button variant="outlined" size="small" onClick={handleCancel}>Cancel</Button>)
}