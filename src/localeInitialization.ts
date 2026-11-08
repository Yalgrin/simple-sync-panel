const supportedLocales = {
    "en-us": {
        dayjs: "en",
        loadDayjs: () => import("dayjs/locale/en")
    },
    "en-gb": {
        dayjs: "en-gb",
        loadDayjs: () => import("dayjs/locale/en-gb")
    },
    "en-ca": {
        dayjs: "en-ca",
        loadDayjs: () => import("dayjs/locale/en-ca")
    },
    "en-au": {
        dayjs: "en-au",
        loadDayjs: () => import("dayjs/locale/en-au")
    },
    "pt-br": {
        dayjs: "pt-br",
        loadDayjs: () => import("dayjs/locale/pt-br")
    },
    "it-ch": {
        dayjs: "it-ch",
        loadDayjs: () => import("dayjs/locale/it-ch")
    },
    "es-mx": {
        dayjs: "es-mx",
        loadDayjs: () => import("dayjs/locale/es-mx")
    },
    "es-us": {
        dayjs: "es-us",
        loadDayjs: () => import("dayjs/locale/es-us")
    },
    "de-at": {
        dayjs: "de-at",
        loadDayjs: () => import("dayjs/locale/de-at")
    },
    "de-ch": {
        dayjs: "de-ch",
        loadDayjs: () => import("dayjs/locale/de-ch")
    },
    "fr-ca": {
        dayjs: "fr-ca",
        loadDayjs: () => import("dayjs/locale/fr-ca")
    },
    "fr-ch": {
        dayjs: "fr-ch",
        loadDayjs: () => import("dayjs/locale/fr-ch")
    },
    "nl-be": {
        dayjs: "nl-be",
        loadDayjs: () => import("dayjs/locale/nl-be")
    },
    en: {
        dayjs: "en",
        loadDayjs: () => import("dayjs/locale/en")
    },
    de: {
        dayjs: "de",
        loadDayjs: () => import("dayjs/locale/de")
    },
    fr: {
        dayjs: "fr",
        loadDayjs: () => import("dayjs/locale/fr")
    },
    it: {
        dayjs: "it",
        loadDayjs: () => import("dayjs/locale/it")
    },
    pl: {
        dayjs: "pl",
        loadDayjs: () => import("dayjs/locale/pl")
    },
    pt: {
        dayjs: "pt",
        loadDayjs: () => import("dayjs/locale/pt")
    },
    nl: {
        dayjs: "nl",
        loadDayjs: () => import("dayjs/locale/nl")
    },
    hu: {
        dayjs: "hu",
        loadDayjs: () => import("dayjs/locale/hu")
    },
    ru: {
        dayjs: "ru",
        loadDayjs: () => import("dayjs/locale/ru")
    },
    uk: {
        dayjs: "uk",
        loadDayjs: () => import("dayjs/locale/uk")
    },
    ja: {
        dayjs: "ja",
        loadDayjs: () => import("dayjs/locale/ja")
    },
    ko: {
        dayjs: "ko",
        loadDayjs: () => import("dayjs/locale/ko")
    },
    zh: {
        dayjs: "zh",
        loadDayjs: () => import("dayjs/locale/zh")
    },
    hi: {
        dayjs: "hi",
        loadDayjs: () => import("dayjs/locale/hi")
    },
    ar: {
        dayjs: "ar",
        loadDayjs: () => import("dayjs/locale/ar")
    },
} as const;

type SupportedLocale = keyof typeof supportedLocales;

function resolveLocale(preferences: readonly string[]): SupportedLocale {
    const supported = Object.keys(supportedLocales) as SupportedLocale[];

    for (const preference of preferences) {
        const normalized = preference.replaceAll("_", "-").toLowerCase();
        const exact = supported.find((locale) => locale.toLowerCase() === normalized);
        if (exact) return exact;

        const language = normalized.split("-")[0];
        const base = supported.find((locale) => locale.toLowerCase() === language);
        if (base) return base;

        const regional = supported.find(
            (locale) => locale.toLowerCase().startsWith(`${language}-`),
        );
        if (regional) return regional;
    }

    return "en";
}

export const selectedLocale = resolveLocale(
    navigator.languages?.length ? navigator.languages : [navigator.language],
);
export const localeConfig = supportedLocales[selectedLocale];

await localeConfig.loadDayjs();