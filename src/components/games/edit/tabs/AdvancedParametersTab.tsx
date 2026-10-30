import type {PanelGameDTO} from "../../../../models/objects.ts";
import {DateTimeControl} from "../../../common/form-controls/DateTimeControl.tsx";
import {TextControl} from "../../../common/form-controls/TextControl.tsx";
import {TimePlayedControl} from "../../../common/form-controls/TimePlayedControl.tsx";
import {NumericControl} from "../../../common/form-controls/NumericControl.tsx";
import {Box} from "@mui/material";
import {CheckboxControl} from "../../../common/form-controls/CheckboxControl.tsx";
import {LargeTextControl} from "../../../common/form-controls/LargeTextControl.tsx";

export interface AdvancedParametersTabProps {
    values: PanelGameDTO;
    setValues: (value: PanelGameDTO) => void;
}

export function AdvancedParametersTab({
                                          values,
                                          setValues,
                                      }: Readonly<AdvancedParametersTabProps>) {
    return <>
        <DateTimeControl
            name="Last played"
            value={values.lastActivity ?? ""}
            setValue={(value) => setValues({...values, lastActivity: value})}
        />
        <TextControl
            name="Game id"
            value={values.gameId ?? ""}
            setValue={() => {
            }}
            disabled={true}
        />
        <TimePlayedControl
            name="Time played"
            value={values.playtime}
            setValue={(value) => setValues({...values, playtime: value})}
        />
        <TextControl
            name="Database id"
            value={values.playniteId ?? ""}
            setValue={() => {
            }}
            disabled={true}
        />
        <NumericControl
            name="Play count"
            value={values.playCount}
            setValue={(value) => setValues({...values, playCount: value})}
        />
        <TextControl
            name="Library"
            value={values.plugin?.name ?? "Playnite"}
            setValue={() => {
            }}
            disabled={true}
        />
        <TextControl
            name="Version"
            value={values.version ?? ""}
            setValue={(value) => setValues({...values, version: value})}
        />
        <Box/>
        <TextControl
            name="Manual"
            value={values.manual ?? ""}
            setValue={(value) => setValues({...values, manual: value})}
        />
        <Box/>
        <CheckboxControl
            name="Hidden"
            value={values.isHidden ?? false}
            setValue={(value) => setValues({...values, isHidden: value})}
        />
        <CheckboxControl
            name="Favorite"
            value={values.isFavorite ?? false}
            setValue={(value) => setValues({...values, isFavorite: value})}
        />
        <DateTimeControl
            name="Added"
            value={values.added ?? ""}
            setValue={(value) => setValues({...values, added: value})}
        />
        <DateTimeControl
            name="Modified"
            value={values.modified ?? ""}
            setValue={(value) => setValues({...values, modified: value})}
            disabled={true}
        />
        <LargeTextControl
            name="Notes"
            value={values.notes ?? ""}
            setValue={(value) => setValues({...values, notes: value})}
        />
    </>;
}