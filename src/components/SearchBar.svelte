<script lang="ts">
    import { onMount } from 'svelte';
    import  auth  from '../js/auth.svelte.ts';
    import { setLocalStorage, getParam } from '../js/utils.mts';
    import { searchReviews } from '../js/reviews/reviewData.mts';
    import type { Review } from '../js/types.mts';

let queryString = $state("");
let errorMessage = $state("");

async function searchHandler(event: Event) {
    event.preventDefault();
    errorMessage = "";
    console.log(queryString);

    try {
      window.location.href = `/search-results?query=${encodeURIComponent(queryString)}`;
        
    }
    catch (error: any) {
        console.log("Search handler caught an error", error);
        errorMessage = error.message;
    }

}

</script>

{#if errorMessage}
  <p class="error">{errorMessage}</p>
{/if}
<form onsubmit={searchHandler} class="search-form">
    <input type="string" bind:value={queryString} required placeholder="Search for a review"/>
  <button type="submit"> 
    <img src="../../search-icon.svg" alt="Search submit icon"> 
  </button>
</form>

<style>
  .search-form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 500px;
    max-width: 500px;
    /* margin: 2rem auto; */
    padding: .25rem .5rem; 
    border: 1px solid #ccc;
    border-radius: 50px;
    background-color: white;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    background-color: none;
    width: 100%;
  }
  input:focus {
    outline: none;
  }
  input:hover {
    cursor: text;
  }

  button {
    border: none;
    padding: .2rem;
    font-size: 1rem;
    height: 1.9rem;
    width: 2.1rem;
    cursor: pointer;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
    background-color: black;
  }

  button img {
    height: 1.5rem;
    cursor: pointer;
  }

  .error {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
  }
</style>