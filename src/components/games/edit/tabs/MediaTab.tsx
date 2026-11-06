import type {PanelGameDTO} from "../../../../models/objects.ts";
import {MediaControl} from "../MediaControl.tsx";
import {useTranslation} from "react-i18next";

export interface MediaTabProps {
    values: PanelGameDTO;
    setValues: (value: PanelGameDTO) => void;
    initialValues: PanelGameDTO;
    iconFile: File | null;
    setIconFile: (value: File | null) => void;
    coverImageFile: File | null;
    setCoverImageFile: (value: File | null) => void;
    backgroundImageFile: File | null;
    setBackgroundImageFile: (value: File | null) => void;
}

export function MediaTab({
                             values,
                             setValues,
                             initialValues,
                             iconFile,
                             setIconFile,
                             coverImageFile,
                             setCoverImageFile,
                             backgroundImageFile,
                             setBackgroundImageFile
                         }: Readonly<MediaTabProps>) {
    const {t} = useTranslation();
    return <>
        <MediaControl
            name={t("game.edit.media.icon")}
            initialUrl={initialValues.iconUrl}
            isSaving={values.isSavingIcon ?? false}
            setIsSaving={(value) => setValues({...values, isSavingIcon: value})}
            file={iconFile}
            setFile={setIconFile}
        />
        <MediaControl
            name={t("game.edit.media.coverImage")}
            initialUrl={initialValues.coverImageUrl}
            isSaving={values.isSavingCoverImage ?? false}
            setIsSaving={(value) => setValues({...values, isSavingCoverImage: value})}
            file={coverImageFile}
            setFile={setCoverImageFile}
        />
        <MediaControl
            name={t("game.edit.media.backgroundImage")}
            wideInput={true}
            initialUrl={initialValues.backgroundImageUrl}
            isSaving={values.isSavingBackgroundImage ?? false}
            setIsSaving={(value) => setValues({...values, isSavingBackgroundImage: value})}
            file={backgroundImageFile}
            setFile={setBackgroundImageFile}
        />
    </>;
}