import type {QueryClient} from "@tanstack/react-query";
import {performGetRequest, performPostJsonRequest, performPostRequest} from "./queries.ts";
import type {
    PanelAgeRatingDTO,
    PanelCategoryDTO,
    PanelCompanyDTO,
    PanelCompletionStatusDTO,
    PanelFeatureDTO,
    PanelFilterPresetDTO,
    PanelGameDTO,
    PanelGameToSaveDTO,
    PanelGenreDTO,
    PanelLibraryPluginDTO,
    PanelLibraryPluginToSaveDTO,
    PanelPlatformDTO,
    PanelPlatformToSaveDTO,
    PanelRegionDTO,
    PanelSeriesDTO,
    PanelSourceDTO,
    PanelTagDTO
} from "../models/objects.ts";
import {type GameListFilterDTO, GameListResultDTO} from "../models/gameList.ts";
import {REGION_SPECIFICATIONS, type RegionSpecification} from "../models/library/RegionSpecification.ts";
import {PLATFORM_SPECIFICATIONS, type PlatformSpecification} from "../models/library/PlatformSpecification.ts";

export async function fetchAgeRatings(queryClient: QueryClient): Promise<PanelAgeRatingDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/age-rating/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function saveAgeRating(queryClient: QueryClient, dto: PanelAgeRatingDTO): Promise<PanelAgeRatingDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/age-rating/save", {
        body: JSON.stringify(dto)
    })).json();
}

export async function deleteAgeRating(queryClient: QueryClient, dto: PanelAgeRatingDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/age-rating/delete", {
        body: JSON.stringify(dto)
    }));
}

export async function fetchCategories(queryClient: QueryClient): Promise<PanelCategoryDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/category/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function saveCategory(queryClient: QueryClient, dto: PanelCategoryDTO): Promise<PanelCategoryDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/category/save", {
        body: JSON.stringify(dto)
    })).json();
}

export async function deleteCategory(queryClient: QueryClient, dto: PanelCategoryDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/category/delete", {
        body: JSON.stringify(dto)
    }));
}

export async function fetchCompanies(queryClient: QueryClient): Promise<PanelCompanyDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/company/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function saveCompany(queryClient: QueryClient, dto: PanelCompanyDTO): Promise<PanelCompanyDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/company/save", {
        body: JSON.stringify(dto)
    })).json();
}

export async function deleteCompany(queryClient: QueryClient, dto: PanelCompanyDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/company/delete", {
        body: JSON.stringify(dto)
    }));
}

export async function fetchCompletionStatuses(queryClient: QueryClient): Promise<PanelCompletionStatusDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/completion-status/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function saveCompletionStatus(queryClient: QueryClient, dto: PanelCompletionStatusDTO): Promise<PanelCompletionStatusDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/completion-status/save", {
        body: JSON.stringify(dto)
    })).json();
}

export async function deleteCompletionStatus(queryClient: QueryClient, dto: PanelCompletionStatusDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/completion-status/delete", {
        body: JSON.stringify(dto)
    }));
}

export async function fetchFeatures(queryClient: QueryClient): Promise<PanelFeatureDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/feature/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function saveFeature(queryClient: QueryClient, dto: PanelFeatureDTO): Promise<PanelFeatureDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/feature/save", {
        body: JSON.stringify(dto)
    })).json();
}

export async function deleteFeature(queryClient: QueryClient, dto: PanelFeatureDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/feature/delete", {
        body: JSON.stringify(dto)
    }));
}

export async function fetchFilterPresets(queryClient: QueryClient): Promise<PanelFilterPresetDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/filter-preset/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function saveFilterPreset(queryClient: QueryClient, dto: PanelFilterPresetDTO): Promise<PanelFilterPresetDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/filter-preset/save", {
        body: JSON.stringify(dto)
    })).json();
}

export async function deleteFilterPreset(queryClient: QueryClient, dto: PanelFilterPresetDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/filter-preset/delete", {
        body: JSON.stringify(dto)
    }));
}

export async function fetchGenres(queryClient: QueryClient): Promise<PanelGenreDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/genre/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function saveGenre(queryClient: QueryClient, dto: PanelGenreDTO): Promise<PanelGenreDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/genre/save", {
        body: JSON.stringify(dto)
    })).json();
}

export async function deleteGenre(queryClient: QueryClient, dto: PanelGenreDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/genre/delete", {
        body: JSON.stringify(dto)
    }));
}

export async function fetchLibraryPlugins(queryClient: QueryClient): Promise<PanelLibraryPluginDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/library-plugin/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function saveLibraryPlugin(queryClient: QueryClient, dto: PanelLibraryPluginToSaveDTO): Promise<PanelLibraryPluginDTO> {
    const requestInit: RequestInit = {};
    const formData = new FormData()
    formData.append(
        "dto",
        new Blob([JSON.stringify(dto.dto)], {type: "application/json"})
    );
    if (dto.dto.isSavingIcon && dto.icon) {
        formData.append("files", renameFile(dto.icon, "Icon"));
    }
    if (dto.dto.isSavingBackgroundImage && dto.backgroundImage) {
        formData.append("files", renameFile(dto.backgroundImage, "BackgroundImage"));
    }
    requestInit.body = formData;
    return (await performPostRequest(queryClient, "/api/panel/library-plugin/save", requestInit)).json();
}

export async function deleteLibraryPlugin(queryClient: QueryClient, dto: PanelLibraryPluginDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/library-plugin/delete", {
        body: JSON.stringify(dto)
    }));
}

export async function fetchPlatforms(queryClient: QueryClient): Promise<PanelPlatformDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/platform/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchPlatformSpecifications(queryClient: QueryClient): Promise<PlatformSpecification[]> {
    const serverSpecIds: string[] = await (await performGetRequest(queryClient, "/api/panel/platform/specification-ids")).json();
    const specifications: PlatformSpecification[] = [];
    PLATFORM_SPECIFICATIONS.forEach((spec) => {
        specifications.push(spec);
    });
    serverSpecIds.forEach((specId) => {
        const spec = specifications.some((spec) => spec.id === specId);
        if (!spec) {
            specifications.push({id: specId, name: specId});
        }
    })
    specifications.sort((a, b) => a.name.localeCompare(b.name));
    return specifications;
}

export async function savePlatform(queryClient: QueryClient, dto: PanelPlatformToSaveDTO): Promise<PanelPlatformDTO> {
    const requestInit: RequestInit = {};
    const formData = new FormData()
    formData.append(
        "dto",
        new Blob([JSON.stringify(dto.dto)], {type: "application/json"})
    );
    if (dto.dto.isSavingIcon && dto.icon) {
        formData.append("files", renameFile(dto.icon, "Icon"));
    }
    if (dto.dto.isSavingBackgroundImage && dto.backgroundImage) {
        formData.append("files", renameFile(dto.backgroundImage, "BackgroundImage"));
    }
    if (dto.dto.isSavingCoverImage && dto.coverImage) {
        formData.append("files", renameFile(dto.coverImage, "CoverImage"));
    }
    requestInit.body = formData;
    return (await performPostRequest(queryClient, "/api/panel/platform/save", requestInit)).json();
}

export async function deletePlatform(queryClient: QueryClient, dto: PanelPlatformDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/platform/delete", {
        body: JSON.stringify(dto)
    }));
}

export async function fetchRegions(queryClient: QueryClient): Promise<PanelRegionDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/region/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function fetchRegionSpecifications(queryClient: QueryClient): Promise<RegionSpecification[]> {
    const serverSpecIds: string[] = await (await performGetRequest(queryClient, "/api/panel/region/specification-ids")).json();
    const specifications: RegionSpecification[] = [];
    REGION_SPECIFICATIONS.forEach((spec) => {
        specifications.push(spec);
    });
    serverSpecIds.forEach((specId) => {
        const spec = specifications.some((spec) => spec.id === specId);
        if (!spec) {
            specifications.push({id: specId, name: specId});
        }
    })
    specifications.sort((a, b) => a.name.localeCompare(b.name));
    return specifications;
}

export async function saveRegion(queryClient: QueryClient, dto: PanelRegionDTO): Promise<PanelRegionDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/region/save", {
        body: JSON.stringify(dto)
    })).json();
}

export async function deleteRegion(queryClient: QueryClient, dto: PanelRegionDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/region/delete", {
        body: JSON.stringify(dto)
    }));
}

export async function fetchSeries(queryClient: QueryClient): Promise<PanelSeriesDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/series/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function saveSeries(queryClient: QueryClient, dto: PanelSeriesDTO): Promise<PanelSeriesDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/series/save", {
        body: JSON.stringify(dto)
    })).json();
}

export async function deleteSeries(queryClient: QueryClient, dto: PanelSeriesDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/series/delete", {
        body: JSON.stringify(dto)
    }));
}

export async function fetchSources(queryClient: QueryClient): Promise<PanelSourceDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/source/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function saveSource(queryClient: QueryClient, dto: PanelSourceDTO): Promise<PanelSourceDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/source/save", {
        body: JSON.stringify(dto)
    })).json();
}

export async function deleteSource(queryClient: QueryClient, dto: PanelSourceDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/source/delete", {
        body: JSON.stringify(dto)
    }));
}

export async function fetchTags(queryClient: QueryClient): Promise<PanelTagDTO[]> {
    return (await performPostJsonRequest(queryClient, "/api/panel/tag/filter", {
        body: JSON.stringify({})
    })).json();
}

export async function saveTag(queryClient: QueryClient, dto: PanelTagDTO): Promise<PanelTagDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/tag/save", {
        body: JSON.stringify(dto)
    })).json();
}

export async function deleteTag(queryClient: QueryClient, dto: PanelTagDTO): Promise<Response> {
    return (await performPostJsonRequest(queryClient, "/api/panel/tag/delete", {
        body: JSON.stringify(dto)
    }));
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

function renameFile(file: File, newBaseName: string): File {
    const lastDot = file.name.lastIndexOf(".");
    const extension = lastDot > 0 ? file.name.slice(lastDot) : "";

    return new File([file], `${newBaseName}${extension}`, {
        type: file.type,
        lastModified: file.lastModified,
    });
}

export async function saveGame(queryClient: QueryClient, game: PanelGameToSaveDTO): Promise<PanelGameDTO> {
    const requestInit: RequestInit = {};
    const formData = new FormData()
    formData.append(
        "dto",
        new Blob([JSON.stringify(game.game)], {type: "application/json"})
    );
    if (game.game.isSavingIcon && game.icon) {
        formData.append("files", renameFile(game.icon, "Icon"));
    }
    if (game.game.isSavingBackgroundImage && game.backgroundImage) {
        formData.append("files", renameFile(game.backgroundImage, "BackgroundImage"));
    }
    if (game.game.isSavingCoverImage && game.coverImage) {
        formData.append("files", renameFile(game.coverImage, "CoverImage"));
    }
    requestInit.body = formData;
    return (await performPostRequest(queryClient, "/api/panel/game/save", requestInit)).json();
}

export async function markGameAsFavorite(queryClient: QueryClient, game: PanelGameDTO, favorite: boolean): Promise<PanelGameDTO> {
    return (await performPostJsonRequest(queryClient, "/api/panel/game/mark-as-favorite?favorite=" + favorite, {
        body: JSON.stringify({id: game.id, favorite})
    })).json();
}

export async function deleteGame(queryClient: QueryClient, game: PanelGameDTO): Promise<void> {
    (await performPostJsonRequest(queryClient, "/api/panel/game/delete", {
        body: JSON.stringify(game)
    }));
}