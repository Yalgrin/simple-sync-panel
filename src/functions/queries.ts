import type {QueryClient} from "@tanstack/react-query";
import {AUTH_GROUP_QUERY_KEY, CSRF_QUERY_KEY, type CsrfResponse, SESSION_ID_HEADER} from "../models/auth.ts";
import {AuthError, CsrfError} from "../exceptions/auth.ts";
import {fetchCsrf} from "./auth.ts";
import {useSessionState} from "../store/useSessionState.ts";

function queryCsrf(queryClient: QueryClient) {
    return queryClient.query({
        queryKey: CSRF_QUERY_KEY,
        queryFn: () => fetchCsrf(queryClient),
        staleTime: Infinity
    });
}

async function doPerformRequest(
    queryClient: QueryClient,
    input: RequestInfo | URL,
    init?: RequestInit,
    csrfRetry: boolean = true,
) {
    try {
        return await doFetch(queryClient, input, init, true);
    } catch (error) {
        if (error instanceof AuthError) {
            await queryClient.invalidateQueries({queryKey: AUTH_GROUP_QUERY_KEY});
            throw error;
        }
        if (error instanceof CsrfError) {
            if (csrfRetry) {
                await queryClient.invalidateQueries({queryKey: CSRF_QUERY_KEY});
                return doPerformRequest(queryClient, input, init, false);
            } else {
                await queryClient.invalidateQueries({queryKey: AUTH_GROUP_QUERY_KEY});
            }
        }
        throw error;
    }
}

export async function doFetch(
    queryClient: QueryClient,
    input: RequestInfo | URL,
    init?: RequestInit,
    includeCsrf: boolean = true
) {
    let csrfResponse: CsrfResponse | undefined;
    if (includeCsrf) {
        csrfResponse = await queryCsrf(queryClient);
    } else {
        csrfResponse = undefined;
    }

    const modifiedInit: RequestInit = init ? {...init} : {};
    modifiedInit.credentials = "include";
    const headers = new Headers(modifiedInit.headers);
    if (csrfResponse?.headerName && csrfResponse?.token) {
        headers.set(csrfResponse?.headerName, csrfResponse?.token);
    }
    const sessionId = useSessionState.getState().sessionId;
    if (sessionId) {
        headers.set(SESSION_ID_HEADER, sessionId);
    }
    modifiedInit.headers = headers;

    const response = await fetch(input, modifiedInit);
    if (response.status === 401) {
        throw new AuthError("Auth error occurred!");
    }
    if (response.status === 403) {
        throw new CsrfError("CSRF token invalid!");
    }
    if (!response.ok) {
        throw new Error("Unexpected error occurred!");
    }
    return response;
}

export async function performRequest(
    queryClient: QueryClient,
    input: RequestInfo | URL,
    init?: RequestInit,
) {
    return doPerformRequest(queryClient, input, init, true);
}

export async function performGetRequest(
    queryClient: QueryClient,
    input: RequestInfo | URL,
    init?: RequestInit,
) {
    const modifiedInit: RequestInit = init ? {...init} : {};
    modifiedInit.method = "GET";
    return doPerformRequest(queryClient, input, modifiedInit, true);
}

export async function performPostRequest(
    queryClient: QueryClient,
    input: RequestInfo | URL,
    init?: RequestInit,
) {
    const modifiedInit: RequestInit = init ? {...init} : {};
    modifiedInit.method = "POST";
    return doPerformRequest(queryClient, input, modifiedInit, true);
}

export async function performPostJsonRequest(
    queryClient: QueryClient,
    input: RequestInfo | URL,
    init?: RequestInit,
) {
    const modifiedInit: RequestInit = init ? {...init} : {};
    modifiedInit.method = "POST";
    const headers = new Headers(modifiedInit.headers);
    headers.set("Content-Type", "application/json");
    modifiedInit.headers = headers;
    return doPerformRequest(queryClient, input, modifiedInit, true);
}
