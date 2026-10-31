import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import {useCallback} from "react";
import {useFilterStore} from "../../store/useFilterStore.ts";
import {IsInstalledControl} from "./form-controls/IsInstalledControl.tsx";
import {UseAndFilteringStyleControl} from "./form-controls/UseAndFilteringStyleControl.tsx";
import {IsUninstalledControl} from "./form-controls/IsUninstalledControl.tsx";
import {IsHiddenControl} from "./form-controls/IsHiddenControl.tsx";
import {IsFavoriteControl} from "./form-controls/IsFavoriteControl.tsx";
import {PlatformControl} from "./form-controls/PlatformControl.tsx";
import {LibraryPluginControl} from "./form-controls/LibraryPluginControl.tsx";
import {NameTextControl} from "./form-controls/NameTextControl.tsx";
import {GenreControl} from "./form-controls/GenreControl.tsx";
import {ReleaseYearControl} from "./form-controls/ReleaseYearControl.tsx";
import {DeveloperControl} from "./form-controls/DeveloperControl.tsx";
import {PublisherControl} from "./form-controls/PublisherControl.tsx";
import {CategoryControl} from "./form-controls/CategoryControl.tsx";
import {InstallSizeControl} from "./form-controls/InstallSizeControl.tsx";
import {TagControl} from "./form-controls/TagControl.tsx";
import {FeatureControl} from "./form-controls/FeatureControl.tsx";
import {TimePlayedControl} from "./form-controls/TimePlayedControl.tsx";
import {CompletionStatusControl} from "./form-controls/CompletionStatusControl.tsx";
import {SeriesControl} from "./form-controls/SeriesControl.tsx";
import {RegionControl} from "./form-controls/RegionControl.tsx";
import {SourceControl} from "./form-controls/SourceControl.tsx";
import {AgeRatingControl} from "./form-controls/AgeRatingControl.tsx";
import {VersionTextControl} from "./form-controls/VersionTextControl.tsx";
import {UserScoreControl} from "./form-controls/UserScoreControl.tsx";
import {CommunityScoreControl} from "./form-controls/CommunityScoreControl.tsx";
import {CriticScoreControl} from "./form-controls/CriticScoreControl.tsx";
import {LastPlayedControl} from "./form-controls/LastPlayedControl.tsx";
import {RecentActivityControl} from "./form-controls/RecentActivityControl.tsx";
import {AddedControl} from "./form-controls/AddedControl.tsx";
import {ModifiedControl} from "./form-controls/ModifiedControl.tsx";
import {GroupingFieldSelect} from "./inputs/GroupingFieldSelect.tsx";
import {FilterPresetSelect} from "./inputs/FilterPresetSelect.tsx";
import {SortOrderSelect} from "./inputs/SortOrderSelect.tsx";
import {SortOrderDirectionSelect} from "./inputs/SortOrderDirectionSelect.tsx";

export function FiltersPane() {
    const filterActions = useFilterStore((state) => state.actions);

    const clearFilters = useCallback(() => {
        filterActions.clear();
    }, [filterActions]);

    return (
        <Box
            sx={{
                height: '100%',
                boxSizing: 'border-box',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                p: 1.5,
            }}
        >
            <Stack
                direction="row"
                sx={{
                    mb: 1.5,
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Typography variant="h6" sx={{fontWeight: 700}}>
                    Filters
                </Typography>

                <Button
                    size="small"
                    startIcon={<ClearAllIcon/>}
                    sx={{color: 'grey.300'}}
                    onClick={clearFilters}
                >
                    Clear
                </Button>
            </Stack>

            <Divider/>

            <FilterPresetSelect/>

            <Divider/>

            <SortOrderSelect/>
            <SortOrderDirectionSelect/>
            <GroupingFieldSelect/>

            <Divider sx={{my: "8px"}}/>

            <IsInstalledControl/>
            <IsUninstalledControl/>
            <IsHiddenControl/>
            <IsFavoriteControl/>
            <UseAndFilteringStyleControl/>

            <Divider sx={{my: "8px"}}/>

            <PlatformControl/>
            <LibraryPluginControl/>
            <NameTextControl/>
            <GenreControl/>
            <ReleaseYearControl/>
            <DeveloperControl/>
            <PublisherControl/>
            <CategoryControl/>
            <TagControl/>
            <FeatureControl/>
            <TimePlayedControl/>
            <InstallSizeControl/>
            <CompletionStatusControl/>
            <SeriesControl/>
            <RegionControl/>
            <SourceControl/>
            <AgeRatingControl/>
            <VersionTextControl/>
            <UserScoreControl/>
            <CommunityScoreControl/>
            <CriticScoreControl/>
            <LastPlayedControl/>
            <RecentActivityControl/>
            <AddedControl/>
            <ModifiedControl/>

        </Box>
    );
}