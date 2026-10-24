import {Outlet} from "react-router";
import {Box} from "@mui/material";
import {TOP_BAR_HEIGHT, TopBar} from "./TopBar.tsx";
import {SideBar} from "./SideBar.tsx";

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