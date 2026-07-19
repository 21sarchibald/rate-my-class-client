<!-- 
 1. TO-DO: Trending Classes = classes with the most reviews
 2. TO-DO: Add logic to get the total number of reviews
  -->

<script lang="ts">
  import { onMount } from "svelte";
    import { getCourseById } from "../js/courseData.mts";
    import { getReviews } from "../js/reviews/reviewData.mjs";
    import type { Review } from "../js/types.mjs";
  import ReviewCard from "./ReviewCard.svelte";

    let reviews:Review[] = $state([]);

    async function getTopRatedClasses() {
        let ratings = ["5", "4", "3", "2", "1"];
        let seenCourses:string[] = [];

        for (const r of ratings) {
            const data = await getReviews("rating", r);
            if (data.length >= 1) {
                for (const d of data) {
                    if (!seenCourses.includes(d.courseCode)) {
                        reviews.push(d);
                        seenCourses.push(d.courseCode);
                    }
                    if (reviews.length == 3) {
                        return;
                    }
                }

            } 
        };
        
    }
    
    
        onMount(async () => {
            await getTopRatedClasses();
        })
</script>


<div class="class-card">
    <h2>Trending Classes</h2>
    <div class="review-cards">
        {#each reviews as review}
            <div class="course-info">
                <p class="rating"><strong>{review.rating}</strong>/5</p>
                <div class="class">
                    <h3>{review.courseName}</h3>
                    <p><strong>Professor </strong> {review.professor}</p>
                    <p>3,000 reviews</p>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>

    .review-cards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin: 3rem;
        grid-gap: 1rem;
        
    }
    .course-info {
        display: grid;
        grid-template-columns: 1fr 2fr;
        background-color: var(--tertiary-color);
        color: var(--secondary-color);
        border-radius: 20px;
        padding: 1rem;
        align-items: center;
        box-shadow: -1px 3px 5px 0px rgba(128, 128, 128, 0.149);
        .class {
            text-align: center;
        }
        .rating {
            background-color: var(--secondary-color);
            color: var(--light-grey);
            box-shadow: -1px 3px 5px 0px rgba(140, 130, 111, 0.586);
            border-radius: 50%;
            padding: 2rem 0.5rem;
            font-size: 40px;
            text-align: center;
            align-self: center;
            margin-left: 0;
            margin-right: 0.5rem;
        }
    }
</style>