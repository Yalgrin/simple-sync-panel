import {useParams} from "react-router";
import {LIBRARY_OBJECT_TYPES} from "../../models/library/LibraryObjectType.ts";
import {useEffect} from "react";
import {useLibraryListStore} from "../../store/useLibraryListStore.ts";


export function LibraryListPane() {
    const {type, id} = useParams()
    const libraryListStoreActions = useLibraryListStore((state) => state.actions);

    useEffect(() => {
        const idNumeric = id && Number.parseInt(id);
        if (idNumeric && !Number.isNaN(idNumeric)) {
            libraryListStoreActions.setSelectedObjectId(idNumeric);
        } else {
            libraryListStoreActions.setSelectedObjectId(null);
        }
    }, [id, libraryListStoreActions]);

    if (!type) {
        return null;
    }

    const libraryObjectType = LIBRARY_OBJECT_TYPES.find((t) => t.path === `/library/${type.toLowerCase()}`)

    if (!libraryObjectType) {
        return null;
    }

    const Body = libraryObjectType?.component;

    return <Body/>
}