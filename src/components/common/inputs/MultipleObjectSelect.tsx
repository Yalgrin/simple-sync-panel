import {useMemo, useRef} from "react";
import type {PanelObjectDTO} from "../../../models/objects.ts";
import {MultipleSearchSelect} from "./MultipleSearchSelect.tsx";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";

export interface MultipleObjectSelectProps<T extends PanelObjectDTO> {
    value: T[];
    setValue: (value: T[]) => void;
    options: T[];
    setOptions?: (options: T[]) => void;
    allowAdd?: boolean;
    disabled?: boolean;
}

export function MultipleObjectSelect<T extends PanelObjectDTO>({
                                                                   value,
                                                                   setValue,
                                                                   options,
                                                                   setOptions = () => {
                                                                   },
                                                                   allowAdd = false,
                                                                   disabled = false
                                                               }: Readonly<MultipleObjectSelectProps<T>>) {
    const newlyCreated = useRef(new Map<string, T>());

    const {selectedOptions, availableOptions, objectsById} = useMemo(() => {
        const objectsById = new Map<string, T>();

        const toOption = (object: T): SelectOption => {
            const id = object.playniteId != null
                ? `id-${object.playniteId}`
                : `unsaved-${object.name ?? ""}`;

            objectsById.set(id, object);
            return {id, name: object.name ?? ""};
        };

        const availableOptions = options.map(toOption);
        const selectedOptions = value.map(toOption);

        return {selectedOptions, availableOptions, objectsById};
    }, [options, value]);

    const toObject = (option: SelectOption): T => {
        const existing = objectsById.get(option.id) ?? newlyCreated.current.get(option.id);
        if (existing) return existing;

        const created = {name: option.name} as T;
        newlyCreated.current.set(option.id, created);
        return created;
    };

    return (
        <MultipleSearchSelect
            value={selectedOptions}
            setValue={(selected) => setValue(selected.map(toObject))}
            options={availableOptions}
            setOptions={(nextOptions) => setOptions(nextOptions.map(toObject))}
            allowAdd={allowAdd}
            disabled={disabled}
        />
    );
}