import {
    Box,
    Button,
    Card,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {useCurrentUser, useLogin} from "../hooks/auth.ts";
import {Navigate, useLocation, useNavigate} from "react-router";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";

export function LoginPage() {
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const {data: currentUser, isLoading} = useCurrentUser()
    const navigate = useNavigate();
    const {search} = useLocation();
    const {enqueueSnackbar} = useSnackbar();

    const {t} = useTranslation();

    const loginMutation = useLogin()

    const params = new URLSearchParams(search);
    const redirect = params.get("redirect");
    const destination =
        redirect?.startsWith("/") && !redirect.startsWith("//")
            ? redirect
            : "/";

    if (!isLoading && currentUser) {
        return <Navigate to={destination} replace/>;
    }

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginMutation.reset();

        if (!validateInputs()) {
            return;
        }

        const rememberMeCheckbox = document.getElementById('remember') as HTMLInputElement;
        const data = new FormData(event.currentTarget);
        loginMutation.mutate({
            username: data.get('login') as string,
            password: data.get('password') as string,
            rememberMe: rememberMeCheckbox.checked,
        }, {
            onSuccess: () => navigate(destination, {replace: true}),
            onError: () => enqueueSnackbar(t('login.loginFailed'), {
                variant: 'error',
                anchorOrigin: {vertical: 'bottom', horizontal: 'right'}
            }),
        });
    };

    const validateInputs = () => {
        const login = document.getElementById('login') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        let isValid = true;

        if (!login.value) {
            setLoginError(true);
            setLoginErrorMessage(t('login.enterValidLogin'));
            isValid = false;
        } else {
            setLoginError(false);
            setLoginErrorMessage('');
        }

        if (!password.value) {
            setPasswordError(true);
            setPasswordErrorMessage(t('login.enterValidPassword'));
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <Stack sx={{
            justifyContent: 'space-between',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
            minHeight: '100%',
        }}>
            <Card variant="outlined" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
                width: '100%',
                margin: 'auto',
                maxWidth: '650px',
                padding: '4rem',
                overflow: 'inherit'
            }}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        width: '100%',
                        fontSize: '40px',
                        marginBottom: '48px',
                    }}
                >
                    {t('login.title')}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                        '& .MuiInputBase-input:autofill': {
                            WebkitBoxShadow: (theme) =>
                                `0 0 0 100px ${theme.palette.background.paper} inset`,
                            WebkitTextFillColor: (theme) => theme.palette.text.primary,
                        },
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="login">{t('login.fields.login')}</FormLabel>
                        <TextField
                            error={loginError}
                            helperText={loginErrorMessage}
                            id="login"
                            type="text"
                            name="login"
                            autoComplete="username"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={loginError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">{t('login.fields.password')}</FormLabel>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" id="remember"/>}
                        label={t('login.fields.rememberMe')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loginMutation.isPending}
                    >
                        {t('login.fields.signIn')}
                    </Button>
                </Box>
            </Card>
        </Stack>
    )
}