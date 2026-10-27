import {Button, DialogActions, DialogContent, TextField} from "@mui/material";
import {useState} from "react";

export function AddObjectDialog({close, callback}: Readonly<{
    close: () => void;
    callback: (name: string) => void;
}>) {
    const [name, setName] = useState<string>("")

    const handleAdd = () => {
        if (name) {
            callback(name);
            close();
        }
    }

    return (<>
        <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                name="name"
                label="Name"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={close} autoFocus sx={{color: 'text.primary'}}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
        </DialogActions>
    </>)
}