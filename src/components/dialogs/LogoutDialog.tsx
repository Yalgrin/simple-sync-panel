import {Button, DialogActions, DialogContent, DialogContentText} from "@mui/material";
import {useLogout} from "../../hooks/auth.ts";

export function LogoutDialog({close}: Readonly<{
    close: () => void;
}>) {

    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => close()
        });
    };

    return (<>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to log out?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={close} autoFocus>Cancel</Button>
            <Button onClick={handleLogout}>Logout</Button>
        </DialogActions>
    </>)
}