<script lang="ts">
console.log("ReviewsByCourse loaded");
    import { onMount } from "svelte";
    import { getReviews } from "../js/reviews/reviewData.mjs";
    import type { Course, Review } from "../js/types.mts";
    import ReviewCard from "./ReviewCard.svelte";
    import { getCourseById } from "../js/courseData.mts";
    
    let reviews:Review[] = $state([]);
    let courseName:string = $state("");
    // let selectedProduct:Product | null = $state(null);

    interface Props {
      courseId: string;
    }

    let { courseId }: Props = $props();

    async function init() {
      const data = await getReviews("course", courseId);
      console.log(data);
      reviews = data;
      courseName = data[0].courseName;
      
    }
  
    onMount(init);
  
  </script>
  
  <div id="product-list-controls">
    <h2>Reviews: {courseName}</h2>
    
  </div>
  
  <ul class="review-list">
    {#each reviews as review}
      <ReviewCard {review}/> 
    {/each}
  </ul>
  
  <style>
  
    #product-list-controls {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    
    }
  </style>