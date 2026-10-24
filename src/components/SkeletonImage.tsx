import {Box, Skeleton} from "@mui/material";
import {useState} from "react";

type SkeletonImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
};

export default function SkeletonImage({src, alt, width, height}: Readonly<SkeletonImageProps>) {
    const [loaded, setLoaded] = useState(false);

    return (
        <Box sx={{width, height}}>
            {!loaded && (
                <Skeleton
                    variant="rounded"
                    width="100%"
                    height="100%"
                    sx={{inset: 0}}
                />
            )}
            <Box
                component="img"
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                sx={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    visibility: loaded ? 'visible' : 'hidden',
                }}
            />
        </Box>
    );
}