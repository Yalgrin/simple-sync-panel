import {useFilterStore} from "../../../store/useFilterStore.ts";
import {TextField} from "@mui/material";
import {BaseFilterControl} from "./BaseFilterControl.tsx";

export function VersionTextControl() {
    const name = useFilterStore((state) => state.version);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl name="Version">
            <TextField
                fullWidth
                size="small"
                value={name ?? ''}
                onChange={(event) => filterActions.setVersion(event.target.value)}
            />
        </BaseFilterControl>
    );
}