import type {QueryClient} from "@tanstack/react-query";
import {performGetRequest, performPostJsonRequest} from "./queries.ts";
import type {
    PanelAgeRatingDTO,
    PanelCategoryDTO,
    PanelCompanyDTO,
    PanelCompletionStatusDTO,
    PanelFeatureDTO,
    PanelFilterPresetDTO,
    PanelGameDTO,
    PanelGenreDTO,
    PanelLibraryPluginDTO,
    PanelPlatformDTO,
    PanelRegionDTO,
    PanelSeriesDTO,
    PanelSourceDTO,
    PanelTagDTO
} from "../models/objects.ts";
import {type GameListFilterDTO, GameListResultDTO} from "../models/gameList.ts";

export async function fetchAgeRatings(queryClient: QueryClient): Promise<PanelAgeRatingDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/age-rating/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchCategories(queryClient: QueryClient): Promise<PanelCategoryDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/category/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchCompanies(queryClient: QueryClient): Promise<PanelCompanyDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/company/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchCompletionStatuses(queryClient: QueryClient): Promise<PanelCompletionStatusDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/completion-status/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchFeatures(queryClient: QueryClient): Promise<PanelFeatureDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/feature/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchFilterPresets(queryClient: QueryClient): Promise<PanelFilterPresetDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/filter-preset/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchGenres(queryClient: QueryClient): Promise<PanelGenreDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/genre/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchLibraryPlugins(queryClient: QueryClient): Promise<PanelLibraryPluginDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/library-plugin/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchPlatforms(queryClient: QueryClient): Promise<PanelPlatformDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/platform/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchRegions(queryClient: QueryClient): Promise<PanelRegionDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/region/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchSeries(queryClient: QueryClient): Promise<PanelSeriesDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/series/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchSources(queryClient: QueryClient): Promise<PanelSourceDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/source/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchTags(queryClient: QueryClient): Promise<PanelTagDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/tag/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchGameReleaseYears(queryClient: QueryClient): Promise<string[]> {
    return (await performGetRequest(queryClient, "/api/panel/game/release-years")).json();
}

export async function fetchGames(queryClient: QueryClient, filter: GameListFilterDTO): Promise<GameListResultDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/game/filter", {
        body: JSON.stringify(filter)
    })).json();
}

export async function fetchGameDetails(queryClient: QueryClient, id: number): Promise<PanelGameDTO> {
    return (await performGetRequest(queryClient, `/api/panel/game/${id}`)).json();
}