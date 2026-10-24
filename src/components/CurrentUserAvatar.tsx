import {useCurrentUser} from "../hooks/auth.ts";
import {Avatar, type AvatarProps} from "@mui/material";

export function CurrentUserAvatar({sx, ...props}: AvatarProps) {
    const {data: currentUser} = useCurrentUser();
    const avatarLetter = currentUser?.username?.charAt(0)?.toUpperCase() ?? "?";

    const sxArr = sx ? [sx] : [];
    return (<Avatar
        {...props}
        sx={[{width: 32, height: 32}, ...(Array.isArray(sx) ? sx : sxArr)]}
    >
        {avatarLetter}
    </Avatar>);
}