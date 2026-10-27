//TODO reconsider locales
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