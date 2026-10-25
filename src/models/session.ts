export interface SessionState {
    sessionId: string | undefined;
    serverVersion: string | undefined;
    active: boolean;
    loading: boolean;
    error: boolean;
    connected: boolean;
    actions: {
        reset: () => void;
        markAsConnecting: () => void;
        markAsConnected: () => void;
        markAsConnectionError: () => void;
        setSessionId: (sessionId: string | undefined) => void;
        setServerVersion: (serverVersion: string | undefined) => void;
        setActive: (active: boolean) => void;
        setLoading: (loading: boolean) => void;
        setError: (error: boolean) => void;
        setConnected: (connected: boolean) => void;
    };
}

export const MessageType = {
    INITIALIZATION: 'INITIALIZATION',
    CHANGE: 'CHANGE'
} as const;

export type MessageType =
    typeof MessageType[keyof typeof MessageType];

export const ObjectType = {
    CATEGORY: 'CATEGORY',
    GENRE: 'GENRE',
    PLATFORM: 'PLATFORM',
    PLATFORM_DIFF: 'PLATFORM_DIFF',
    COMPANY: 'COMPANY',
    FEATURE: 'FEATURE',
    TAG: 'TAG',
    SERIES: 'SERIES',
    AGE_RATING: 'AGE_RATING',
    REGION: 'REGION',
    SOURCE: 'SOURCE',
    COMPLETION_STATUS: 'COMPLETION_STATUS',
    FILTER_PRESET: 'FILTER_PRESET',
    GAME: 'GAME',
    GAME_DIFF: 'GAME_DIFF',
    LIBRARY_PLUGIN: 'LIBRARY_PLUGIN',
    LIBRARY_PLUGIN_DIFF: 'LIBRARY_PLUGIN_DIFF'
} as const;

export type ObjectType =
    typeof ObjectType[keyof typeof ObjectType];

export interface ConnectionMessage {
    messageType: MessageType;
}

export interface InitializationMessage extends ConnectionMessage {
    sessionId: string;
    serverVersion: string | undefined;
}

export interface ChangeMessage extends ConnectionMessage {
    id?: number;
    type: ObjectType;
    clientId?: string;
    objectId: number;
    isForceFetch: boolean;
}