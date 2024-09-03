import { get_tickets } from "$lib/supabaseapi"

export async function load() {
    const tickets = await get_tickets()
    return { tickets }
}