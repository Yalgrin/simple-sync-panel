import type {ReactNode} from "react";
import {Navigate, Outlet, useLocation, useMatch} from "react-router";
import {MainLayout} from "./components/layout/MainLayout.tsx";
import {useCurrentUser} from "./hooks/auth.ts";
import {useSseSession} from "./hooks/useSseSession.tsx";
import {DialogProvider} from "./components/DialogProvider.tsx";
import {SnackbarProvider} from "notistack";
import {RootErrorPage} from "./pages/RootErrorPage.tsx";
import {LoadingPage} from "./pages/LoadingPage.tsx";

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
        mainLayout = <RootErrorPage/>;
    } else if (isLoginView) {
        mainLayout = <Outlet/>
    } else {
        mainLayout = <MainLayout/>
    }

    return (
        <DialogProvider>
            <SnackbarProvider>
                {mainLayout}
            </SnackbarProvider>
        </DialogProvider>
    )
}

export default App
