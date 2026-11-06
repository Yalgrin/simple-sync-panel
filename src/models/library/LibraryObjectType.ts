import type {ComponentType} from "react";
import {LibraryPluginListPane} from "../../components/library/objects/LibraryPluginListPane.tsx";
import {LibraryPlatformListPane} from "../../components/library/objects/LibraryPlatformListPane.tsx";
import {LibraryCategoryListPane} from "../../components/library/objects/LibraryCategoryListPane.tsx";
import {LibraryGenreListPane} from "../../components/library/objects/LibraryGenreListPane.tsx";
import {LibraryCompanyListPane} from "../../components/library/objects/LibraryCompanyListPane.tsx";
import {LibraryFeatureListPane} from "../../components/library/objects/LibraryFeatureListPane.tsx";
import {LibraryTagListPane} from "../../components/library/objects/LibraryTagListPane.tsx";
import {LibrarySeriesListPane} from "../../components/library/objects/LibrarySeriesListPane.tsx";
import {LibraryAgeRatingListPane} from "../../components/library/objects/LibraryAgeRatingListPane.tsx";
import {LibraryRegionListPane} from "../../components/library/objects/LibraryRegionListPane.tsx";
import {LibrarySourceListPane} from "../../components/library/objects/LibrarySourceListPane.tsx";
import {LibraryCompletionStatusListPane} from "../../components/library/objects/LibraryCompletionStatusListPane.tsx";
import {LibraryFilterPresetListPane} from "../../components/library/objects/LibraryFilterPresetListPane.tsx";

export interface LibraryObjectType {
    id: string;
    name: string;
    path: string;
    component: ComponentType;
}

export const LIBRARY_OBJECT_TYPES: LibraryObjectType[] = [
    {
        id: "platform",
        name: "Platforms",
        path: "/library/platform",
        component: LibraryPlatformListPane,
    },
    {
        id: "category",
        name: "Categories",
        path: "/library/category",
        component: LibraryCategoryListPane,
    },
    {
        id: "genre",
        name: "Genres",
        path: "/library/genre",
        component: LibraryGenreListPane,
    },
    {
        id: "company",
        name: "Companies",
        path: "/library/company",
        component: LibraryCompanyListPane,
    },
    {
        id: "feature",
        name: "Features",
        path: "/library/feature",
        component: LibraryFeatureListPane,
    },
    {
        id: "tag",
        name: "Tags",
        path: "/library/tag",
        component: LibraryTagListPane,
    },
    {
        id: "series",
        name: "Series",
        path: "/library/series",
        component: LibrarySeriesListPane,
    },
    {
        id: "age-rating",
        name: "Age ratings",
        path: "/library/age-rating",
        component: LibraryAgeRatingListPane,
    },
    {
        id: "region",
        name: "Regions",
        path: "/library/region",
        component: LibraryRegionListPane,
    },
    {
        id: "source",
        name: "Sources",
        path: "/library/source",
        component: LibrarySourceListPane,
    },
    {
        id: "completion-status",
        name: "Completion statuses",
        path: "/library/completion-status",
        component: LibraryCompletionStatusListPane,
    },
    {
        id: "filter-preset",
        name: "Filter presets",
        path: "/library/filter-preset",
        component: LibraryFilterPresetListPane,
    },
    {
        id: "library-plugin",
        name: "Library plugins",
        path: "/library/library-plugin",
        component: LibraryPluginListPane,
    },
];