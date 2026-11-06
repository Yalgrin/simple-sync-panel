import {Box, CircularProgress} from "@mui/material";

export function LoadingPage() {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
        }}>
            <CircularProgress size="96px"/>
        </Box>
    );
}