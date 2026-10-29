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

export const useGameListStore = create<GameListState>()(
    persist((set) => ({
            filterSectionEnabled: true,
            selectedGameId: null,
            collapsedGroups: new Set<string>(),
            actions: {
                setFilterSectionEnabled: (value: boolean) => set({filterSectionEnabled: value}),
                setSelectedGameId: (id: number | undefined | null) => set({selectedGameId: id}),
                setCollapsedGroups: (groups: Set<string>) => set({collapsedGroups: groups}),
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
            partialize: (state) => ({...state, actions: undefined}),
            merge: (persisted, current) => {
                const saved = persisted as Partial<GameListState> & {
                    collapsedGroups?: unknown;
                };
                let groups = saved.collapsedGroups;
                if (groups instanceof Set) {
                    groups = new Set(groups);
                } else if (Array.isArray(groups)) {
                    groups = new Set((groups as string[]).filter((name: string) => typeof name === "string"));
                } else {
                    groups = new Set();
                }

                return {
                    ...current,
                    ...saved,
                    collapsedGroups: groups,
                    actions: current.actions,
                };
            },
        }));