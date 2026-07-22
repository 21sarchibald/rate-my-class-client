<!-- 
 1. TO-DO: Trending Classes = classes with the most reviews
 2. TO-DO: Add logic to get the total number of reviews
  -->

<script lang="ts">
    import { onMount } from "svelte";
    import { getCourseById, getAllCourses } from "../js/courseData.mts";
    import { getReviews, getReviewCountForCourse } from "../js/reviews/reviewData.mjs";
    import type { Review, Course } from "../js/types.mjs";
    import ReviewCard from "./ReviewCard.svelte";
    import { string } from "astro:schema";

    interface CourseData {
        courseCode: string,
        reviewCount: number,
        professor: string,
        rating: number,
        courseName: string
    }

    let nonduplicatedReviews:Review[] = $state([]);
    let reviews:Review[] = $state([]);
    let courses:Course[] = $state([]);
    let courseId = $state("");
    let reviewCount = $state(0);
    let count:CourseData[] = $state([]);
    
    async function trending() {
        const allReviews = await getReviews();
        const seenCourses: string[] = [];
        const trendingList: CourseData[] = [];

        for (const review of allReviews) {
            if (seenCourses.includes(review.courseCode)) continue;
            seenCourses.push(review.courseCode);
            const reviewCount = allReviews.filter((r:Review) => r.courseCode === review.courseCode).length;

            if (review) {
                trendingList.push({
                    courseCode: review.courseCode,
                    reviewCount: reviewCount,
                    professor: review.professor,
                    rating: review.rating,
                    courseName: review.courseName
                });
            }
        }

        count = trendingList.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    
        onMount(async () => {
            await trending();
        })
</script>


<div class="class-card">
    <h2>Trending Classes</h2>
    <div class="review-cards">
        {#each count.slice(0,3) as review}
            <div class="course-info">
                <p class="rating"><strong>{review.rating}</strong>/5</p>
                <div class="class">
                    <h3>{review.courseName}</h3>
                    <p><strong>Professor </strong> {review.professor}</p>
                    <p>{review.reviewCount} reviews</p>
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
        transition: 0.3s ease-in;
        &:hover {
            background-color: #cbc3b7;

        }
        .class {
            text-align: center;
            h3 {
                color: var(--secondary-color);
                &:hover {
                    text-decoration: underline;
                }
            }
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