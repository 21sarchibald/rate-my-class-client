<script lang="ts">
    import type { Review } from "../js/types.mts";
    import auth from "../js/auth.svelte.ts";
    import { onMount } from "svelte";
    import {deleteReview} from "../js/reviews.mts";

    interface Props {
      review: Review;
    }

    let { review }: Props = $props();
    let dateStamp = $state("");
    let difficulty = $state();

    onMount(async () => {
        auth.checkAuth();
        dateStamp = new Date(review.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        })
        difficulty = review.difficulty;
        if (!difficulty) {
            difficulty = "-";
        }
    });


    async function handleDelete() {
        try {
            await deleteReview(auth.userStore.token, review._id);

            // Refresh the page (simple solution)
            window.location.reload();

        } catch (err) {
            console.error(err);
        }
    }


</script>
<div class="review-card">
    <div class="review-card-left">
        <div class="review-detail">
            <label for="rating">Quality</label>
            <p id="rating">{review.rating}</p>
        </div>
        
        <div id="div-diff" class="review-detail">
            <label for="difficulty">Difficulty:</label>
            <p id="difficulty">{difficulty}</p>
        </div>
        <div class="delete-button">
            {#if auth.userStore.user?._id === review.userId.toString() || auth.userStore.user?.userType === "Admin"}
            <button onclick={() => handleDelete()}>Delete</button>
            {/if}
        </div>
    </div>
    <div class="review-main">

        <div class="title-date">
            <h4 class="course-code"><strong>{review.courseCode}</strong></h4>
            <div class="review-detail">
                <!-- <label for="date">Date:</label> -->
                <p id="date">{dateStamp}</p>
            </div>
        </div>
        <div class="course-data">
            <div class="review-detail">
                <label for="recommmend">Would Recommend:</label>
                <p id="recommend">{review.recommend ? "Yes" : "No"}</p>
            </div>
            
            <div class="review-detail">
                <label for="professor">Professor:</label>
                <p id="professor">{review.professor}</p>
            </div>
        
            <div class="review-detail">
                <label for="semester">Semester:</label>
                <p id="semester">{review.semester}</p>
            </div>
            <div class="review-detail">
                <label for="year">Year:</label>
                <p id="year">{review.year}</p>
            </div>
            <div class="review-detail">
                <label for="courseType">Course Type:</label>
                <p id="courseType">{review.type}</p>
            </div>
            <div class="review-detail">
                <label for="gradeReceived">Grade Received:</label>
                <p id="gradeReceived">{review.gradeReceived}</p>
            </div>
        </div>
        
        <p id="description">"{review.description}"</p>
        
        <div class="helpful">
            <div class="review-detail">
                <label for="likes"><img src="thumbs-up-svgrepo-com.svg" alt="Thumbs up"></label>
                <p id="likes">{review.likes}</p>
            </div>
            <div class="review-detail">
                <label for="dislikes"><img src="thumbs-down-svgrepo-com.svg" alt=""></label>
                <p id="dislikes">{review.dislikes}</p>
            </div>
        </div>
        
        
</div>
</div>

<style>
    .review-card {        
        display: grid;
        grid-template-columns: 1fr 4fr;
        gap: 1rem;
        max-width: 1000px;
        margin: 1.5rem auto;
        padding: 1.5rem;
        padding-top: 3rem;
        border: 1px solid #ccc;
        border-radius: 20px;
        box-shadow: -1px 3px 5px 0px rgba(128, 128, 128, 0.149);
        background-color: var(--tertiary-color);

        
    }
    label {
        display: flex;
        flex-direction: row;
    }
    p {
        font-weight: bold;
        margin-left: 0.5rem;
      font-size: 1rem;
      display: block;
    }
    .review-detail {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .review-card-left {
        div {
            flex-direction: column;
            margin: 1.7rem 0;
            p {
                background-color: var(--light-grey);
                padding: 2rem;
                border-radius: 8px;
            }
            p#rating {
                background-color: var(--secondary-color);
                color: var(--light-grey);
            }
        }
    }
    .review-main {
        display: flex;
        flex-direction: column;
        margin-right: 3.5rem;
        .title-date {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .course-code {
                text-align: left;
            }
        }
        .course-data {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            text-wrap-mode: nowrap;
            column-gap: 1rem;
        }
    }
    #description {
        font-weight: 100;
        margin-left: 0;
        font-size: large;
    }
    .helpful {
        display: flex;
        flex-direction: row;
        grid-gap: 2rem;
        align-items: center;
        margin-top: 2rem;
    }
    .helpful label img {
        width: 30px;
    }
    .helpful p {
        font-size: large;
    }

    button {
        background-color: #6ea7f8;
        color: #303030;
        border: none;
        border-radius: 1rem;
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        justify-self: center;
        &:hover{
            background-color: #486f9e;
            color: #f4f3f3;
        }

    }

  </style>