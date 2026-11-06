import {useTranslation} from "react-i18next";
import {Stack, Typography} from "@mui/material";
import {isRouteErrorResponse, Link, useRouteError} from "react-router";

export function RootErrorPage() {
    const error = useRouteError();
    const {t} = useTranslation();

    if (isRouteErrorResponse(error) && error.status === 404) {
        return (
            <Stack sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
            }}>
                <Typography variant="h4" color="error">{t("error.404.title")}</Typography>
                <Typography variant="body1">{t("error.404.message")}</Typography>
                <Link to="/">{t("error.404.goHome")}</Link>
            </Stack>
        );
    }

    return (
        <Stack sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
        }}>
            <Typography variant="h4" color="error">{t("error.unknown.title")}</Typography>
            <Typography variant="body1">{t("error.unknown.message")}</Typography>
            <a href={window.location.href}>{t("error.unknown.refresh")}</a>
        </Stack>
    );
}