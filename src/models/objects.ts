import type {FilterPresetSettingsDTO} from "./filters.ts";

export const GAME_GLOBAL_QUERY_KEY = ["game"] as const;
export const GAME_LIST_QUERY_KEY = ["game", "filter"] as const;
export const GAME_DETAILS_QUERY_KEY = ["game", "details"] as const;
export const RELEASE_YEAR_QUERY_KEY = ["game", "release-years"] as const;

export const ALL_LIBRARY_OBJECTS_QUERY_KEY = ["library"] as const;
export const LIBRARY_PLUGIN_QUERY_KEY = ["library", "library-plugin"] as const;
export const PLATFORM_QUERY_KEY = ["library", "platform"] as const;
export const PLATFORM_SPECIFICATION_QUERY_KEY = ["library", "platform", "specification"] as const;
export const AGE_RATING_QUERY_KEY = ["library", "age-rating"] as const;
export const GENRE_QUERY_KEY = ["library", "genre"] as const;
export const REGION_QUERY_KEY = ["library", "region"] as const;
export const REGION_SPECIFICATION_QUERY_KEY = ["library", "region", "specification"] as const;
export const COMPANY_QUERY_KEY = ["library", "company"] as const;
export const SOURCE_QUERY_KEY = ["library", "source"] as const;
export const COMPLETION_STATUS_QUERY_KEY = ["library", "completion-status"] as const;
export const CATEGORY_QUERY_KEY = ["library", "category"] as const;
export const FEATURE_QUERY_KEY = ["library", "feature"] as const;
export const TAG_QUERY_KEY = ["library", "tag"] as const;
export const SERIES_QUERY_KEY = ["library", "series"] as const;
export const FILTER_PRESET_QUERY_KEY = ["library", "filter-preset"] as const;

export interface PanelObjectDTO {
    id?: number | null;
    playniteId?: string | null;
    name?: string | null;
}

export interface PanelLibraryPluginToSaveDTO {
    dto: PanelLibraryPluginDTO;
    icon: File | null;
    backgroundImage: File | null;
}

export interface PanelLibraryPluginDTO extends PanelObjectDTO {
    iconUrl?: string;
    backgroundImageUrl?: string;

    isSavingIcon?: boolean;
    isSavingBackgroundImage?: boolean;
}

export interface PanelPlatformToSaveDTO {
    dto: PanelPlatformDTO;
    icon: File | null;
    backgroundImage: File | null;
    coverImage: File | null;
}

export interface PanelPlatformDTO extends PanelObjectDTO {
    specificationId?: string | null;

    iconUrl?: string;
    coverImageUrl?: string;
    backgroundImageUrl?: string;

    isSavingIcon?: boolean;
    isSavingCoverImage?: boolean;
    isSavingBackgroundImage?: boolean;
}

export type PanelAgeRatingDTO = PanelObjectDTO

export type PanelGenreDTO = PanelObjectDTO

export interface PanelRegionDTO extends PanelObjectDTO {
    specificationId?: string | null;
}

export type PanelCompanyDTO = PanelObjectDTO

export type PanelSourceDTO = PanelObjectDTO

export type PanelCompletionStatusDTO = PanelObjectDTO

export type PanelCategoryDTO = PanelObjectDTO

export type PanelFeatureDTO = PanelObjectDTO

export type PanelTagDTO = PanelObjectDTO

export type PanelSeriesDTO = PanelObjectDTO

export interface PanelFilterPresetDTO extends PanelObjectDTO {
    settings: FilterPresetSettingsDTO | null;
    sortingOrder: string | null;
    sortingOrderDirection: string | null;
    groupingOrder: string | null;
    showInFullscreenQuickSelection: boolean;
}

export interface LinkDTO {
    name: string;
    url: string;
}

export interface PanelGameToSaveDTO {
    game: PanelGameDTO;
    icon: File | null;
    backgroundImage: File | null;
    coverImage: File | null;
}

export interface PanelGameDTO extends PanelObjectDTO {
    gameId?: string | null;
    plugin?: PanelLibraryPluginDTO | null;
    releaseDate?: string | null;
    sortingName?: string | null;
    series: PanelSeriesDTO[];
    platforms: PanelPlatformDTO[];
    ageRatings: PanelAgeRatingDTO[];
    genres: PanelGenreDTO[];
    regions: PanelRegionDTO[];
    developers: PanelCompanyDTO[];
    source?: PanelSourceDTO | null;
    publishers: PanelCompanyDTO[];
    completionStatus?: PanelCompletionStatusDTO | null;
    categories: PanelCategoryDTO[];
    userScore?: number | null;
    features: PanelFeatureDTO[];
    criticScore?: number | null;
    tags: PanelTagDTO[];
    communityScore?: number | null;
    description?: string | null;
    lastActivity?: string | null;
    playtime: number;
    playCount: number;
    installSize?: number | null;
    version?: string | null;
    manual?: string | null;
    isHidden: boolean;
    isFavorite: boolean;
    added?: string | null;
    modified?: string | null;
    notes?: string | null;

    links: LinkDTO[];

    hasIcon?: boolean;
    hasCoverImage?: boolean;
    hasBackgroundImage?: boolean;

    iconUrl?: string;
    coverImageUrl?: string;
    backgroundImageUrl?: string;

    isSavingIcon?: boolean;
    isSavingCoverImage?: boolean;
    isSavingBackgroundImage?: boolean;
}

