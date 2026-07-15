<script lang="ts">

        import { onMount } from "svelte";
        import { getReviews } from "../js/reviews/reviewData.mjs";
        import type { Review } from "../js/types.mts";
        import ReviewCard from "./ReviewCard.svelte";
        import { getParam } from "../js/utils.mts";
        
        let reviews:Review[] = $state([]);
        let courseId = $state(""); 
        let professorName = $state(""); 
        let queryParam = $state("");

    
        async function init() {

          courseId = getParam("courseId") || "";
          professorName = getParam("professor") || "";

          if (courseId != "") {
              const data = await getReviews("courseId", courseId);
              reviews = data;
              queryParam = data[0].courseName;
            
          }

          else if (professorName != "") {
            const data = await getReviews("professor", professorName);
            reviews = data;
            queryParam = data[0].professor;
          }
          
          else {
            queryParam = "No reviews";
          }
          
        }
      
        onMount(() => {
            init();
        });
      
      </script>
      
      <div id="product-list-controls">
        <h2>Reviews: {queryParam}</h2>
        
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