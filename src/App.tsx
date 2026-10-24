import {Box, CircularProgress, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import type {ReactNode} from "react";
import {Navigate, Outlet, useLocation, useMatch} from "react-router";
import {MainLayout} from "./components/layout/MainLayout.tsx";
import {useCurrentUser} from "./hooks/auth.ts";
import {useSseSession} from "./hooks/useSseSession.tsx";

//TODO
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {main: '#b39ddb'},
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

function App() {
    const {data: currentUser, isLoading} = useCurrentUser()
    const isLoginView = useMatch("/login");
    const {pathname, search, hash} = useLocation();
    useSseSession();

    if (!isLoading && !isLoginView && !currentUser) {
        const requestedPath = pathname + search + hash;
        const params = new URLSearchParams({redirect: requestedPath});
        return <Navigate to={`/login?${params.toString()}`} replace/>;
    }

    let mainLayout: ReactNode;

    if (isLoading) {
        mainLayout = <LoadingPage/>;
    } else if (isLoginView) {
        mainLayout = <Outlet/>
    } else {
        mainLayout = <MainLayout/>
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            {mainLayout}
        </ThemeProvider>
    )
}

export default App
