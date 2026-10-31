import {useFilterStore} from "../../../store/useFilterStore.ts";
import {BaseFilterControl} from "./BaseFilterControl.tsx";
import {TextField} from "@mui/material";

export function NameTextControl() {
    const name = useFilterStore((state) => state.name);
    const filterActions = useFilterStore((state) => state.actions);

    return (
        <BaseFilterControl name="Name">
            <TextField
                fullWidth
                size="small"
                value={name ?? ''}
                onChange={(event) => filterActions.setName(event.target.value)}
            />
        </BaseFilterControl>
    );
}