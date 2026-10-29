import {useMutation, type UseMutationOptions, useQuery, useQueryClient} from "@tanstack/react-query";
import {changePassword, fetchCurrentUser, login, logout} from "../functions/auth.ts";
import {
    AUTH_GROUP_QUERY_KEY,
    type ChangePasswordRequest,
    CURRENT_USER_QUERY_KEY,
    type LoginRequest,
    type UserResponse
} from "../models/auth.ts";
import {ALL_LIBRARY_OBJECTS_QUERY_KEY, GAME_GLOBAL_QUERY_KEY} from "../models/objects.ts";

export function useCurrentUser() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: CURRENT_USER_QUERY_KEY,
        queryFn: () => fetchCurrentUser(queryClient)
    })
}

export function useLogin(options?: UseMutationOptions<UserResponse, Error, LoginRequest, unknown>,) {
    const queryClient = useQueryClient();
    let changedOptions = options ?? {};
    changedOptions = {
        ...changedOptions,
        mutationFn: (data: LoginRequest) => login(queryClient, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: AUTH_GROUP_QUERY_KEY});
        },
        onError: (error) => {
            console.error('Login failed:', error)
        },
    }
    return useMutation(changedOptions)
}

export function useChangePassword(options?: UseMutationOptions<UserResponse, Error, ChangePasswordRequest, unknown>,) {
    const queryClient = useQueryClient();
    let changedOptions = options ?? {};
    changedOptions = {
        ...changedOptions,
        mutationFn: (data: ChangePasswordRequest) => changePassword(queryClient, data)
    }
    return useMutation(changedOptions)
}

export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => logout(queryClient),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: AUTH_GROUP_QUERY_KEY});
            await queryClient.invalidateQueries({queryKey: ALL_LIBRARY_OBJECTS_QUERY_KEY});
            await queryClient.invalidateQueries({queryKey: GAME_GLOBAL_QUERY_KEY});
        },
    })
}