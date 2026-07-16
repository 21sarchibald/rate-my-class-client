<script lang="ts">
    import { onMount } from "svelte";
    import auth from "../js/auth.svelte.ts";

    onMount(() => {
        auth.checkAuth();
    });

    function logout() {
        auth.logout();
        window.location.href = "/";
    }
</script>

<nav>
    {#if auth.userStore.isLoggedIn}
        <a href="/dashboard">Dashboard</a>
        <a href="/reviews/create">Create Reviews</a>
        <a href="/" onclick={logout}>Logout</a>

    {:else}
        <a href="/login">Login</a>
        <a href="/signup">Sign Up</a>
    {/if}
</nav>