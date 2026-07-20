<script lang=ts>
    import { onMount } from "svelte";
    import auth from "../js/auth.svelte.ts";
    import ReviewCard from "./ReviewCard.svelte";
    import { getReviews } from "../js/reviews/reviewData.mts";
    import type { Review } from "../js/types.mts";

    let reviews:Review[] = $state([]);

    onMount(async () => {
        auth.checkAuth();

        const allReviews = await getReviews();

        console.log(allReviews);

        if (auth.userStore.user?.userType === "Admin") {
            reviews = allReviews;
        } else {
            reviews = allReviews.filter(
                (review:Review) => review.userId.toString() === auth.userStore.user?._id
            );
        }
    });
    console.log($state.snapshot(auth.userStore.user));

</script>

<main>
    <h1>Hello {auth.userStore.user?.name} </h1>

    {#if auth.userStore.user?.userType == "Admin"}
        <h2>Admin Dashboard</h2>
    {:else}
        <h2>Student Dashboard</h2>
    {/if}

    <div class="reviews">
        <h3>Reviews</h3>
        <div class="review-card">
            {#each reviews as review}
                <ReviewCard {review} />
            {/each}
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