import DOMPurify from "dompurify";
import IframeResizer from "@iframe-resizer/react";
import {useTheme} from "@mui/material";

interface ResizableFrameProps {
    html: string | undefined | null;
}

export default function ResizableFrame({html}: Readonly<ResizableFrameProps>) {
    const theme = useTheme();

    const sanitizedHtml = html && DOMPurify.sanitize(html)
    const fullHtml = `<html>
        <head>
        <style>
            :root { 
                color-scheme: dark; 
                color: ${theme.palette.text.primary};
            }
            body {
                font-family: ${theme.typography.body1.fontFamily};
                font-size: ${theme.typography.body1.fontSize};
                font-weight: ${theme.typography.body1.fontWeight};
                line-height: ${theme.typography.body1.lineHeight};
            }
        </style>
        <script async src="/js/iframe-resizer-child.js"></script>
        </head>
        <body>${sanitizedHtml ?? ""}</body>
        </html>`;
    return <IframeResizer
        license="GPLv3"
        srcDoc={fullHtml}
        sandbox="allow-scripts"
        scrolling={true}
        style={{width: '100%', border: 'none'}}
    />
}