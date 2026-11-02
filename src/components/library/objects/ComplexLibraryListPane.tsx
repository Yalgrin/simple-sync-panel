import type {PanelObjectDTO} from "../../../models/objects.ts";
import {SimpleLibraryListPane, type SimpleLibraryListPaneProps} from "./SimpleLibraryListPane.tsx";
import * as React from "react";
import {Box} from "@mui/material";


export interface ComplexLibraryListPaneProps<T extends PanelObjectDTO> extends SimpleLibraryListPaneProps<T> {
    children?: React.ReactNode;
}

export function ComplexLibraryListPane<T extends PanelObjectDTO>({
                                                                     name,
                                                                     type,
                                                                     description,
                                                                     addNewEnabled = false,
                                                                     objectList,
                                                                     isLoading,
                                                                     isPlaceholderData,
                                                                     error,
                                                                     onCreate = () => Promise.resolve(),
                                                                     onSave,
                                                                     onDelete,
                                                                     children
                                                                 }: Readonly<ComplexLibraryListPaneProps<T>>) {

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <SimpleLibraryListPane<T>
                name={name}
                type={type}
                description={description}
                addNewEnabled={addNewEnabled}
                objectList={objectList}
                isLoading={isLoading}
                isPlaceholderData={isPlaceholderData}
                error={error}
                onCreate={onCreate}
                onSave={onSave}
                onDelete={onDelete}
                sx={{
                    flex: 1
                }}
            />
            {children}
        </Box>
    )
}