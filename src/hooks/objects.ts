import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    AGE_RATING_QUERY_KEY,
    CATEGORY_QUERY_KEY,
    COMPANY_QUERY_KEY,
    COMPLETION_STATUS_QUERY_KEY,
    FEATURE_QUERY_KEY,
    FILTER_PRESET_QUERY_KEY,
    GAME_DETAILS_QUERY_KEY,
    GAME_LIST_QUERY_KEY,
    GENRE_QUERY_KEY,
    LIBRARY_PLUGIN_QUERY_KEY,
    PLATFORM_QUERY_KEY,
    REGION_QUERY_KEY,
    RELEASE_YEAR_QUERY_KEY,
    SERIES_QUERY_KEY,
    SOURCE_QUERY_KEY,
    TAG_QUERY_KEY
} from "../models/objects.ts";
import {
    fetchAgeRatings,
    fetchCategories,
    fetchCompanies,
    fetchCompletionStatuses,
    fetchFeatures,
    fetchFilterPresets,
    fetchGameDetails,
    fetchGameReleaseYears,
    fetchGames,
    fetchGenres,
    fetchLibraryPlugins,
    fetchPlatforms,
    fetchRegions,
    fetchSeries,
    fetchSources,
    fetchTags
} from "../functions/objects.ts";
import type {GameListFilterDTO} from "../models/gameList.ts";

export function useQueryAgeRatings() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: AGE_RATING_QUERY_KEY,
        queryFn: () => fetchAgeRatings(queryClient)
    })
}

export function useQueryCategories() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: CATEGORY_QUERY_KEY,
        queryFn: () => fetchCategories(queryClient)
    })
}

export function useQueryCompanies() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: COMPANY_QUERY_KEY,
        queryFn: () => fetchCompanies(queryClient)
    })
}

export function useQueryCompletionStatuses() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: COMPLETION_STATUS_QUERY_KEY,
        queryFn: () => fetchCompletionStatuses(queryClient)
    })
}

export function useQueryFeatures() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: FEATURE_QUERY_KEY,
        queryFn: () => fetchFeatures(queryClient)
    })
}

export function useOueryFilterPresets() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: FILTER_PRESET_QUERY_KEY,
        queryFn: () => fetchFilterPresets(queryClient)
    })
}

export function useQueryGenres() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: GENRE_QUERY_KEY,
        queryFn: () => fetchGenres(queryClient)
    })
}

export function useQueryLibraryPlugins() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: LIBRARY_PLUGIN_QUERY_KEY,
        queryFn: () => fetchLibraryPlugins(queryClient)
    })
}

export function useQueryPlatforms() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: PLATFORM_QUERY_KEY,
        queryFn: () => fetchPlatforms(queryClient)
    })
}

export function useQueryRegions() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: REGION_QUERY_KEY,
        queryFn: () => fetchRegions(queryClient)
    })
}

export function useQuerySeries() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: SERIES_QUERY_KEY,
        queryFn: () => fetchSeries(queryClient)
    })
}

export function useQuerySources() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: SOURCE_QUERY_KEY,
        queryFn: () => fetchSources(queryClient)
    })
}

export function useQueryTags() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: TAG_QUERY_KEY,
        queryFn: () => fetchTags(queryClient)
    })
}

export function useQueryReleaseYear() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: RELEASE_YEAR_QUERY_KEY,
        queryFn: () => fetchGameReleaseYears(queryClient)
    })
}

export function useQueryGames(filter: GameListFilterDTO) {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: [...GAME_LIST_QUERY_KEY, filter],
        queryFn: () => fetchGames(queryClient, filter),
        placeholderData: keepPreviousData
    })
}

export function useQueryGameDetails(id: number | undefined | null) {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: [...GAME_DETAILS_QUERY_KEY, id],
        enabled: !!id,
        queryFn: () => fetchGameDetails(queryClient, id as number)
    })
}