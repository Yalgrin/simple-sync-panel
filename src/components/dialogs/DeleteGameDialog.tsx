import {Button, DialogActions, DialogContent, DialogContentText} from "@mui/material";
import type {PanelGameDTO} from "../../models/objects.ts";
import {useDeleteGame} from "../../hooks/objects.ts";

export function DeleteGameDialog({close, game}: Readonly<{
    close: () => void;
    game: PanelGameDTO;
}>) {

    const deleteMutation = useDeleteGame(game);

    const handleDelete = () => {
        deleteMutation.mutate(undefined, {
            onSuccess: () => close()
        });
    };

    return (<>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete the selected game?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={close} autoFocus sx={{color: 'text.primary'}}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleDelete}
                    disabled={deleteMutation.isPending}>Delete</Button>
        </DialogActions>
    </>)
}