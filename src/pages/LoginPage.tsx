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

export function LoginPage() {
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const {data: currentUser, isLoading} = useCurrentUser()
    const navigate = useNavigate();
    const {search} = useLocation();
    const {enqueueSnackbar} = useSnackbar();

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
            onError: () => enqueueSnackbar('Login failed. Please check your credentials.', {
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
            setLoginErrorMessage('Please enter a valid login.');
            isValid = false;
        } else {
            setLoginError(false);
            setLoginErrorMessage('');
        }

        if (!password.value) {
            setPasswordError(true);
            setPasswordErrorMessage('Please enter a valid password.');
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
                    Simple Sync Panel Sign In
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
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="login">Login</FormLabel>
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
                        <FormLabel htmlFor="password">Password</FormLabel>
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
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loginMutation.isPending}
                    >
                        Sign in
                    </Button>
                </Box>
            </Card>
        </Stack>
    )
}