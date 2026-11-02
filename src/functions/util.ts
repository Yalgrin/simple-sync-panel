import type {SxProps, Theme} from "@mui/material";

export function formatLocalDate(dateStr: string | undefined | null): string {
    if (!dateStr) {
        return "Never";
    }
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function formatPlaytime(playtime: number | undefined | null): string {
    if (!playtime) {
        return "Not played";
    }
    const playtimeNum = playtime || 0;
    const seconds = playtimeNum % 60;
    const minutes = Math.floor(playtimeNum / 60) % 60;
    const hours = Math.floor(playtimeNum / 3600);

    if (!hours && !minutes) {
        return `${seconds}s`;
    }

    let result = "";
    if (hours) {
        result += `${hours}h`;
    }
    if (minutes) {
        if (result.length) {
            result += " ";
        }
        result += `${minutes}m`;
    }

    return result;
}

export function formatInstallSize(installSize: number | undefined | null): string | null {
    if (installSize == null) {
        return null;
    }
    const units = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
    let size = installSize;
    let unitIndex = 0;

    while (Math.abs(size) >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${unitIndex === 0 ? size : size.toFixed(3)} ${units[unitIndex]}`;
}

function styleToArray(sx: SxProps<Theme> | undefined | null) {
    if (sx == null) {
        return [];
    }
    if (Array.isArray(sx)) {
        return sx;
    }
    return [sx];
}

export function mergeStyles(first: SxProps<Theme> | undefined | null, second: SxProps<Theme> | undefined | null): SxProps<Theme> {
    return [
        ...styleToArray(first),
        ...styleToArray(second)
    ]
}