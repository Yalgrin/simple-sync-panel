import {useState} from "react";
import {Box, CircularProgress, type SxProps, type Theme} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface ImageWithSpinnerProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    sx?: SxProps<Theme>;
}

type ImageContentProps = ImageWithSpinnerProps

function ImageContent({src, alt, width, height, sx}: Readonly<ImageContentProps>) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <Box
            sx={[
                {
                    position: "relative",
                    width: width,
                    height: height,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {loading && !error && src && (
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress/>
                </Box>
            )}
            {(!src || error) && (
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CloseIcon sx={{fontSize: 48}}/>
                </Box>
            )}

            <img
                src={src}
                alt={alt}
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
        </Box>
    );
}

export default function ImageWithSpinner(props: Readonly<ImageWithSpinnerProps>) {
    return <ImageContent key={props.src} {...props} />;
}