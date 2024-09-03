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
    return res.json()
}

export async function update_ticket(id: number, tags: string): Promise<any> {
    const res = await fetch(api_url + "/bugs?id=eq." + id, {
        method: "PATCH",
        headers: {
            "apikey": anon_key
        },
        body: JSON.stringify({
            tags
        })
    })
    if (res.status !== 200) {
        return {}
    }
    return res.json()
}