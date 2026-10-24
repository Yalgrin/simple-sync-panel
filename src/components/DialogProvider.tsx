import {type ReactNode, useCallback, useMemo, useState,} from "react";
import {Dialog, DialogTitle} from "@mui/material";
import type {DialogOptions} from "../models/dialogs.ts";
import {DialogContext} from "../context/DialogContext.ts";

export function DialogProvider({children}: Readonly<{ children: ReactNode }>) {
    const [dialog, setDialog] = useState<DialogOptions | null>(null);

    const closeDialog = useCallback(() => setDialog(null), []);
    const openDialog = useCallback(
        (options: DialogOptions) => setDialog(options),
        [],
    );

    const contextValue = useMemo(
        () => ({openDialog, closeDialog}),
        [openDialog, closeDialog],
    );

    const DialogBody = dialog?.render;

    return (
        <DialogContext.Provider value={contextValue}>
            {children}
            <Dialog open={dialog !== null} onClose={closeDialog}>
                {dialog && (
                    <>
                        <DialogTitle>{dialog.title}</DialogTitle>
                        {DialogBody && <DialogBody close={closeDialog}/>}
                    </>
                )}
            </Dialog>
        </DialogContext.Provider>
    );
}