import {Box, CircularProgress, createTheme, CssBaseline, Stack, ThemeProvider, Typography} from "@mui/material";
import type {ReactNode} from "react";
import {Navigate, Outlet, useLocation, useMatch} from "react-router";
import {MainLayout} from "./components/layout/MainLayout.tsx";
import {useCurrentUser} from "./hooks/auth.ts";
import {useSseSession} from "./hooks/useSseSession.tsx";
import {DialogProvider} from "./components/DialogProvider.tsx";
import {SnackbarProvider} from "notistack";

//TODO
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {main: '#1565c0'},
    }
});

function LoadingPage() {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
        }}>
            <CircularProgress size="96px"/>
        </Box>
    );
}

//TODO
function ErrorPage() {
    return (
        <Stack sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
        }}>
            <Typography variant="h4" color="error">Error</Typography>
            <Typography variant="body1" color="error">Something went wrong</Typography>
        </Stack>
    );
}

function App() {
    const {data: currentUser, isLoading, error} = useCurrentUser()
    const isLoginView = useMatch("/login");
    const {pathname, search, hash} = useLocation();
    useSseSession();

    if (!error && !isLoading && !isLoginView && !currentUser) {
        const requestedPath = pathname + search + hash;
        const params = new URLSearchParams({redirect: requestedPath});
        return <Navigate to={`/login?${params.toString()}`} replace/>;
    }

    let mainLayout: ReactNode;

    if (isLoading) {
        mainLayout = <LoadingPage/>;
    } else if (error) {
        mainLayout = <ErrorPage/>;
    } else if (isLoginView) {
        mainLayout = <Outlet/>
    } else {
        mainLayout = <MainLayout/>
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            <DialogProvider>
                <SnackbarProvider>
                    {mainLayout}
                </SnackbarProvider>
            </DialogProvider>
        </ThemeProvider>
    )
}

export default App
