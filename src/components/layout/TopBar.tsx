import {Link, useMatch} from "react-router";
import {AppBar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography} from "@mui/material";
import SkeletonImage from "../SkeletonImage.tsx";
import {CurrentUserAvatar} from "../CurrentUserAvatar.tsx";
import {type SetStateAction, useState} from "react";
import {Logout} from "@mui/icons-material";
import KeyIcon from '@mui/icons-material/Key';
import {useDialog} from "../../hooks/useDialog.ts";
import {LogoutDialog} from "../dialogs/LogoutDialog.tsx";
import {ChangePasswordDialog} from "../dialogs/ChangePasswordDialog.tsx";
import {FilterButton} from "../FilterButton.tsx";
import {SessionStatusIcon} from "../SessionStatusIcon.tsx";
import {version} from "../../../package.json";

export const TOP_BAR_HEIGHT = 56;

export function TopBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const isGamesView = useMatch("/games");
    const isGamesSubView = useMatch("/games/*");
    const isAnyGamesView = isGamesView || isGamesSubView;

    const {openDialog} = useDialog();

    const handleClick = (event: { currentTarget: SetStateAction<HTMLElement | null>; }) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangePassword = () => {
        setAnchorEl(null);
        openDialog({
            title: "Change password",
            render: ChangePasswordDialog,
        });
    };
    const handleLogout = () => {
        setAnchorEl(null);
        openDialog({
            title: "Logout",
            render: LogoutDialog,
        });
    };

    return <AppBar position="static" sx={{
        height: `${TOP_BAR_HEIGHT}px`,
    }}>
        <Stack direction="row" sx={{
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <Link to="/" style={{
                textDecoration: 'none',
            }}>
                <Stack direction="row" sx={{
                    alignItems: "center",
                    padding: "4px",
                    paddingLeft: "8px",
                    flexGrowth: 0
                }}>
                    <SkeletonImage src="/logo.svg" alt="Logo" width={48} height={48}/>
                    <Typography variant="h6" sx={{
                        paddingLeft: "12px",
                        color: "text.primary",
                        "&:link, &:visited, &:hover, &:active, &:focus": {
                            color: "text.primary",
                        },
                    }}>
                        Simple Sync Panel
                    </Typography>
                    <Typography variant="caption" sx={{ml: 1, color: "text.secondary"}}>
                        v{version}
                    </Typography>
                </Stack>
            </Link>

            <Stack direction="row" spacing={1} sx={{
                alignItems: "center",
                padding: "4px",
                paddingRight: "12px"
            }}>
                <SessionStatusIcon/>
                <Divider orientation="vertical" flexItem/>
                {isAnyGamesView &&
                    (<><FilterButton/>
                        <Divider orientation="vertical" flexItem/></>)
                }

                <IconButton
                    onClick={handleClick}
                    size="small"
                >
                    <CurrentUserAvatar/>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                    <MenuItem onClick={handleChangePassword}>
                        <ListItemIcon>
                            <KeyIcon fontSize="small"/>
                        </ListItemIcon>
                        Change password
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Stack>
        </Stack>
    </AppBar>
}