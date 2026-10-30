import {create} from "zustand/react";
import {persist} from "zustand/middleware";

export type GameListState = {
    filterSectionEnabled: boolean;
    selectedGameId?: number | null;
    collapsedGroups: Set<string>;
    actions: {
        setFilterSectionEnabled: (value: boolean) => void;
        setSelectedGameId: (id: number | undefined | null) => void;
        setCollapsedGroups: (groups: Set<string>) => void;
        toggleCollapsedGroup: (name: string) => void;
    }
}

type PersistedGameListState = {
    filterSectionEnabled: boolean;
    selectedGameId?: number | null;
    collapsedGroups: string[];
};

export const useGameListStore = create<GameListState>()(
    persist<GameListState, [], [], PersistedGameListState>((set) => ({
            filterSectionEnabled: true,
            selectedGameId: null,
            collapsedGroups: new Set<string>(),
            actions: {
                setFilterSectionEnabled: (value: boolean) => set({filterSectionEnabled: value}),
                setSelectedGameId: (id: number | undefined | null) => set({selectedGameId: id}),
                setCollapsedGroups: (groups: Set<string>) => set({collapsedGroups: new Set(groups)}),
                toggleCollapsedGroup: (name: string) => set((state) => {
                    const next = new Set(state.collapsedGroups);
                    if (next.has(name)) {
                        next.delete(name);
                    } else {
                        next.add(name);
                    }
                    return {collapsedGroups: next};
                }),
            },
        }),
        {
            name: "gameListStore",
            partialize: (state) => ({
                filterSectionEnabled: state.filterSectionEnabled,
                selectedGameId: state.selectedGameId,
                collapsedGroups: [...state.collapsedGroups],
            }),
            merge: (persisted, current) => {
                if (persisted === null || typeof persisted !== "object" || Array.isArray(persisted)) {
                    return current;
                }

                const saved = persisted as Record<string, unknown>;
                const groups = saved.collapsedGroups;
                const selectedGameId = saved.selectedGameId;

                return {
                    ...current,
                    filterSectionEnabled: typeof saved.filterSectionEnabled === "boolean"
                        ? saved.filterSectionEnabled
                        : current.filterSectionEnabled,
                    selectedGameId: selectedGameId === null ||
                    (typeof selectedGameId === "number" && Number.isFinite(selectedGameId))
                        ? selectedGameId
                        : current.selectedGameId,
                    collapsedGroups: Array.isArray(groups)
                        ? new Set<string>(groups.filter((name): name is string => typeof name === "string"))
                        : current.collapsedGroups,
                };
            },
        }));