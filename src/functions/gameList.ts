function getScoreGroupCode(name: string | undefined): string {
    if (!name || name == '10') {
        return 'NONE';
    }
    return 'O' + name + 'X';
}

//TODO actual translations
export function translateScoreGroupName(name: string | undefined) {
    const code = getScoreGroupCode(name);
    if (!code || code === 'NONE') {
        return '(None)';
    }
    if (/^O(\d)X$/.test(code)) {
        return `${code[1]}x`;
    }
    return name;
}

function getPastTimeSegmentCode(name: string | undefined): string {
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

export function translatePastTimeSegmentName(name: string | undefined) {
    const code = getPastTimeSegmentCode(name);
    if (code == 'TODAY') {
        return "Today";
    } else if (code == 'YESTERDAY') {
        return "Yesterday";
    } else if (code == 'PAST_WEEK') {
        return "In past 7 days";
    } else if (code == 'PAST_MONTH') {
        return "In past 31 days";
    } else if (code == 'PAST_YEAR') {
        return "In past 365 days";
    } else if (code == 'MORE_THAN_YEAR') {
        return "More than 365 days ago";
    }
    return "Never";
}

function getInstallSizeCode(name: string | undefined): string {
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

export function translateInstallSizeName(name: string | undefined) {
    const code = getInstallSizeCode(name);
    if (code == 'S0_0MB_100MB') {
        return "0 to 100MB";
    } else if (code == 'S1_100MB_1GB') {
        return "100MB to 1GB";
    } else if (code == 'S2_1GB_5GB') {
        return "1GB to 5GB";
    } else if (code == 'S3_5GB_10GB') {
        return "5GB to 10GB";
    } else if (code == 'S4_10GB_20GB') {
        return "10GB to 20GB";
    } else if (code == 'S5_20GB_40GB') {
        return "20GB to 40GB";
    } else if (code == 'S6_40GB_100GB') {
        return "40GB to 100GB";
    } else if (code == 'S7_100GB_PLUS') {
        return "100GB or more";
    }
    return "None";
}

function getPlaytimeCategoryCode(name: string | undefined): string {
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

export function translatePlaytimeCategoryName(name: string | undefined) {
    const code = getPlaytimeCategoryCode(name);
    if (code == 'LESS_THAN_HOUR') {
        return "Less than an hour";
    } else if (code == 'O1_10') {
        return "1 do 10 hours";
    } else if (code == 'O10_100') {
        return "10 to 100 hours";
    } else if (code == 'O100_500') {
        return "100 to 500 hours";
    } else if (code == 'O500_1000') {
        return "500 to 1000 hours";
    } else if (code == 'O1000_PLUS') {
        return "1000 hours or more";
    }
    return "Not played";
}