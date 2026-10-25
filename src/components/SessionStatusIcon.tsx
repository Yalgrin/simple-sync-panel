import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import PublicOffRoundedIcon from '@mui/icons-material/PublicOffRounded';
import {useSessionState} from "../store/useSessionState.ts";
import type {ReactNode} from "react";
import {Tooltip} from "@mui/material";

export function SessionStatusIcon() {
    const sessionState = useSessionState();

    let icon: ReactNode
    if (sessionState.connected) {
        icon = <PublicRoundedIcon/>;
    } else {
        icon = <PublicOffRoundedIcon/>;
    }

    const getConnectedMessage = function () {
        let result: string
        result = "Server connection status\n"
        if (sessionState.connected) {
            result += "Connected.";
        } else if (sessionState.loading) {
            result += "Connecting...";
        } else if (sessionState.error) {
            result += "Connection error!";
        } else {
            result += "Disconnected."
        }
        if (sessionState.sessionId) {
            result += "\nSession ID: " + sessionState.sessionId;
        }
        if (sessionState.serverVersion) {
            result += "\nServer version: " + sessionState.serverVersion;
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