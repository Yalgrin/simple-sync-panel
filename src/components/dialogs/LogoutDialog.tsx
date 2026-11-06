import {Button, DialogActions, DialogContent, DialogContentText} from "@mui/material";
import {useLogout} from "../../hooks/auth.ts";
import {useTranslation} from "react-i18next";

export function LogoutDialog({close}: Readonly<{
    close: () => void;
}>) {
    const {t} = useTranslation();
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => close()
        });
    };

    return (<>
        <DialogContent sx={{minWidth: '360px'}}>
            <DialogContentText>
                {t("logout.confirmation")}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={close} autoFocus sx={{color: 'text.primary'}}>{t("common.cancel")}</Button>
            <Button onClick={handleLogout} variant="contained" color="error">{t("layout.topBar.logout")}</Button>
        </DialogActions>
    </>)
}