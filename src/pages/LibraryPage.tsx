import {Box} from "@mui/material";
import {LIBRARY_OBJECTS_WIDTH} from "../constants/main-layout.ts";
import {Outlet} from "react-router";
import {LibraryTypePane} from "../components/library/LibraryTypePane.tsx";

export function LibraryPage() {
    return (
        <>
            <Box
                sx={{
                    width: LIBRARY_OBJECTS_WIDTH,
                    minWidth: LIBRARY_OBJECTS_WIDTH,
                    borderRight: '1px solid',
                    height: "100%",
                    minHeight: 0,
                    overflow: 'hidden',
                    borderColor: 'rgba(255,255,255,0.08)'
                }}
            >
                <LibraryTypePane/>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    minWidth: 0,
                    height: "100%",
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}
            >
                <Outlet/>
            </Box>
        </>
    );
}