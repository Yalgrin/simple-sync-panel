import {create} from "zustand/react";

export interface LibraryListStoreData {
    selectedObjectId: number | null | undefined,
    actions: LibraryListStoreActions
}

export interface LibraryListStoreActions {
    clear: () => void,
    setSelectedObjectId: (selectedObjectId: number | null | undefined) => void
}

export const useLibraryListStore = create<LibraryListStoreData>((set) => ({
    selectedObjectId: undefined,
    actions: {
        clear: () => set({selectedObjectId: undefined}),
        setSelectedObjectId: (selectedObjectId: number | null | undefined) => set({selectedObjectId}),
    }
}));