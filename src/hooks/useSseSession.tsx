import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {useSessionState} from "../store/useSessionState.ts";
import {
    type ChangeMessage,
    type ConnectionMessage,
    type InitializationMessage,
    MessageType,
    ObjectType,
    type SessionState
} from "../models/session.ts";
import {useCurrentUser} from "./auth.ts";
import {
    AGE_RATING_QUERY_KEY,
    CATEGORY_QUERY_KEY,
    COMPANY_QUERY_KEY,
    COMPLETION_STATUS_QUERY_KEY,
    FEATURE_QUERY_KEY,
    FILTER_PRESET_QUERY_KEY,
    GAME_GLOBAL_QUERY_KEY,
    GENRE_QUERY_KEY,
    LIBRARY_PLUGIN_QUERY_KEY,
    PLATFORM_QUERY_KEY,
    REGION_QUERY_KEY,
    SERIES_QUERY_KEY,
    SOURCE_QUERY_KEY,
    TAG_QUERY_KEY
} from "../models/objects.ts";

function getQueryKeyToClear(type: ObjectType): readonly string[] {
    if (type == ObjectType.GAME || type == ObjectType.GAME_DIFF) {
        return GAME_GLOBAL_QUERY_KEY;
    } else if (type == ObjectType.LIBRARY_PLUGIN || type == ObjectType.LIBRARY_PLUGIN_DIFF) {
        return LIBRARY_PLUGIN_QUERY_KEY;
    } else if (type == ObjectType.PLATFORM || type == ObjectType.PLATFORM_DIFF) {
        return PLATFORM_QUERY_KEY;
    } else if (type == ObjectType.CATEGORY) {
        return CATEGORY_QUERY_KEY;
    } else if (type == ObjectType.GENRE) {
        return GENRE_QUERY_KEY;
    } else if (type == ObjectType.COMPANY) {
        return COMPANY_QUERY_KEY;
    } else if (type == ObjectType.FEATURE) {
        return FEATURE_QUERY_KEY;
    } else if (type == ObjectType.TAG) {
        return TAG_QUERY_KEY;
    } else if (type == ObjectType.SERIES) {
        return SERIES_QUERY_KEY;
    } else if (type == ObjectType.AGE_RATING) {
        return AGE_RATING_QUERY_KEY;
    } else if (type == ObjectType.REGION) {
        return REGION_QUERY_KEY;
    } else if (type == ObjectType.SOURCE) {
        return SOURCE_QUERY_KEY;
    } else if (type == ObjectType.COMPLETION_STATUS) {
        return COMPLETION_STATUS_QUERY_KEY;
    } else if (type == ObjectType.FILTER_PRESET) {
        return FILTER_PRESET_QUERY_KEY;
    }
    return [];
}

export function useSseSession(): SessionState {
    const queryClient = useQueryClient();
    const {data: currentUser, isLoading: isLoadingUser} = useCurrentUser();

    const sessionState = useSessionState();
    const actions = useSessionState((state) => state.actions);

    useEffect(() => {
        if (isLoadingUser || !currentUser) {
            actions.reset();
            return () => {
                actions.reset();
            };
        }

        actions.markAsConnecting();
        const eventSource = new EventSource('/api/panel/change/connect');

        eventSource.onopen = () => {
            actions.markAsConnected();
        }

        eventSource.onerror = () => {
            actions.markAsConnectionError();
        };

        eventSource.onmessage = async (event) => {
            const changes: ConnectionMessage[] = JSON.parse(event.data);

            const changedTypeKeys: (readonly string[])[] = [];
            for (const change of changes) {
                if (change.messageType == MessageType.INITIALIZATION) {
                    const initMessage = change as InitializationMessage;
                    actions.setSessionId(initMessage.sessionId);
                } else if (change.messageType == MessageType.CHANGE) {
                    const changeMessage = change as ChangeMessage;

                    const key = getQueryKeyToClear(changeMessage.type);
                    if (!key || key.length === 0) {
                        continue;
                    }

                    if (!changedTypeKeys.includes(key)) {
                        changedTypeKeys.push(key);
                    }
                }
            }

            if (changedTypeKeys && changedTypeKeys.length > 0) {
                for (const key of changedTypeKeys) {
                    await queryClient.invalidateQueries(
                        {
                            queryKey: key,
                            refetchType: 'active'
                        },
                        {
                            cancelRefetch: true,
                            throwOnError: true
                        }
                    );
                }
            }
        };

        return () => {
            eventSource.close();
            actions.reset();
        };
    }, [queryClient, actions, isLoadingUser, currentUser]);

    return sessionState;
}