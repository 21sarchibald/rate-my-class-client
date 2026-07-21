<script lang="ts">

        import { onMount } from "svelte";
        import { getReviews } from "../js/reviews/reviewData.mjs";
        import type { Review } from "../js/types.mts";
        import ReviewCard from "./ReviewCard.svelte";
        import { getParam } from "../js/utils.mts";
        import { getClassRating } from "../js/reviews/reviewData.mjs";
        
        let reviews:Review[] = $state([]);
        let courseId = $state(""); 
        let professorName = $state(""); 
        let queryParam = $state("");
        let numReviews = $state();
        let courseCode = $state("");
        let totalRating = $state();
    
        async function init() {

          courseId = getParam("courseId") || "";
          professorName = getParam("professor") || "";

          if (courseId != "") {
              const data = await getReviews("courseId", courseId);
              reviews = data;
              courseCode = data[0].courseCode;
              queryParam = data[0].courseName;
              totalRating = await getClassRating(courseCode);
          }

          else if (professorName != "") {
            const data = await getReviews("professor", professorName);
            reviews = data;
            queryParam = data[0].professor;
          }
          
          else {
            queryParam = "No reviews";
          }
          numReviews = reviews.length;

          
        }
      
        onMount(() => {
            init();
        });
      
      </script>
  <div class="hero-banner">
      <div class="hero-info">
        <p class="rating"><strong>{totalRating}</strong>/5</p>
        <div class="title">
          <h1>{queryParam}</h1>
          <h3>{courseCode}</h3>
          <p>{numReviews} reviews</p>
        </div>
      </div>
      <img src="chatgpt-uni.png" alt="Illustration of a university from chatgpt">

    </div>
      <ul class="review-list">
        {#each reviews as review}
          <ReviewCard {review}/> 
        {/each}
      </ul>
      
<style>
    .hero-banner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: 0 3rem;
      padding: 0;
      padding-top: 1rem;
      border-bottom: 1px solid var(--secondary-color);
    }
    .hero-info {
      display: grid;
      grid-template-columns: 1fr 3fr;
      margin-top: 1rem;
      grid-gap: 2rem;
    }
    .rating {
        background-color: var(--secondary-color);
        color: var(--light-grey);
        box-shadow: -1px 3px 5px 0px rgba(140, 130, 111, 0.586);
        border-radius: 50%;
        padding: 2rem 0.5rem;
        font-size: 40px;
        text-align: center;
        align-self: flex-start;
        margin: 0;
        margin-top: 1rem;
    }
    .title {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        padding-top: 1rem;
        h1 {
            margin: 0;
            padding: 0;
        }
        h3 {
          color: var(--secondary-color);
        }
        p {
            margin:  0;
            font-size: smaller;
        }
    }
    img {
        max-width: 100%;
        padding: 0;
        text-align: right;
    }
    /* #product-list-controls {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    
    } */
      </style>