import {Box, Collapse} from "@mui/material";
import {GameListPane} from "../components/games/GameListPane.tsx";
import {Outlet} from "react-router";
import {FiltersPane} from "../components/filters/FiltersPane.tsx";
import {useFilterStore} from "../store/useFilterStore.ts";

const GAME_LIST_WIDTH = 320;
const FILTERS_WIDTH = 320;

function FilterPart() {
    const sectionEnabled = useFilterStore((state) => state.filterSectionEnabled);

    return (<Collapse orientation="horizontal" in={sectionEnabled} sx={{height: "100%"}}>
        <Box
            sx={{
                width: FILTERS_WIDTH,
                minWidth: FILTERS_WIDTH,
                borderLeft: '1px solid',
                height: "100%",
                overflowY: 'auto',
                // borderColor: 'rgba(255,255,255,0.08)',
                // bgcolor: '#11151b',
            }}
        >
            <FiltersPane/>
        </Box>
    </Collapse>)
}

export function GamesPage() {
    return (
        <>
            <Box
                sx={{
                    width: GAME_LIST_WIDTH,
                    minWidth: GAME_LIST_WIDTH,
                    borderRight: '1px solid',
                    height: "100%",
                    minHeight: 0,
                    overflow: 'hidden',
                    // borderColor: 'rgba(255,255,255,0.08)',
                    // bgcolor: '#11151b',
                }}
            >
                <GameListPane/>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    minWidth: 0,
                    height: "100%",
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}
            >
                <Outlet/>
            </Box>
            <FilterPart/>
        </>
    );
}