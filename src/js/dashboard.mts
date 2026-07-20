import auth from "./auth.svelte.ts";

const baseURL = import.meta.env.PUBLIC_SERVER_URL;

export async function getUsers() {
    const response = await fetch(`${baseURL}users`, {
        headers: {
            Authorization: `Bearer ${auth.userStore.token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to retrieve users");
    }

    return await response.json();
}