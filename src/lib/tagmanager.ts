export enum Tags {
    BUG,
    IDEA,
    OTHER,
    TYPEWRITER,
    CHECKLIST,
    COMPASS,
    HOURGLASS
}

export function parseTags(tags: string): Tags[] {
    if (tags === null) return []
    if (tags === undefined) return []
    if (tags === "") return []

    return tags.split(",").map((tag) => {
        if (tag === "BUG") return Tags.BUG
        if (tag === "IDEA") return Tags.IDEA
        if (tag === "OTHER") return Tags.OTHER
        if (tag === "TYPEWRITER") return Tags.TYPEWRITER
        if (tag === "CHECKLIST") return Tags.CHECKLIST
        if (tag === "COMPASS") return Tags.COMPASS
        if (tag === "HOURGLASS") return Tags.HOURGLASS
        return Tags.OTHER
    })
}

export function stringifyTags(tags: Tags[]): string {
    return tags.map((tag) => {
        if (tag === Tags.BUG) return "BUG"
        if (tag === Tags.IDEA) return "IDEA"
        if (tag === Tags.OTHER) return "OTHER"
        if (tag === Tags.TYPEWRITER) return "TYPEWRITER"
        if (tag === Tags.CHECKLIST) return "CHECKLIST"
        if (tag === Tags.COMPASS) return "COMPASS"
        if (tag === Tags.HOURGLASS) return "HOURGLASS"
        return "OTHER"
    }).join(",")
}