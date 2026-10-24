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
                                        //TODO colors
                                        color: isActive ? 'primary.main' : 'grey.500',
                                        bgcolor: isActive ? 'secondary.main' : 'transparent',
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