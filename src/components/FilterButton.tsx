import {IconButton, Tooltip} from "@mui/material";
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import {useGameListStore} from "../store/useGameListStore.ts";
import {useTranslation} from "react-i18next";

export function FilterButton() {
    const filterSectionEnabled = useGameListStore((state) => state.filterSectionEnabled);
    const {setFilterSectionEnabled} = useGameListStore((state) => state.actions);
    const {t} = useTranslation();

    return (
        <Tooltip title={t("layout.topBar.showFilter")}>
            <IconButton color="inherit" onClick={() => setFilterSectionEnabled(!filterSectionEnabled)}>
                <ViewSidebarOutlinedIcon/>
            </IconButton>
        </Tooltip>
    )
}