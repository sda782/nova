import type { ticket_data } from "./supabaseapi";

export enum Tags {
    BUG,
    IDEA,
    OTHER,
    TYPEWRITER,
    CHECKLIST,
    COMPASS,
    HOURGLASS
}
export function get_tags() {
    return Object
        .keys(Tags)
        .filter((v) => isNaN(Number(v)))
}
export function get_tags_index(): number[] {
    return Object
        .keys(Tags)
        .map(Number)
        .filter((v) => !isNaN(v));
}

export function get_tag_index(tag: string): number {

    return get_tags().indexOf(tag);
}

export function parseTags(tags: string): Tags[] {
    if (tags === null) return []
    if (tags === undefined) return []
    if (tags === "") return []
    let tagsList = tags.split(",")
    tagsList = uniq(tagsList)
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

function uniq(a: string[]) {
    var seen: any = {};
    return a.filter(function (item: string) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

export function countTags(tickets: Array<ticket_data>) {
    const tagCount: any = {};

    Object.keys(Tags).forEach((key: string) => {
        if (!isNaN(Number(key))) {
            tagCount[Tags[(key as any)]] = 0;
        }
    });

    tickets.forEach((ticket: ticket_data) => {
        ticket.formattted_tags.forEach((tag: Tags) => {
            tagCount[Tags[(tag as any)]]++;
        });
    });
    return Object.entries(tagCount).map(([tag, count]) => ({
        tag,
        count
    }));

}