<script lang=ts>
    import { onMount } from "svelte";
    import auth from "../js/auth.svelte.ts";
    import ReviewCard from "./ReviewCard.svelte";
    import { getReviews } from "../js/reviews/reviewData.mts";
    import type { Review, PublicUser } from "../js/types.mts";
    import { getUsers } from "../js/dashboard.mts";

    let reviews:Review[] = $state([]);
    let users:PublicUser[] = $state([]);

    onMount(async () => {
        auth.checkAuth();

        const allReviews = await getReviews();

        console.log(allReviews);

        if (auth.userStore.user?.userType === "Admin") {
            reviews = allReviews;

            users = await getUsers();
            console.log(users);
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
    <div class="content">
        <div class="reviews">
            <h3>Reviews</h3>
            <a href="/reviews/create">Create Review</a>
            <div class="review-card">
                {#each reviews as review}
                    <ReviewCard {review} />
                {/each}
            </div>

        
        </div>

        <div class="user-info">
            <h3>User Information</h3>
            <div class="info-card">
                <p>Name: {auth.userStore.user?.name}</p>
                <p>Email: {auth.userStore.user?.email}</p>
                <p>Major: {auth.userStore.user?.major}</p>
                <p>Username: {auth.userStore.user?.username}</p>
                <p>User Type: {auth.userStore.user?.userType}</p>
            </div>
            {#if auth.userStore.user?.userType === "Admin"}

                <div class="users">
                    <h3>All Users</h3>

                    {#each users as user}

                        <div class="user-card">
                            <p>Name: <strong>{user.name}</strong></p>
                            <p>Email: <strong>{user.email}</strong></p>
                            <p>Major: <strong>{user.major}</strong></p>
                            <p>Username: <strong>{user.username}</strong></p>
                            <p>Role: <strong>{user.userType}</strong></p>
                        </div>

                    {/each}
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    h1 {
        text-align: center;
    }
    .reviews a {
        color: var(--secondary-color);
    }
    .content{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        max-width: 1200px;
        margin: 2rem auto;
        padding: 2rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: var(--light-grey);

        .user-info{
            .info-card{
                padding: 1rem;
                border: 1px solid #ccc;
                border-radius: 8px;
                background-color: var(--secondary-color);
                color: var(--light-grey);
            }
            .users{
                margin-top: 2rem;
                .user-card{
                    padding: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    margin-bottom: 1rem;
                }
            }
            
        }
    }

</style>