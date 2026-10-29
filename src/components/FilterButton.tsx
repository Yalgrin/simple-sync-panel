import {IconButton} from "@mui/material";
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import {useGameListStore} from "../store/useGameListStore.ts";

export function FilterButton() {
    const filterSectionEnabled = useGameListStore((state) => state.filterSectionEnabled);
    const {setFilterSectionEnabled} = useGameListStore((state) => state.actions);

    return (
        <IconButton color="inherit" onClick={() => setFilterSectionEnabled(!filterSectionEnabled)}>
            <ViewSidebarOutlinedIcon/>
        </IconButton>
    )
}