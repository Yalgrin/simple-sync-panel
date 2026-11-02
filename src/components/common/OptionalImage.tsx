import {type ReactNode, useState} from "react";
import {Box, CircularProgress, type SxProps, type Theme} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {mergeStyles} from "../../functions/util.ts";

export interface OptionalImageProps {
    src?: string | null;
    defaultSrc?: string | null;
    alt?: string | null;
    title?: string | null;
    width?: number;
    height?: number;
    closeIconSize?: number;
    sx?: SxProps<Theme>;
}

export function OptionalImage({
                                  src,
                                  defaultSrc,
                                  alt,
                                  title,
                                  width,
                                  height,
                                  closeIconSize,
                                  sx
                              }: Readonly<OptionalImageProps>) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fontSize = closeIconSize || (width && height ? Math.min(width, height) : 32);
    const actualSrc = src || defaultSrc;

    const errorNode = (
        <Box
            sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CloseIcon sx={{fontSize: fontSize}}/>
        </Box>
    );

    let node: ReactNode;
    if (!actualSrc) {
        node = errorNode;
    } else if (loading && !error) {
        node = (<Box
            sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CircularProgress/>
        </Box>);
    } else if (error) {
        node = errorNode;
    }
    if (actualSrc) {
        node = (<>
            {node}
            <img
                src={actualSrc}
                alt={alt || ""}
                title={title || ""}
                onLoad={() => {
                    setLoading(false)
                    setError(false)
                }}
                onError={() => {
                    setLoading(false);
                    setError(true);
                }}
                loading="lazy"
                style={{
                    opacity: loading || error ? 0 : 1,
                    width: width || "100%",
                    height: height || "100%",
                    objectFit: "cover",
                    transition: "opacity 0.1s ease",
                }}
            />
        </>)
    }

    return (
        <Box
            sx={mergeStyles(
                {
                    position: "relative",
                    width: width,
                    height: height,
                },
                sx,
            )}
        >
            {node}
        </Box>
    );
}