export const AUTH_GROUP_QUERY_KEY = ["auth"] as const;
export const CSRF_QUERY_KEY = ["auth", "csrf"] as const;
export const CURRENT_USER_QUERY_KEY = ["auth", "currentUser"] as const;

export const SESSION_ID_HEADER = "X-Session-Id";

export type CsrfResponse = {
    headerName: string;
    token: string;
};

export type LoginRequest = {
    username: string;
    password: string;
    rememberMe: boolean;
}

export type UserResponse = {
    username: string;
}

export type ChangePasswordRequest = {
    oldPassword: string;
    newPassword: string;
}