import {Box, Divider, ListItemButton, ListItemText, Typography, useTheme} from "@mui/material";
import {LIBRARY_OBJECT_TYPES} from "../../models/library/LibraryObjectType.ts";
import {NavLink} from "react-router";
import {useLibraryListStore} from "../../store/useLibraryListStore.ts";

const ROW_HEIGHT = 48;

export function LibraryTypePane() {
    const theme = useTheme();
    const libraryStoreActions = useLibraryListStore((state) => state.actions);

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
                    Libraries
                </Typography>
            </Box>

            <Divider/>

            <Box sx={{marginTop: "8px", flex: 1, minHeight: 0, overflowY: 'auto'}}>
                {LIBRARY_OBJECT_TYPES.map((type) => (
                    <NavLink
                        key={type.path}
                        to={type.path}
                        end={false}
                        onClick={() => libraryStoreActions.clear()}
                        style={{
                            color: theme.palette.text.primary,
                            textDecoration: 'none',
                            height: ROW_HEIGHT,
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
                                <ListItemText sx={{textAlign: 'center'}}>{type.name}</ListItemText>
                            </ListItemButton>
                        }}
                    </NavLink>
                ))}
            </Box>
        </Box>
    );
}