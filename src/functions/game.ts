import type {PanelGameDTO, PanelObjectDTO} from "../models/objects.ts";

export const sameValue = (left: unknown, right: unknown): boolean => {
    if (Object.is(left, right)) return true;

    if (Array.isArray(left) || Array.isArray(right)) {
        if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
            return false;
        }

        const unmatched = [...right];
        return left.every((item) => {
            const index = unmatched.findIndex((candidate) => sameValue(item, candidate));
            if (index === -1) return false;
            unmatched.splice(index, 1);
            return true;
        });
    }

    if (left === null || right === null ||
        typeof left !== "object" || typeof right !== "object") {
        return false;
    }

    const a = left as Record<string, unknown>;
    const b = right as Record<string, unknown>;

    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    return [...keys].every((key) => sameValue(a[key], b[key]));
};

export const sameObject = (left: PanelObjectDTO | null | undefined,
                           right: PanelObjectDTO | null | undefined): boolean => {
    if (left == null || right == null) return left == null && right == null;
    if (left.id != null || right.id != null) return left.id === right.id;
    if (left.playniteId != null || right.playniteId != null) {
        return left.playniteId === right.playniteId;
    }
    return left.name === right.name;
};

export const hasGameNotBeenChanged = (left: PanelGameDTO, right: PanelGameDTO): boolean => {
    const objectFields = new Set<keyof PanelGameDTO>([
        "plugin", "source", "completionStatus", "series", "platforms",
        "ageRatings", "genres", "regions", "developers", "publishers",
        "categories", "features", "tags",
    ]);

    const a = left as unknown as Record<string, unknown>;
    const b = right as unknown as Record<string, unknown>;
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);

    return [...keys].every((key) => {
        if (!objectFields.has(key as keyof PanelGameDTO)) {
            return sameValue(a[key], b[key]);
        }

        const first = a[key] as PanelObjectDTO | PanelObjectDTO[] | null | undefined;
        const second = b[key] as PanelObjectDTO | PanelObjectDTO[] | null | undefined;
        if (Array.isArray(first) || Array.isArray(second)) {
            if (!Array.isArray(first) || !Array.isArray(second) ||
                first.length !== second.length) return false;

            const unmatched = [...second];
            return first.every((item) => {
                const index = unmatched.findIndex((candidate) => sameObject(item, candidate));
                if (index === -1) return false;
                unmatched.splice(index, 1);
                return true;
            });
        }
        return sameObject(first, second);
    });
};