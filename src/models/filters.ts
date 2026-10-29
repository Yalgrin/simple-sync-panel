import type {GameListFilterDTO} from "./gameList.ts";
import type {PanelFilterPresetDTO} from "./objects.ts";

export interface FilterPresetSettingsDTO {
    useAndFilteringStyle: boolean;
    isInstalled: boolean;
    isUninstalled: boolean;
    isHidden: boolean;
    isFavorite: boolean;
    name: string | null;
    version: string | null;
    releaseYear: StringItemPropertiesDTO | null;
    genre: IdItemPropertiesDTO | null;
    platform: IdItemPropertiesDTO | null;
    publisher: IdItemPropertiesDTO | null;
    developer: IdItemPropertiesDTO | null;
    category: IdItemPropertiesDTO | null;
    tag: IdItemPropertiesDTO | null;
    series: IdItemPropertiesDTO | null;
    region: IdItemPropertiesDTO | null;
    source: IdItemPropertiesDTO | null;
    ageRating: IdItemPropertiesDTO | null;
    library: IdItemPropertiesDTO | null;
    completionStatuses: IdItemPropertiesDTO | null;
    feature: IdItemPropertiesDTO | null;
    userScore: IntItemPropertiesDTO | null;
    criticScore: IntItemPropertiesDTO | null;
    communityScore: IntItemPropertiesDTO | null;
    lastActivity: IntItemPropertiesDTO | null;
    recentActivity: IntItemPropertiesDTO | null;
    added: IntItemPropertiesDTO | null;
    modified: IntItemPropertiesDTO | null;
    playTime: IntItemPropertiesDTO | null;
    installSize: IntItemPropertiesDTO | null;
}

export interface IdItemPropertiesDTO {
    ids: string[];
    text: string | null;
}

export interface ValueListItemPropertiesDTO<T> {
    values: T[];
}

export type StringItemPropertiesDTO = ValueListItemPropertiesDTO<string>

export type IntItemPropertiesDTO = ValueListItemPropertiesDTO<number>

export interface FilterActions {
    clear: () => void;
    setSelectedFilterPresetId: (value: number | null) => void;
    setFromFilterPreset: (value: PanelFilterPresetDTO) => void;
    setUseAndFilteringStyle: (value: GameListFilterDTO["useAndFilteringStyle"]) => void;
    setIsInstalled: (value: GameListFilterDTO["isInstalled"]) => void;
    setIsUninstalled: (value: GameListFilterDTO["isUninstalled"]) => void;
    setIsHidden: (value: GameListFilterDTO["isHidden"]) => void;
    setIsFavorite: (value: GameListFilterDTO["isFavorite"]) => void;
    setName: (value: GameListFilterDTO["name"]) => void;
    setVersion: (value: GameListFilterDTO["version"]) => void;
    setReleaseYear: (value: GameListFilterDTO["releaseYear"]) => void;
    setGenre: (value: GameListFilterDTO["genre"]) => void;
    setPlatform: (value: GameListFilterDTO["platform"]) => void;
    setPublisher: (value: GameListFilterDTO["publisher"]) => void;
    setDeveloper: (value: GameListFilterDTO["developer"]) => void;
    setCategory: (value: GameListFilterDTO["category"]) => void;
    setTag: (value: GameListFilterDTO["tag"]) => void;
    setSeries: (value: GameListFilterDTO["series"]) => void;
    setRegion: (value: GameListFilterDTO["region"]) => void;
    setSource: (value: GameListFilterDTO["source"]) => void;
    setAgeRating: (value: GameListFilterDTO["ageRating"]) => void;
    setLibrary: (value: GameListFilterDTO["library"]) => void;
    setCompletionStatuses: (value: GameListFilterDTO["completionStatuses"]) => void;
    setFeature: (value: GameListFilterDTO["feature"]) => void;
    setUserScore: (value: GameListFilterDTO["userScore"]) => void;
    setCriticScore: (value: GameListFilterDTO["criticScore"]) => void;
    setCommunityScore: (value: GameListFilterDTO["communityScore"]) => void;
    setLastActivity: (value: GameListFilterDTO["lastActivity"]) => void;
    setRecentActivity: (value: GameListFilterDTO["recentActivity"]) => void;
    setAdded: (value: GameListFilterDTO["added"]) => void;
    setModified: (value: GameListFilterDTO["modified"]) => void;
    setPlayTime: (value: GameListFilterDTO["playTime"]) => void;
    setInstallSize: (value: GameListFilterDTO["installSize"]) => void;
    setSortingOrder: (value: GameListFilterDTO["sortingOrder"]) => void;
    setSortingOrderDirection: (value: GameListFilterDTO["sortingOrderDirection"]) => void;
    setGroupingOrder: (value: GameListFilterDTO["groupingOrder"]) => void;
}

export interface FilterData extends GameListFilterDTO {
    selectedFilterPresetId: number | null;
    actions: FilterActions;
}

export const SortOrder = {
    NAME: "Name",
    PLATFORMS: "Platforms",
    LIBRARY: "Library",
    CATEGORIES: "Categories",
    LAST_ACTIVITY: "LastActivity",
    GENRES: "Genres",
    RELEASE_DATE: "ReleaseDate",
    DEVELOPERS: "Developers",
    PUBLISHERS: "Publishers",
    TAGS: "Tags",
    SERIES: "Series",
    AGE_RATINGS: "AgeRatings",
    VERSION: "Version",
    REGIONS: "Regions",
    SOURCE: "Source",
    PLAY_COUNT: "PlayCount",
    PLAYTIME: "Playtime",
    COMPLETION_STATUS: "CompletionStatus",
    USER_SCORE: "UserScore",
    CRITIC_SCORE: "CriticScore",
    COMMUNITY_SCORE: "CommunityScore",
    ADDED: "Added",
    MODIFIED: "Modified",
    IS_INSTALLED: "IsInstalled",
    HIDDEN: "Hidden",
    FAVORITE: "Favorite",
    INSTALL_DIRECTORY: "InstallDirectory",
    FEATURES: "Features",
    INSTALL_SIZE: "InstallSize",
    RECENT_ACTIVITY: "RecentActivity",
    ROM_LIST: "RomList",
} as const;

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

export const SortOrderDirection = {
    ASCENDING: "Ascending",
    DESCENDING: "Descending",
} as const;

export type SortOrderDirection =
    (typeof SortOrderDirection)[keyof typeof SortOrderDirection];

export const GroupableField = {
    NONE: "None",
    PLATFORM: "Platform",
    LIBRARY: "Library",
    CATEGORY: "Category",
    LAST_ACTIVITY: "LastActivity",
    GENRE: "Genre",
    RELEASE_YEAR: "ReleaseYear",
    DEVELOPER: "Developer",
    PUBLISHER: "Publisher",
    TAG: "Tag",
    SERIES: "Series",
    AGE_RATING: "AgeRating",
    REGION: "Region",
    SOURCE: "Source",
    PLAY_TIME: "PlayTime",
    COMPLETION_STATUS: "CompletionStatus",
    USER_SCORE: "UserScore",
    CRITIC_SCORE: "CriticScore",
    COMMUNITY_SCORE: "CommunityScore",
    ADDED: "Added",
    MODIFIED: "Modified",
    FEATURE: "Feature",
    INSTALLATION_STATUS: "InstallationStatus",
    NAME: "Name",
    INSTALL_DRIVE: "InstallDrive",
    INSTALL_SIZE: "InstallSize",
    RECENT_ACTIVITY: "RecentActivity",
} as const;

export type GroupableField =
    (typeof GroupableField)[keyof typeof GroupableField];

export interface PlaytimeCategory {
    value: number,
    label: string
}

export const PlaytimeCategories: PlaytimeCategory[] = [
    {value: 0, label: "NOT_PLAYED"},
    {value: 1, label: "LESS_THAN_HOUR"},
    {value: 2, label: "O1_10"},
    {value: 3, label: "O10_100"},
    {value: 4, label: "O100_500"},
    {value: 5, label: "O500_1000"},
    {value: 6, label: "O1000_PLUS"},
] as const;

export interface ScoreGroup {
    value: number,
    label: string
}

export const ScoreGroups: ScoreGroup[] = [
    {value: 0, label: "O0X"},
    {value: 1, label: "O1X"},
    {value: 2, label: "O2X"},
    {value: 3, label: "O3X"},
    {value: 4, label: "O4X"},
    {value: 5, label: "O5X"},
    {value: 6, label: "O6X"},
    {value: 7, label: "O7X"},
    {value: 8, label: "O8X"},
    {value: 9, label: "O9X"},
    {value: 10, label: "NONE"},
] as const;

export interface PastTimeSegment {
    value: number,
    label: string
}

export const PastTimeSegments: PastTimeSegment[] = [
    {value: 0, label: "TODAY"},
    {value: 1, label: "YESTERDAY"},
    {value: 2, label: "PAST_WEEK"},
    {value: 3, label: "PAST_MONTH"},
    {value: 4, label: "PAST_YEAR"},
    {value: 5, label: "MORE_THAN_YEAR"},
    {value: 6, label: "NEVER"},
] as const;

export interface InstallSizeGroup {
    value: number,
    label: string
}

export const InstallSizeGroups: InstallSizeGroup[] = [
    {value: 0, label: "NONE"},
    {value: 1, label: "S0_0MB_100MB"},
    {value: 2, label: "S1_100MB_1GB"},
    {value: 3, label: "S2_1GB_5GB"},
    {value: 4, label: "S3_5GB_10GB"},
    {value: 5, label: "S4_10GB_20GB"},
    {value: 6, label: "S5_20GB_40GB"},
    {value: 7, label: "S6_40GB_100GB"},
    {value: 8, label: "S7_100GB_PLUS"},
] as const;
