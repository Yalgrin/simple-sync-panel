import {NavLink} from "react-router";
import {Box, IconButton, Stack, Tooltip} from "@mui/material";
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';

export const SIDEBAR_WIDTH = 64;

const options = [
    {label: "Games", icon: <SportsEsportsRoundedIcon/>, href: "/games"},
    {label: "Library", icon: <AppsRoundedIcon/>, href: "/library"},
];

export function SideBar() {
    return (
        <Box
            sx={{
                width: SIDEBAR_WIDTH,
                minWidth: SIDEBAR_WIDTH,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 1,
                borderRight: '1px solid rgba(255,255,255,0.08)'
            }}
        >
            <Stack spacing={1} sx={{alignItems: "center"}}>
                {options.map(({label, icon, href}) => (
                    <NavLink
                        key={href}
                        to={href}
                        style={{textDecoration: 'none'}}
                    >
                        {({isActive}) => (
                            <Tooltip title={label} placement="right">
                                <IconButton
                                    sx={{
                                        color: isActive ? 'text.primary' : 'text.secondary',
                                        bgcolor: isActive ? 'primary.main' : 'transparent',
                                        borderRadius: 2,
                                    }}
                                >
                                    {icon}
                                </IconButton>
                            </Tooltip>
                        )}
                    </NavLink>
                ))}
            </Stack>
        </Box>
    )
}