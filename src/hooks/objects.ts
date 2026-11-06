import {keepPreviousData, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    AGE_RATING_QUERY_KEY,
    CATEGORY_QUERY_KEY,
    COMPANY_QUERY_KEY,
    COMPLETION_STATUS_QUERY_KEY,
    FEATURE_QUERY_KEY,
    FILTER_PRESET_QUERY_KEY,
    GAME_DETAILS_QUERY_KEY,
    GAME_GLOBAL_QUERY_KEY,
    GAME_LIST_QUERY_KEY,
    GENRE_QUERY_KEY,
    LIBRARY_PLUGIN_QUERY_KEY,
    type PanelAgeRatingDTO,
    type PanelCategoryDTO,
    type PanelCompanyDTO,
    type PanelCompletionStatusDTO,
    type PanelFeatureDTO,
    type PanelFilterPresetDTO,
    type PanelGameDTO,
    type PanelGameToSaveDTO,
    type PanelGenreDTO,
    type PanelLibraryPluginDTO,
    type PanelLibraryPluginToSaveDTO,
    type PanelPlatformDTO,
    type PanelPlatformToSaveDTO,
    type PanelRegionDTO,
    type PanelSeriesDTO,
    type PanelSourceDTO,
    type PanelTagDTO,
    PLATFORM_QUERY_KEY,
    PLATFORM_SPECIFICATION_QUERY_KEY,
    REGION_QUERY_KEY,
    REGION_SPECIFICATION_QUERY_KEY,
    RELEASE_YEAR_QUERY_KEY,
    SERIES_QUERY_KEY,
    SOURCE_QUERY_KEY,
    TAG_QUERY_KEY
} from "../models/objects.ts";
import {
    deleteAgeRating,
    deleteCategory,
    deleteCompany,
    deleteCompletionStatus,
    deleteFeature,
    deleteFilterPreset,
    deleteGame,
    deleteGenre,
    deleteLibraryPlugin,
    deletePlatform,
    deleteRegion,
    deleteSeries,
    deleteSource,
    deleteTag,
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
    fetchPlatformSpecifications,
    fetchRegions,
    fetchRegionSpecifications,
    fetchSeries,
    fetchSources,
    fetchTags,
    markGameAsFavorite,
    saveAgeRating,
    saveCategory,
    saveCompany,
    saveCompletionStatus,
    saveFeature,
    saveFilterPreset,
    saveGame,
    saveGenre,
    saveLibraryPlugin,
    savePlatform,
    saveRegion,
    saveSeries,
    saveSource,
    saveTag
} from "../functions/objects.ts";
import type {GameListFilterDTO} from "../models/gameList.ts";
import {useTranslation} from "react-i18next";

export function useQueryAgeRatings() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: AGE_RATING_QUERY_KEY,
        queryFn: () => fetchAgeRatings(queryClient)
    })
}

export function useSaveAgeRating() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelAgeRatingDTO) => saveAgeRating(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: AGE_RATING_QUERY_KEY});
        },
    })
}

export function useDeleteAgeRating() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelAgeRatingDTO) => deleteAgeRating(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: AGE_RATING_QUERY_KEY});
        },
    })
}

export function useQueryCategories() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: CATEGORY_QUERY_KEY,
        queryFn: () => fetchCategories(queryClient)
    })
}

export function useSaveCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelCategoryDTO) => saveCategory(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: CATEGORY_QUERY_KEY});
        },
    })
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelCategoryDTO) => deleteCategory(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: CATEGORY_QUERY_KEY});
        },
    })
}

export function useQueryCompanies() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: COMPANY_QUERY_KEY,
        queryFn: () => fetchCompanies(queryClient)
    })
}

export function useSaveCompany() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelCompanyDTO) => saveCompany(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: COMPANY_QUERY_KEY});
        },
    })
}

export function useDeleteCompany() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelCompanyDTO) => deleteCompany(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: COMPANY_QUERY_KEY});
        },
    })
}

export function useQueryCompletionStatuses() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: COMPLETION_STATUS_QUERY_KEY,
        queryFn: () => fetchCompletionStatuses(queryClient)
    })
}

export function useSaveCompletionStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelCompletionStatusDTO) => saveCompletionStatus(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: COMPLETION_STATUS_QUERY_KEY});
        },
    })
}

export function useDeleteCompletionStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelCompletionStatusDTO) => deleteCompletionStatus(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: COMPLETION_STATUS_QUERY_KEY});
        },
    })
}

export function useQueryFeatures() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: FEATURE_QUERY_KEY,
        queryFn: () => fetchFeatures(queryClient)
    })
}

export function useSaveFeature() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelFeatureDTO) => saveFeature(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: FEATURE_QUERY_KEY});
        },
    })
}

export function useDeleteFeature() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelFeatureDTO) => deleteFeature(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: FEATURE_QUERY_KEY});
        },
    })
}

export function useOueryFilterPresets() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: FILTER_PRESET_QUERY_KEY,
        queryFn: () => fetchFilterPresets(queryClient)
    })
}

export function useSaveFilterPreset() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelFilterPresetDTO) => saveFilterPreset(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: FILTER_PRESET_QUERY_KEY});
        },
    })
}

export function useDeleteFilterPreset() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelFilterPresetDTO) => deleteFilterPreset(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: FILTER_PRESET_QUERY_KEY});
        },
    })
}

export function useQueryGenres() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: GENRE_QUERY_KEY,
        queryFn: () => fetchGenres(queryClient)
    })
}

export function useSaveGenre() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelGenreDTO) => saveGenre(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: GENRE_QUERY_KEY});
        },
    })
}

export function useDeleteGenre() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelGenreDTO) => deleteGenre(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: GENRE_QUERY_KEY});
        },
    })
}

export function useQueryLibraryPlugins() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: LIBRARY_PLUGIN_QUERY_KEY,
        queryFn: () => fetchLibraryPlugins(queryClient)
    })
}

export function useSaveLibraryPlugin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelLibraryPluginToSaveDTO) => saveLibraryPlugin(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: LIBRARY_PLUGIN_QUERY_KEY});
        },
    })
}

export function useDeleteLibraryPlugin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelLibraryPluginDTO) => deleteLibraryPlugin(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: LIBRARY_PLUGIN_QUERY_KEY});
        },
    })
}

export function useQueryPlatforms() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: PLATFORM_QUERY_KEY,
        queryFn: () => fetchPlatforms(queryClient)
    })
}

export function useQueryPlatformSpecifications() {
    const queryClient = useQueryClient();
    const {t, i18n} = useTranslation();
    return useQuery({
        queryKey: [...PLATFORM_SPECIFICATION_QUERY_KEY, i18n.language],
        queryFn: () => fetchPlatformSpecifications(queryClient),
        select: (data) => {
            const result = data.map((item) => {
                return {
                    id: item.id,
                    name: t(`enums.PlatformSpecification.${item.id}`, {defaultValue: item.name}),
                }
            });
            result.sort((a, b) => a.name.localeCompare(b.name));
            return result
        }
    })
}

export function useSavePlatform() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelPlatformToSaveDTO) => savePlatform(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: PLATFORM_QUERY_KEY});
        },
    })
}

export function useDeletePlatform() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelPlatformDTO) => deletePlatform(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: PLATFORM_QUERY_KEY});
        },
    })
}

export function useQueryRegions() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: REGION_QUERY_KEY,
        queryFn: () => fetchRegions(queryClient)
    })
}

export function useQueryRegionSpecifications() {
    const queryClient = useQueryClient();
    const {t, i18n} = useTranslation();
    return useQuery({
        queryKey: [...REGION_SPECIFICATION_QUERY_KEY, i18n.language],
        queryFn: () => fetchRegionSpecifications(queryClient),
        select: (data) => {
            const result = data.map((item) => {
                return {
                    id: item.id,
                    name: t(`enums.RegionSpecification.${item.id}`, {defaultValue: item.name}),
                }
            });
            result.sort((a, b) => a.name.localeCompare(b.name));
            return result
        }
    })
}

export function useSaveRegion() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelRegionDTO) => saveRegion(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: REGION_QUERY_KEY});
        },
    })
}

export function useDeleteRegion() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelRegionDTO) => deleteRegion(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: REGION_QUERY_KEY});
        },
    })
}

export function useQuerySeries() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: SERIES_QUERY_KEY,
        queryFn: () => fetchSeries(queryClient)
    })
}

export function useSaveSeries() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelSeriesDTO) => saveSeries(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: SERIES_QUERY_KEY});
        },
    })
}

export function useDeleteSeries() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelSeriesDTO) => deleteSeries(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: SERIES_QUERY_KEY});
        },
    })
}

export function useQuerySources() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: SOURCE_QUERY_KEY,
        queryFn: () => fetchSources(queryClient)
    })
}

export function useSaveSource() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelSourceDTO) => saveSource(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: SOURCE_QUERY_KEY});
        },
    })
}

export function useDeleteSource() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelSourceDTO) => deleteSource(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: SOURCE_QUERY_KEY});
        },
    })
}

export function useQueryTags() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: TAG_QUERY_KEY,
        queryFn: () => fetchTags(queryClient)
    })
}

export function useSaveTag() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelTagDTO) => saveTag(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: TAG_QUERY_KEY});
        },
    })
}

export function useDeleteTag() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (dto: PanelTagDTO) => deleteTag(queryClient, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: TAG_QUERY_KEY});
        },
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

export function useSaveGame() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (game: PanelGameToSaveDTO) => saveGame(queryClient, game),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: GAME_GLOBAL_QUERY_KEY});
        },
    })
}

export function useMarkGameAsFavorite(game: PanelGameDTO, favorite: boolean) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => markGameAsFavorite(queryClient, game, favorite),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: GAME_GLOBAL_QUERY_KEY});
        },
    })
}

export function useDeleteGame(game: PanelGameDTO) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteGame(queryClient, game),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: GAME_GLOBAL_QUERY_KEY});
        },
    })
}