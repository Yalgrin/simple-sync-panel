import type {
    PanelAgeRatingDTO,
    PanelCategoryDTO,
    PanelCompanyDTO,
    PanelCompletionStatusDTO,
    PanelFeatureDTO,
    PanelGameDTO,
    PanelGenreDTO,
    PanelPlatformDTO,
    PanelRegionDTO,
    PanelSeriesDTO,
    PanelSourceDTO,
    PanelTagDTO
} from "../../../../models/objects.ts";
import {TextControl} from "../../../common/form-controls/TextControl.tsx";
import {DateControl} from "../../../common/form-controls/DateControl.tsx";
import {MultipleObjectControl} from "../../../common/form-controls/MultipleObjectControl.tsx";
import {SingleObjectControl} from "../../../common/form-controls/SingleObjectControl.tsx";
import {ScoreControl} from "../../../common/form-controls/ScoreControl.tsx";
import {LargeTextControl} from "../../../common/form-controls/LargeTextControl.tsx";
import {useTranslation} from "react-i18next";

export interface MainParametersTabProps {
    values: PanelGameDTO;
    setValues: (value: PanelGameDTO) => void;
    optionsSeries: PanelSeriesDTO[];
    setOptionsSeries: (value: PanelSeriesDTO[]) => void;
    optionsPlatforms: PanelPlatformDTO[];
    setOptionsPlatforms: (value: PanelPlatformDTO[]) => void;
    optionsAgeRatings: PanelAgeRatingDTO[];
    setOptionsAgeRatings: (value: PanelAgeRatingDTO[]) => void;
    optionsGenres: PanelGenreDTO[];
    setOptionsGenres: (value: PanelGenreDTO[]) => void;
    optionsRegions: PanelRegionDTO[];
    setOptionsRegions: (value: PanelRegionDTO[]) => void;
    optionsCompanies: PanelCompanyDTO[];
    setOptionsCompanies: (value: PanelCompanyDTO[]) => void;
    optionsSources: PanelSourceDTO[];
    setOptionsSources: (value: PanelSourceDTO[]) => void;
    optionsCompletionStatuses: PanelCompletionStatusDTO[];
    setOptionsCompletionStatuses: (value: PanelCompletionStatusDTO[]) => void;
    optionsCategories: PanelCategoryDTO[];
    setOptionsCategories: (value: PanelCategoryDTO[]) => void;
    optionsFeatures: PanelFeatureDTO[];
    setOptionsFeatures: (value: PanelFeatureDTO[]) => void;
    optionsTags: PanelTagDTO[];
    setOptionsTags: (value: PanelTagDTO[]) => void;
}

export function MainParametersTab({
                                      values,
                                      setValues,
                                      optionsSeries,
                                      setOptionsSeries,
                                      optionsPlatforms,
                                      setOptionsPlatforms,
                                      optionsAgeRatings,
                                      setOptionsAgeRatings,
                                      optionsGenres,
                                      setOptionsGenres,
                                      optionsRegions,
                                      setOptionsRegions,
                                      optionsCompanies,
                                      setOptionsCompanies,
                                      optionsSources,
                                      setOptionsSources,
                                      optionsCompletionStatuses,
                                      setOptionsCompletionStatuses,
                                      optionsCategories,
                                      setOptionsCategories,
                                      optionsFeatures,
                                      setOptionsFeatures,
                                      optionsTags,
                                      setOptionsTags,
                                  }: Readonly<MainParametersTabProps>) {
    const {t} = useTranslation();

    return <>
        <TextControl
            name={t("game.edit.name")}
            value={values.name ?? ""}
            setValue={(value) => setValues({...values, name: value})}
        />
        <DateControl
            name={t("game.edit.releaseDate")}
            value={values.releaseDate ?? ""}
            setValue={(value) => setValues({...values, releaseDate: value})}
        />
        <TextControl
            name={t("game.edit.sortingName")}
            value={values.sortingName ?? ""}
            setValue={(value) => setValues({...values, sortingName: value})}
        />
        <MultipleObjectControl
            name={t("game.edit.series")}
            value={values.series ?? []}
            setValue={(value) => setValues({...values, series: value})}
            options={optionsSeries ?? []}
            setOptions={setOptionsSeries}
            allowAdd={true}
        />
        <MultipleObjectControl
            name={t("game.edit.platform")}
            value={values.platforms ?? []}
            setValue={(value) => setValues({...values, platforms: value})}
            options={optionsPlatforms ?? []}
            setOptions={setOptionsPlatforms}
            allowAdd={true}
        />
        <MultipleObjectControl
            name={t("game.edit.ageRating")}
            value={values.ageRatings ?? []}
            setValue={(value) => setValues({...values, ageRatings: value})}
            options={optionsAgeRatings ?? []}
            setOptions={setOptionsAgeRatings}
            allowAdd={true}
        />
        <MultipleObjectControl
            name={t("game.edit.genres")}
            value={values.genres ?? []}
            setValue={(value) => setValues({...values, genres: value})}
            options={optionsGenres ?? []}
            setOptions={setOptionsGenres}
            allowAdd={true}
        />
        <MultipleObjectControl
            name={t("game.edit.region")}
            value={values.regions ?? []}
            setValue={(value) => setValues({...values, regions: value})}
            options={optionsRegions ?? []}
            setOptions={setOptionsRegions}
            allowAdd={true}
        />
        <MultipleObjectControl
            name={t("game.edit.developers")}
            value={values.developers ?? []}
            setValue={(value) => setValues({...values, developers: value})}
            options={optionsCompanies ?? []}
            setOptions={setOptionsCompanies}
            allowAdd={true}
        />
        <SingleObjectControl
            name={t("game.edit.source")}
            value={values.source}
            setValue={(value) => setValues({...values, source: value})}
            options={optionsSources ?? []}
            setOptions={setOptionsSources}
            allowAdd={true}
        />
        <MultipleObjectControl
            name={t("game.edit.publishers")}
            value={values.publishers ?? []}
            setValue={(value) => setValues({...values, publishers: value})}
            options={optionsCompanies ?? []}
            setOptions={setOptionsCompanies}
            allowAdd={true}
        />
        <SingleObjectControl
            name={t("game.edit.completionStatus")}
            value={values.completionStatus}
            setValue={(value) => setValues({...values, completionStatus: value})}
            options={optionsCompletionStatuses ?? []}
            setOptions={setOptionsCompletionStatuses}
            allowAdd={true}
        />
        <MultipleObjectControl
            name={t("game.edit.categories")}
            value={values.categories ?? []}
            setValue={(value) => setValues({...values, categories: value})}
            options={optionsCategories ?? []}
            setOptions={setOptionsCategories}
            allowAdd={true}
        />
        <ScoreControl
            name={t("game.edit.userScore")}
            value={values.userScore}
            setValue={(value) => setValues({...values, userScore: value})}
        />
        <MultipleObjectControl
            name={t("game.edit.features")}
            value={values.features ?? []}
            setValue={(value) => setValues({...values, features: value})}
            options={optionsFeatures ?? []}
            setOptions={setOptionsFeatures}
            allowAdd={true}
        />
        <ScoreControl
            name={t("game.edit.criticScore")}
            value={values.criticScore}
            setValue={(value) => setValues({...values, criticScore: value})}
        />
        <MultipleObjectControl
            name={t("game.edit.tags")}
            value={values.tags ?? []}
            setValue={(value) => setValues({...values, tags: value})}
            options={optionsTags ?? []}
            setOptions={setOptionsTags}
            allowAdd={true}
        />
        <ScoreControl
            name={t("game.edit.communityScore")}
            value={values.communityScore}
            setValue={(value) => setValues({...values, communityScore: value})}
        />
        <LargeTextControl
            name={t("game.edit.description")}
            value={values.description ?? ""}
            setValue={(value) => setValues({...values, description: value})}
        />
    </>;
}