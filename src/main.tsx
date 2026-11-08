import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './i18n.ts'
import {createBrowserRouter, RouterProvider} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {LoginPage} from "./pages/LoginPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {GamesPage} from "./pages/GamesPage.tsx";
import {LibraryPage} from "./pages/LibraryPage.tsx";
import '@fontsource/roboto/500.css';
import {GameDetailsPane} from "./components/games/GameDetailsPane.tsx";
import {GameAddEditPane} from "./components/games/GameAddEditPane.tsx";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {localeConfig} from "./localeInitialization.ts"
import {LibraryListPane} from "./components/library/LibraryListPane.tsx";
import {RootErrorPage} from "./pages/RootErrorPage.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

//TODO error handling, 404 etc
//TODO better error and loading handling in each view
const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        ErrorBoundary: RootErrorPage,
        children: [
            {
                path: "/",
                Component: HomePage
            },
            {
                path: "/login",
                Component: LoginPage
            },
            {
                path: "/games",
                Component: GamesPage,
                children: [
                    {
                        index: true,
                        Component: GameDetailsPane
                    },
                    {
                        path: ":id",
                        Component: GameDetailsPane
                    },
                    {
                        path: "edit/:id",
                        Component: GameAddEditPane
                    },
                    {
                        path: "add",
                        Component: GameAddEditPane
                    }
                ]
            },
            {
                path: "/library",
                Component: LibraryPage,
                children: [
                    {
                        index: true,
                        Component: LibraryListPane
                    },
                    {
                        path: ":type",
                        Component: LibraryListPane
                    },
                    {
                        path: ":type/:id",
                        Component: LibraryListPane
                    }
                ]
            }
        ]
    }
])

//TODO
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {main: '#1565c0'},
    }
});

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}
                                  adapterLocale={localeConfig.dayjs}>
                <ThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme/>
                    <RouterProvider router={router}/>
                </ThemeProvider>
            </LocalizationProvider>
        </QueryClientProvider>
    </StrictMode>,
)
