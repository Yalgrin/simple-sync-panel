import {doFetch, performPostJsonRequest, performPostRequest} from "./queries.ts";
import type {QueryClient} from "@tanstack/react-query";
import {type ChangePasswordRequest, type CsrfResponse, type LoginRequest, type UserResponse} from "../models/auth.ts";
import {AuthError} from "../exceptions/auth.ts";

export async function fetchCsrf(queryClient: QueryClient): Promise<CsrfResponse> {
    return (await doFetch(queryClient, "/api/panel/auth/csrf", undefined, false)).json();
}

export async function fetchCurrentUser(queryClient: QueryClient): Promise<UserResponse | null> {
    try {
        return (await doFetch(queryClient, "/api/panel/auth/me")).json();
    } catch (error) {
        if (error instanceof AuthError) {
            return null;
        }
        throw error;
    }
}

export async function login(queryClient: QueryClient, request: LoginRequest): Promise<UserResponse> {
    return (await performPostJsonRequest(queryClient, "/api/panel/auth/login", {
        body: JSON.stringify(request)
    })).json();
}

export async function changePassword(queryClient: QueryClient, request: ChangePasswordRequest): Promise<UserResponse> {
    return (await performPostJsonRequest(queryClient, "/api/panel/auth/change-password", {
        body: JSON.stringify(request)
    })).json();
}

export async function logout(queryClient: QueryClient): Promise<void> {
    (await performPostRequest(queryClient, "/api/panel/auth/logout"));
}