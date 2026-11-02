import {create} from "zustand/react";
import type {SessionState} from "../models/session.ts";

export const useSessionState = create<SessionState>((set) => ({
    sessionId: undefined,
    serverVersion: undefined,
    active: false,
    loading: false,
    error: false,
    connected: false,
    actions: {
        reset: () => set({
            sessionId: undefined,
            serverVersion: undefined,
            active: false,
            loading: false,
            error: false,
            connected: false
        }),
        markAsConnecting: () => set({active: true, loading: true, connected: false, error: false}),
        markAsConnected: () => set({active: true, loading: false, connected: true, error: false}),
        markAsConnectionError: () => set({
            sessionId: undefined,
            serverVersion: undefined,
            active: true,
            loading: false,
            connected: false,
            error: true
        }),
        setSessionId: (sessionId: string | undefined) => set({sessionId}),
        setServerVersion: (serverVersion: string | undefined) => set({serverVersion}),
        setActive: (active: boolean) => set({active}),
        setLoading: (loading: boolean) => set({loading}),
        setError: (error: boolean) => set({error}),
        setConnected: (connected: boolean) => set({connected})
    }
}));