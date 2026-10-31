import {Alert, Box, Button, DialogActions, DialogContent, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {useChangePassword} from "../../hooks/auth.ts";

export function ChangePasswordDialog({close}: Readonly<{
    close: () => void;
}>) {
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
            setNewPasswordErrorMessage('Passwords do not match!');
            setRepeatedNewPasswordErrorMessage('Passwords do not match!');
            isValid = false;
        } else {
            setNewPasswordError(false);
            setNewPasswordErrorMessage('');
            setRepeatedNewPasswordError(false);
            setRepeatedNewPasswordErrorMessage('');
        }

        if (isValid && oldPassword.value === newPassword.value) {
            setNewPasswordError(true);
            setNewPasswordErrorMessage('New password must be different from the old password!');
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
        <DialogContent>
            {changePasswordMutation.isError && (
                <Alert severity="error" sx={{marginBottom: '24px'}}>
                    Failed to change password. Check your credentials and try again.
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
                    label="Old password"
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
                    label="New password"
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
                    label="Repeat new password"
                    type="password"
                    fullWidth
                    variant="standard"
                    color={repeatedNewPasswordError ? 'error' : 'primary'}
                />
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={close} sx={{color: 'text.primary'}}>Cancel</Button>
            <Button
                type="submit"
                variant="contained"
                form="change-password-form"
                disabled={changePasswordMutation.isPending}
            >
                Change password
            </Button>
        </DialogActions>
    </>)
}