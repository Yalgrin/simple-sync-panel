import {OptionalImage, type OptionalImageProps} from "./OptionalImage.tsx";

export function IconImage({src, alt, title, width, height, closeIconSize, sx}: Readonly<OptionalImageProps>) {
    return (
        <OptionalImage
            src={src}
            defaultSrc="/applogo_dark.png"
            alt={alt}
            title={title}
            width={width}
            height={height}
            closeIconSize={closeIconSize}
            sx={sx}
        />
    )
}