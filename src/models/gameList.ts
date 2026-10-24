import type {IdItemPropertiesDTO, IntItemPropertiesDTO, StringItemPropertiesDTO} from "./filters.ts";
import type {PanelCompletionStatusDTO, PanelLibraryPluginDTO} from "./objects.ts";

export interface GameListFilterDTO {
    useAndFilteringStyle: boolean | null;
    isInstalled: boolean | null;
    isUninstalled: boolean | null;
    isHidden: boolean | null;
    isFavorite: boolean | null;
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
    sortingOrder: string | null;
    sortingOrderDirection: string | null;
    groupingOrder: string | null;
}

export class GameListDTO {
    id?: number;
    name?: string;
    plugin?: PanelLibraryPluginDTO | null;
    completionStatus?: PanelCompletionStatusDTO | null;
    lastActivity?: string | null;
    playtime: number = 0;
    isFavorite: boolean = false;
    hasIcon?: boolean;
    iconUrl?: string;
}

export class GameListResultDTO {
    ungroupedResults?: GameListDTO[];
    sortedGroups?: string[];
    groupingOrder?: string;
    groupedResults?: Record<string, GameListDTO[]>;
}