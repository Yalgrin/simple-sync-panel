import {IconButton} from "@mui/material";
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import {useFilterStore} from "../store/useFilterStore.ts";

export function FilterButton() {
    const filterSectionEnabled = useFilterStore((state) => state.filterSectionEnabled);
    const {setFilterSectionEnabled} = useFilterStore((state) => state.actions);

    return (
        <IconButton color="inherit" onClick={() => setFilterSectionEnabled(!filterSectionEnabled)}>
            <ViewSidebarOutlinedIcon/>
        </IconButton>
    )
}