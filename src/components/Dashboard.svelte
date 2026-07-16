<script>
    import { onMount } from "svelte";
    import auth from "../js/auth.svelte.ts";
    import ReviewCard from "./ReviewCard.svelte";

    onMount(() => {
        auth.checkAuth();
    });   

    console.log($state.snapshot(auth.userStore.user));

</script>

<main>
    <h1>Hello {auth.userStore.user.username} </h1>

    {#if auth.userStore.user.userType == "Admin"}
        <h2>Admin Dashboard</h2>
    {:else}
        <h2>Student Dashboard</h2>
    {/if}

    <div class="reviews">
        <h3>Reviews</h3>
        <div class="review-card">
            
        </div>

       
    </div>

    <div class="user-info">
        <div class="info-card">
            <h3>User Information</h3>
            <p>Name: {auth.userStore.user?.name}</p>
            <p>Email: {auth.userStore.user?.email}</p>
            <p>Major: {auth.userStore.user?.major}</p>
            <p>Username: {auth.userStore.user?.username}</p>
            <p>User Type: {auth.userStore.user?.userType}</p>
        </div>
    </div>



</main>