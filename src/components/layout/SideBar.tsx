import {NavLink} from "react-router";
import {Box, IconButton, Stack, Tooltip} from "@mui/material";
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import {useTranslation} from "react-i18next";

export const SIDEBAR_WIDTH = 64;

const options = [
    {labelKey: "games", icon: <SportsEsportsRoundedIcon/>, href: "/games"},
    {labelKey: "library", icon: <AppsRoundedIcon/>, href: "/library"},
];

export function SideBar() {
    const {t} = useTranslation();

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
                {options.map(({labelKey, icon, href}) => (
                    <NavLink
                        key={href}
                        to={href}
                        style={{textDecoration: 'none'}}
                    >
                        {({isActive}) => (
                            <Tooltip title={t(`layout.sideBar.${labelKey}`)} placement="right">
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