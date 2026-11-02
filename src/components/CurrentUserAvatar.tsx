import {useCurrentUser} from "../hooks/auth.ts";
import {Avatar, type AvatarProps} from "@mui/material";
import {mergeStyles} from "../functions/util.ts";

export function CurrentUserAvatar({sx, ...props}: AvatarProps) {
    const {data: currentUser} = useCurrentUser();
    const avatarLetter = currentUser?.username?.charAt(0)?.toUpperCase() ?? "?";

    return (<Avatar
        {...props}
        sx={mergeStyles({width: 32, height: 32}, sx)}
    >
        {avatarLetter}
    </Avatar>);
}