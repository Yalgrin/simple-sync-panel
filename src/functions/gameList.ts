import type {TFunction} from "i18next";

export function getScoreGroupCode(name: string | undefined): string {
    if (!name || name == '10') {
        return 'NONE';
    }
    return 'O' + name + 'X';
}

export function translateScoreGroupName(t: TFunction<"translation", undefined>, code: string | undefined) {
    return t(`enums.ScoreGroup.${code ?? 'NONE'}`, {
        defaultValue: code
    });
}

export function getPastTimeSegmentCode(name: string | undefined): string {
    if (!name) {
        return 'NEVER';
    }
    if (name == '0') {
        return 'TODAY';
    } else if (name == '1') {
        return 'YESTERDAY';
    } else if (name == '2') {
        return 'PAST_WEEK';
    } else if (name == '3') {
        return 'PAST_MONTH';
    } else if (name == '4') {
        return 'PAST_YEAR';
    } else if (name == '5') {
        return 'MORE_THAN_YEAR';
    }
    return 'NEVER';
}

export function translatePastTimeSegmentName(t: TFunction<"translation", undefined>, code: string | undefined) {
    return t(`enums.PastTimeSegment.${code ?? 'NEVER'}`, {
        defaultValue: code
    });
}

export function getInstallSizeCode(name: string | undefined): string {
    if (!name) {
        return 'NONE';
    }

    if (name == '0') {
        return 'NONE';
    } else if (name == '1') {
        return 'S0_0MB_100MB';
    } else if (name == '2') {
        return 'S1_100MB_1GB';
    } else if (name == '3') {
        return 'S2_1GB_5GB';
    } else if (name == '4') {
        return 'S3_5GB_10GB';
    } else if (name == '5') {
        return 'S4_10GB_20GB';
    } else if (name == '6') {
        return 'S5_20GB_40GB';
    } else if (name == '7') {
        return 'S6_40GB_100GB';
    } else if (name == '8') {
        return 'S7_100GB_PLUS';
    } else {
        return 'NONE';
    }
}

export function translateInstallSizeName(t: TFunction<"translation", undefined>, code: string | undefined) {
    return t(`enums.InstallSizeGroup.${code ?? 'NONE'}`, {
        defaultValue: code
    });
}

export function getPlaytimeCategoryCode(name: string | undefined): string {
    if (!name) {
        return 'NOT_PLAYED';
    }

    if (name == '0') {
        return 'NOT_PLAYED';
    } else if (name == '1') {
        return 'LESS_THAN_HOUR';
    } else if (name == '2') {
        return 'O1_10';
    } else if (name == '3') {
        return 'O10_100';
    } else if (name == '4') {
        return 'O100_500';
    } else if (name == '5') {
        return 'O500_1000';
    } else if (name == '6') {
        return 'O1000_PLUS';
    } else {
        return 'NOT_PLAYED';
    }
}

export function translatePlaytimeCategoryName(t: TFunction<"translation", undefined>, code: string | undefined) {
    return t(`enums.PlaytimeCategory.${code ?? 'NOT_PLAYED'}`, {
        defaultValue: code
    });
}

export function translateInstalledName(t: TFunction<"translation", undefined>, code: string | undefined) {
    return t(`enums.InstallationStatus.${code ?? 'false'}`, {
        defaultValue: code
    });
}