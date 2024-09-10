import { parseTags, stringifyTags, Tags } from "./tagmanager"

const api_url = "https://uwsxrqazwmqdynzhovqf.supabase.co/rest/v1"
const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3c3hycWF6d21xZHluemhvdnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2MzYyOTQsImV4cCI6MjAzMTIxMjI5NH0.nmJxwHjCuwniqK3SlrYn6A1cHo270E2ipXnyVrEwKvA"

export async function get_tickets(): Promise<any> {
    const res = await fetch(api_url + "/bugs", {
        headers: {
            "apikey": anon_key
        }
    })
    if (res.status !== 200) {
        return {}
    }
    var data = await res.json().then((d) => {
        return d.map((ticket: ticket_data_raw) => {
            return {
                id: ticket.id,
                created_at: ticket.created_at,
                report: ticket.report,
                formattted_tags: parseTags(ticket?.tags)
            }
        });
    })
    return data

}

export async function update_ticket_tags(ticket: ticket_data): Promise<any> {
    const res = await fetch(api_url + "/bugs?id=eq." + ticket.id, {
        method: "PATCH",

        headers: {
            "apikey": anon_key,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "tags": stringifyTags(ticket.formattted_tags)
        })
    })
    if (res.status !== 200) {
        return {}
    }
    return res.json()
}


export type ticket_data_raw = { id: number, created_at: string, report: string, tags: string }
export type ticket_data = { id: number, created_at: string, report: string, formattted_tags: Array<Tags> }