import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {LoginPage} from "./pages/LoginPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {GamesPage} from "./pages/GamesPage.tsx";
import {LibraryPage} from "./pages/LibraryPage.tsx";
import '@fontsource/roboto/500.css';
import {DialogProvider} from "./components/DialogProvider.tsx";
import {GameDetailsPane} from "./components/games/GameDetailsPane.tsx";
import {GameEditPane} from "./components/games/GameEditPane.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
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
                        Component: GameEditPane
                    }
                ]
            },
            {
                path: "/library",
                Component: LibraryPage
            }
        ]
    }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <DialogProvider>
                <RouterProvider router={router}/>
            </DialogProvider>
        </QueryClientProvider>
    </StrictMode>,
)
