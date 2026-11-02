import {Button, DialogActions, DialogContent, TextField} from "@mui/material";
import {useState} from "react";

export function RenameObjectDialog({close, oldName, disabledButtons, onRename}: Readonly<{
    close: () => void;
    oldName: string;
    disabledButtons: boolean;
    onRename: (name: string) => Promise<void>;
}>) {
    const [name, setName] = useState<string>(() => oldName)

    const handleAdd = async () => {
        if (name) {
            await onRename(name);
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
            <Button onClick={close} sx={{color: 'text.primary'}}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleAdd} disabled={disabledButtons}>Rename</Button>
        </DialogActions>
    </>)
}