import {type ChangeEvent, type ReactNode, useEffect, useState} from "react";
import {Box, Button, Divider, Paper, Stack, Typography} from "@mui/material";
import type {BaseProps} from "../../common/BaseProps.ts";
import {mergeStyles} from "../../../functions/util.ts";

export interface MediaFieldProps extends BaseProps {
    name: string;
    wideInput?: boolean;
    initialUrl: string | undefined;
    isSaving: boolean;
    setIsSaving: (value: boolean) => void;
    file: File | null;
    setFile: (value: File | null) => void;
    minImageWidth?: string;
    minImageHeight?: string;
    maxImageWidth?: string;
    maxImageHeight?: string;
}

export function MediaControl({
                                 name,
                                 wideInput = false,
                                 initialUrl,
                                 isSaving,
                                 setIsSaving,
                                 file,
                                 setFile,
                                 minImageWidth = "128px",
                                 minImageHeight = "128px",
                                 maxImageWidth = "100%",
                                 maxImageHeight = "100%",
                                 sx
                             }: Readonly<MediaFieldProps>) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [file, setPreviewUrl]);

    const handleImageChange = function (event: ChangeEvent<HTMLInputElement>) {
        const selectedFile = event.currentTarget.files?.[0];
        if (selectedFile?.type.startsWith("image/")) {
            setFile(selectedFile);
            setIsSaving(true);
        }
        event.currentTarget.value = "";
    }

    const handleClear = function () {
        setFile(null);
        setIsSaving(true);
    }

    const handleReset = function () {
        setFile(null);
        setIsSaving(false);
    }

    let previewElement: ReactNode
    if (isSaving) {
        if (previewUrl) {
            previewElement = (
                <Box component="img" src={previewUrl} alt="Preview"
                     sx={{
                         display: "block",
                         maxWidth: maxImageWidth,
                         maxHeight: maxImageHeight,
                         minWidth: minImageWidth,
                         minHeight: minImageHeight,
                         objectFit: "contain"
                     }}/>
            )
        } else if (initialUrl) {
            previewElement = (<Typography>Existing image will be removed</Typography>)
        } else {
            previewElement = (<Typography>No image</Typography>)
        }
    } else if (initialUrl) {
        previewElement = (
            <Box component="img" src={initialUrl} alt="Preview"
                 sx={{
                     display: "block",
                     maxWidth: maxImageWidth,
                     maxHeight: maxImageHeight,
                     minWidth: minImageWidth,
                     minHeight: minImageHeight,
                     objectFit: "contain"
                 }}/>
        )
    } else {
        previewElement = (<Typography>No image</Typography>)
    }


    return (
        <Stack direction="column"
               sx={mergeStyles(
                   {
                       gridColumn: wideInput ? "1 / -1" : undefined,
                       gap: "6px",
                       minWidth: 0,
                       minHeight: 0,
                       border: "1px solid rgba(255, 255, 255, 0.08)",
                   },
                   sx
               )}
        >
            <Paper>
                <Typography variant="h6" sx={{
                    padding: "8px",
                }}>{name}</Typography>
            </Paper>
            <Stack direction="row" sx={{
                padding: "8px",
                gap: "8px",
            }}>
                <Button variant="contained" component="label">
                    Add{' '}
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>
                <Button variant="contained" onClick={handleClear}>Clear</Button>
                <Button variant="contained" onClick={handleReset}>Reset</Button>
            </Stack>
            <Divider/>
            <Box sx={{
                flex: 1,
                minHeight: 0,
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}>
                {previewElement}
            </Box>
        </Stack>
    )
}