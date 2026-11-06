import {Outlet} from "react-router";
import {Box} from "@mui/material";
import {TopBar} from "./TopBar.tsx";
import {SideBar} from "./SideBar.tsx";
import {TOP_BAR_HEIGHT} from "../../constants/main-layout.ts";

export function MainLayout() {
    return (
        <Box
            sx={{
                height: '100vh',
                color: 'grey.100',
                overflow: 'hidden',
            }}
        >
            <TopBar/>
            <Box sx={{
                height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`,
                display: 'flex',
                minWidth: 0,
            }}>
                <SideBar/>
                <Outlet/>
            </Box>
        </Box>
    )
}