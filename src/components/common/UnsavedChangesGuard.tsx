import {useEffect} from "react";
import {useBlocker} from "react-router";
import {UnsavedChangedDialog} from "../dialogs/UnsavedChangedDialog.tsx";

export function UnsavedChangesGuard({preventChange}: Readonly<{ preventChange: boolean }>) {
    const blocker = useBlocker(({currentLocation, nextLocation}) =>
        preventChange && currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        if (!preventChange) return;

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            // noinspection JSDeprecatedSymbols
            event.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [preventChange]);

    return (
        <UnsavedChangedDialog blocker={blocker}/>
    );
}