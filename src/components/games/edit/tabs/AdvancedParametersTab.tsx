import type {PanelGameDTO} from "../../../../models/objects.ts";
import {DateTimeControl} from "../../../common/form-controls/DateTimeControl.tsx";
import {TextControl} from "../../../common/form-controls/TextControl.tsx";
import {TimePlayedControl} from "../../../common/form-controls/TimePlayedControl.tsx";
import {NumericControl} from "../../../common/form-controls/NumericControl.tsx";
import {Box} from "@mui/material";
import {CheckboxControl} from "../../../common/form-controls/CheckboxControl.tsx";
import {LargeTextControl} from "../../../common/form-controls/LargeTextControl.tsx";
import {useTranslation} from "react-i18next";

export interface AdvancedParametersTabProps {
    values: PanelGameDTO;
    setValues: (value: PanelGameDTO) => void;
}

export function AdvancedParametersTab({
                                          values,
                                          setValues,
                                      }: Readonly<AdvancedParametersTabProps>) {
    const {t} = useTranslation();
    return <>
        <DateTimeControl
            name={t("game.edit.lastPlayed")}
            value={values.lastActivity ?? ""}
            setValue={(value) => setValues({...values, lastActivity: value})}
        />
        <TextControl
            name={t("game.edit.gameId")}
            value={values.gameId ?? ""}
            setValue={() => {
            }}
            disabled={true}
        />
        <TimePlayedControl
            name={t("game.edit.timePlayed")}
            value={values.playtime}
            setValue={(value) => setValues({...values, playtime: value})}
        />
        <TextControl
            name={t("game.edit.databaseId")}
            value={values.playniteId ?? ""}
            setValue={() => {
            }}
            disabled={true}
        />
        <NumericControl
            name={t("game.edit.playCount")}
            value={values.playCount}
            setValue={(value) => setValues({...values, playCount: value})}
        />
        <TextControl
            name={t("game.edit.library")}
            value={values.plugin?.name ?? "Playnite"}
            setValue={() => {
            }}
            disabled={true}
        />
        <TextControl
            name={t("game.edit.version")}
            value={values.version ?? ""}
            setValue={(value) => setValues({...values, version: value})}
        />
        <Box/>
        <TextControl
            name={t("game.edit.manual")}
            value={values.manual ?? ""}
            setValue={(value) => setValues({...values, manual: value})}
        />
        <Box/>
        <CheckboxControl
            name={t("game.edit.hidden")}
            value={values.isHidden ?? false}
            setValue={(value) => setValues({...values, isHidden: value})}
        />
        <CheckboxControl
            name={t("game.edit.favorite")}
            value={values.isFavorite ?? false}
            setValue={(value) => setValues({...values, isFavorite: value})}
        />
        <DateTimeControl
            name={t("game.edit.added")}
            value={values.added ?? ""}
            setValue={(value) => setValues({...values, added: value})}
        />
        <DateTimeControl
            name={t("game.edit.modified")}
            value={values.modified ?? ""}
            setValue={(value) => setValues({...values, modified: value})}
            disabled={true}
        />
        <LargeTextControl
            name={t("game.edit.notes")}
            value={values.notes ?? ""}
            setValue={(value) => setValues({...values, notes: value})}
        />
    </>;
}