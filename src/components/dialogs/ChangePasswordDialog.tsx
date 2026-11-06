import {Alert, Box, Button, DialogActions, DialogContent, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {useChangePassword} from "../../hooks/auth.ts";
import {useTranslation} from "react-i18next";

export function ChangePasswordDialog({close}: Readonly<{
    close: () => void;
}>) {
    const {t} = useTranslation();
    const changePasswordMutation = useChangePassword();

    const [newPasswordError, setNewPasswordError] = useState(false);
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('');
    const [repeatedNewPasswordError, setRepeatedNewPasswordError] = useState(false);
    const [repeatedNewPasswordErrorMessage, setRepeatedNewPasswordErrorMessage] = useState('');

    const validate = function () {
        const oldPassword = document.getElementById('oldPassword') as HTMLInputElement;
        const newPassword = document.getElementById('newPassword') as HTMLInputElement;
        const repeatedNewPassword = document.getElementById('repeatedNewPassword') as HTMLInputElement;

        let isValid = true;

        if (newPassword.value !== repeatedNewPassword.value) {
            setNewPasswordError(true);
            setRepeatedNewPasswordError(true);
            setNewPasswordErrorMessage(t("changePassword.validation.passwordsDoNotMatch"));
            setRepeatedNewPasswordErrorMessage(t("changePassword.validation.passwordsDoNotMatch"));
            isValid = false;
        } else {
            setNewPasswordError(false);
            setNewPasswordErrorMessage('');
            setRepeatedNewPasswordError(false);
            setRepeatedNewPasswordErrorMessage('');
        }

        if (isValid && oldPassword.value === newPassword.value) {
            setNewPasswordError(true);
            setNewPasswordErrorMessage(t("changePassword.validation.newPasswordMustDiffer"));
            isValid = false;
        } else {
            setNewPasswordError(false);
            setNewPasswordErrorMessage('');
        }

        return isValid;
    }

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        changePasswordMutation.reset();

        if (!validate()) {
            return;
        }

        const formData = new FormData(event.currentTarget);
        changePasswordMutation.mutate({
            oldPassword: formData.get('oldPassword') as string,
            newPassword: formData.get('newPassword') as string,
        }, {
            onSuccess: () => close(),
        });
    };

    return (<>
        <DialogContent sx={{minWidth: '360px'}}>
            {changePasswordMutation.isError && (
                <Alert severity="error" sx={{marginBottom: '24px'}}>
                    {t("changePassword.error.changeFailed")}
                </Alert>
            )}
            <Box
                component="form"
                onSubmit={handleSubmit}
                id="change-password-form"
                sx={{
                    '& .MuiInputBase-input:autofill': {
                        WebkitBoxShadow:
                            '0 0 0 100px var(--dialog-surface) inset',
                        WebkitTextFillColor: (theme) => theme.palette.text.primary,
                    },
                }}
            >
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="oldPassword"
                    name="oldPassword"
                    label={t("changePassword.fields.oldPassword")}
                    autoComplete="current-password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    error={newPasswordError}
                    helperText={newPasswordErrorMessage}
                    required
                    margin="dense"
                    id="newPassword"
                    name="newPassword"
                    label={t("changePassword.fields.newPassword")}
                    type="password"
                    fullWidth
                    variant="standard"
                    color={newPasswordError ? 'error' : 'primary'}
                />
                <TextField
                    error={repeatedNewPasswordError}
                    helperText={repeatedNewPasswordErrorMessage}
                    required
                    margin="dense"
                    id="repeatedNewPassword"
                    name="repeatedNewPassword"
                    label={t("changePassword.fields.repeatNewPassword")}
                    type="password"
                    fullWidth
                    variant="standard"
                    color={repeatedNewPasswordError ? 'error' : 'primary'}
                />
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={close} sx={{color: 'text.primary'}}>{t("common.cancel")}</Button>
            <Button
                type="submit"
                variant="contained"
                form="change-password-form"
                disabled={changePasswordMutation.isPending}
            >
                {t("layout.topBar.changePassword")}
            </Button>
        </DialogActions>
    </>)
}