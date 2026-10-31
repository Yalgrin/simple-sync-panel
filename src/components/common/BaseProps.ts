import type {SxProps, Theme} from "@mui/material";
import type {ReactNode} from "react";

export interface BaseProps {
    sx?: SxProps<Theme>;
    children?: ReactNode;
}