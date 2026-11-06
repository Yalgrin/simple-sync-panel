import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import PublicOffRoundedIcon from '@mui/icons-material/PublicOffRounded';
import {useSessionState} from "../store/useSessionState.ts";
import type {ReactNode} from "react";
import {Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";

export function SessionStatusIcon() {
    const sessionState = useSessionState();
    const {t} = useTranslation();

    let icon: ReactNode
    if (sessionState.connected) {
        icon = <PublicRoundedIcon/>;
    } else {
        icon = <PublicOffRoundedIcon/>;
    }

    const getConnectedMessage = function () {
        let result: string
        result = t("session.status.label") + "\n"
        if (sessionState.connected) {
            result += t("session.status.connected");
        } else if (sessionState.loading) {
            result += t("session.status.connecting");
        } else if (sessionState.error) {
            result += t("session.status.connectionError");
        } else {
            result += t("session.status.disconnected")
        }
        if (sessionState.sessionId) {
            result += "\n" + t("session.status.sessionId", {sessionId: sessionState.sessionId});
        }
        if (sessionState.serverVersion) {
            result += "\n" + t("session.status.serverVersion", {serverVersion: sessionState.serverVersion});
        }
        return result;
    }

    return (
        <Tooltip
            title={
                <span style={{whiteSpace: 'pre-line'}}>
                        {getConnectedMessage()}
                    </span>
            }>
            {icon}
        </Tooltip>
    );
}