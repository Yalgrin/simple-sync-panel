import {Box, Divider, ListItemButton, ListItemText, Typography, useTheme} from "@mui/material";
import {LIBRARY_OBJECT_TYPES} from "../../models/library/LibraryObjectType.ts";
import {NavLink, useLocation} from "react-router";
import {useLibraryListStore} from "../../store/useLibraryListStore.ts";
import {useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";
import {LIBRARY_TYPE_PAN_ROW_HEIGHT} from "../../constants/main-layout.ts";

function getLibraryTypePath(pathname: string) {
    return LIBRARY_OBJECT_TYPES.find(
        (type) => pathname === type.path || pathname.startsWith(`${type.path}/`)
    )?.path;
}

export function LibraryTypePane() {
    const theme = useTheme();
    const libraryStoreActions = useLibraryListStore((state) => state.actions);
    const {pathname} = useLocation();
    const typePath = getLibraryTypePath(pathname);
    const previousTypePath = useRef(typePath);
    const {t} = useTranslation();

    useEffect(() => {
        if (previousTypePath.current !== typePath) {
            libraryStoreActions.clear();
            previousTypePath.current = typePath;
        }
    }, [typePath, libraryStoreActions]);

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >

            <Box sx={{p: 1.5, flex: 0}}>
                <Typography variant="h6" sx={{fontWeight: 700, mb: 1}}>
                    {t('library.type-pane.title')}
                </Typography>
            </Box>

            <Divider/>

            <Box sx={{marginTop: "8px", flex: 1, minHeight: 0, overflowY: 'auto'}}>
                {LIBRARY_OBJECT_TYPES.map((type) => (
                    <NavLink
                        key={type.path}
                        to={type.path}
                        end={false}
                        style={{
                            color: theme.palette.text.primary,
                            textDecoration: 'none',
                            height: LIBRARY_TYPE_PAN_ROW_HEIGHT,
                            alignItems: 'flex-start',
                            width: '100%'
                        }}
                    >
                        {({isActive}) => {
                            return <ListItemButton
                                selected={isActive}
                                sx={{
                                    color: isActive ? 'text.primary' : 'text.secondary',
                                    fontWeight: isActive ? 700 : 300
                                }}
                            >
                                <ListItemText
                                    sx={{textAlign: 'center'}}>{t(`enums.LibraryObjectType.${type.id}`, {defaultValue: type.name})}</ListItemText>
                            </ListItemButton>
                        }}
                    </NavLink>
                ))}
            </Box>
        </Box>
    );
}