import type {PanelObjectDTO} from "../../../models/objects.ts";
import type {FilterActions, FilterData, IdItemPropertiesDTO} from "../../../models/filters.ts";
import {useFilterStore} from "../../../store/useFilterStore.ts";
import {useEffect, useState} from "react";
import {Box, IconButton, TextField} from "@mui/material";
import {MultipleObjectSelect} from "../../common/inputs/MultipleObjectSelect.tsx";
import TextFieldsRoundedIcon from "@mui/icons-material/TextFieldsRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";


export interface ToggleableFilterSelectProps<T extends PanelObjectDTO> {
    options: T[] | undefined;
    isLoading?: boolean;
    error?: Error | null;
    addEmptyOption?: boolean;
    getFilter: (state: FilterData) => IdItemPropertiesDTO | null;
    setFilter: (actions: FilterActions, filter: IdItemPropertiesDTO | null) => void;
}

export function ToggleableFilterSelect<T extends PanelObjectDTO>({
                                                                     options,
                                                                     isLoading = false,
                                                                     error = null,
                                                                     addEmptyOption = true,
                                                                     getFilter,
                                                                     setFilter,
                                                                 }: Readonly<ToggleableFilterSelectProps<T>>) {
    let optionsNonNull = options ?? [];
    if (addEmptyOption) {
        optionsNonNull = [{playniteId: "00000000-0000-0000-0000-000000000000", name: "(None)"} as T, ...optionsNonNull];
    }

    const filter = useFilterStore(getFilter);
    const selectedFilterPresetId = useFilterStore((state) => state.selectedFilterPresetId);
    const filterActions = useFilterStore((state) => state.actions);

    const [ids, setIds] = useState<string[]>(() => filter?.ids ?? []);
    const [text, setText] = useState(() => filter?.text ?? "");
    const [isTextField, setIsTextField] = useState(() => Boolean(filter?.text));

    useEffect(() => {
        if (selectedFilterPresetId == null) {
            return;
        }

        const filterInStore = getFilter(useFilterStore.getState());
        const presetText = filterInStore?.text ?? "";
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIds(filterInStore?.ids ?? []);
        setText(presetText);
        setIsTextField(Boolean(presetText));
    }, [selectedFilterPresetId, getFilter]);

    const value: T[] = ids
        .map((id) => optionsNonNull.find((o) => o.playniteId === id))
        .filter((o): o is T => o != null);

    const handleValueChange = (selected: T[]) => {
        const nextIds = selected
            .map((o) => o.playniteId)
            .filter((id): id is string => id != null);
        setIds(nextIds);
        setFilter(filterActions, {ids: nextIds, text: null});
    };

    const handleTextChange = (newValue: string) => {
        setText(newValue);
        setFilter(filterActions, {ids: [], text: newValue});
    };

    const switchMode = () => {
        if (isTextField) {
            setFilter(filterActions, {ids, text: null});
        } else {
            setFilter(filterActions, {ids: [], text});
        }
        setIsTextField(!isTextField);
    };

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 40px",
        }}>
            {isTextField ?
                <TextField size="small"
                           value={text}
                           onChange={(e) => handleTextChange(e.target.value)}
                           fullWidth
                           disabled={isLoading || Boolean(error)}
                /> :
                <MultipleObjectSelect value={value}
                                      setValue={handleValueChange}
                                      options={optionsNonNull}
                                      disabled={isLoading || Boolean(error)}
                />}
            <IconButton onClick={() => switchMode()}>
                {isTextField ? <TextFieldsRoundedIcon/> : <ListRoundedIcon/>}
            </IconButton>
        </Box>
    );
}