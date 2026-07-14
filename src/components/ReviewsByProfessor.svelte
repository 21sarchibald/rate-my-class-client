<script lang="ts">
    console.log("ReviewsByCourse loaded");
        import { onMount } from "svelte";
        import { getReviews } from "../js/reviews/reviewData.mjs";
        import type { Course, Review } from "../js/types.mts";
        import ReviewCard from "./ReviewCard.svelte";
        import { getCourseById } from "../js/courseData.mts";
        
        let reviews:Review[] = $state([]);
        // let selectedProduct:Product | null = $state(null);
    
        interface Props {
          professorName: string;
        }
    
        let { professorName }: Props = $props();
    
        async function init() {
          const data = await getReviews("professor", professorName);
          console.log(data);
          reviews = data;
          professorName = data[0].professor;
          
        }
      
        onMount(init);
      
      </script>
      
      <div id="product-list-controls">
        <h2>Reviews: {professorName}</h2>
        
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