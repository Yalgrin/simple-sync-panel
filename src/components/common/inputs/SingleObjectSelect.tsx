import {useMemo, useRef} from "react";
import type {PanelObjectDTO} from "../../../models/objects.ts";
import {SingleSearchSelect} from "./SingleSearchSelect.tsx";
import type {SelectOption} from "../../../models/inputs/SelectOption.ts";

export interface SingleObjectSelectProps<T extends PanelObjectDTO> {
    value: T | undefined | null;
    setValue: (value: T | null) => void;
    options: T[];
    setOptions?: (options: T[]) => void;
    allowAdd?: boolean;
    disabled?: boolean;
}

export function SingleObjectSelect<T extends PanelObjectDTO>({
                                                                 value,
                                                                 setValue,
                                                                 options,
                                                                 setOptions = () => {
                                                                 },
                                                                 allowAdd = false,
                                                                 disabled = false
                                                             }: Readonly<SingleObjectSelectProps<T>>) {
    const newlyCreated = useRef(new Map<string, T>());

    const {selectedOption, availableOptions, objectsById} = useMemo(() => {
        const objectsById = new Map<string, T>();

        const toOption = (object: T): SelectOption<string> => {
            const id = object.playniteId != null
                ? `id-${object.playniteId}`
                : `unsaved-${object.name ?? ""}`;

            objectsById.set(id, object);
            return {id, name: object.name ?? ""};
        };

        const toOptionNullable = (object: T | undefined | null): SelectOption<string> | null => {
            if (object == null) {
                return null;
            }
            return toOption(object);
        };

        const availableOptions = options.map(toOption);
        const selectedOption = toOptionNullable(value);

        return {selectedOption, availableOptions, objectsById};
    }, [options, value]);

    const toObject = (option: SelectOption<string>): T => {
        const existing = objectsById.get(option.id) ?? newlyCreated.current.get(option.id);
        if (existing) return existing;

        const created = {name: option.name} as T;
        newlyCreated.current.set(option.id, created);
        return created;
    };

    const toObjectNullable = (option: SelectOption<string> | undefined | null): T | null => {
        if (option == null) {
            return null;
        }
        return toObject(option);
    };

    return (
        <SingleSearchSelect
            value={selectedOption}
            setValue={(selected) => setValue(toObjectNullable(selected))}
            options={availableOptions}
            setOptions={(nextOptions) => setOptions(nextOptions.map(toObject))}
            allowAdd={allowAdd}
            disabled={disabled}
        />
    );
}