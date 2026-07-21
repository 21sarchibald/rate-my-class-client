<script lang="ts">
    import { onMount } from "svelte";
    import { getParam } from "../js/utils.mts";
    import { searchReviews, getReviews, getReviewCountForCourse } from "../js/reviews/reviewData.mts";
    import type { SearchResults } from "../js/types.mts";

    let results: SearchResults | null = $state(null);
    let loading = $state(true);
    let error = $state("");
    let searchResultText = $state("");
    let numResults = $state();
    let reviews = $state();

    onMount(async () => {
        const query = getParam("query");

        if (!query) {
            error = "No search query.";
            loading = false;
            return;
        }

        try {
            searchResultText = query;
            results = await searchReviews(query);
            numResults = results.courses.length + results.professors.length;
            for (const r of results.courses) {
                reviews = await getReviewCountForCourse(r.courseCode);

            }
        } catch (err: any) {
            error = err.message;
        } finally {
            loading = false;
        }
    });
</script>

<div class="hero-banner">
    <div class="hero-info">
        <h1>Search results for</h1>
        <h1 class="search-results">"{searchResultText}"</h1>
        <p>Showing {numResults} results</p>
    </div>
    <img src="chatgpt-uni.png" alt="Illustration of a university from Gemini">
</div>
<div class="search-results-list">

    {#if loading}
    <p>Searching...</p>
    
    {:else if error}
    <p>{error}</p>
    
    {:else if results}
    
    {#if results.courses.length}
    <h3><strong>Courses</strong> ({results.courses.length})</h3>
    
    <div class="result-list">
        {#each results.courses as course}
        <div class="course">
            <a href={`/reviews?courseId=${course.courseId}`}>
                {course.courseCode} - {course.courseName}
            </a>
            <p>{reviews} reviews</p>
        </div>
        {/each}
    </div>
    {/if}
    
    {#if results.professors.length}
    <h3><strong>Professors</strong> ({results.professors.length})</h3>
    
    <div class="result-list">
        {#each results.professors as professor}
        <div class="prof">

            <a href={`/reviews?professor=${encodeURIComponent(professor)}`}>
                {professor}
            </a>
        </div>
        {/each}
    </div>
    {/if}
    
    {#if results.courses.length === 0 && results.professors.length === 0}
    <p>No results found.</p>
    {/if}
    
    {/if}
</div>

<style>
    * {
        padding: 10px;
    }
    
    .search-results-list {
        margin: 0 3rem;

    }
    .result-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 3rem;

    }

    .result-list a {
        /* color: rgb(218, 7, 120); */
        display: block;
        color: var(--secondary-color);

    }
    .course, .prof {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: var(--tertiary-color);
        border-radius: 20px;
        padding: 2rem;
        cursor: pointer;
        box-shadow: -1px 3px 5px 0px rgba(128, 128, 128, 0.149);
        transition: 0.3s ease-in;
        p {
            margin: 0;
        }
    }
    .course:hover {
        background-color: #cbc3b7;
    }
    .hero-banner {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 0 3rem;
        padding: 0;
        padding-top: 1rem;
        border-bottom: 1px solid var(--secondary-color);
    }
    .hero-info {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        padding-top: 1rem;
        grid-column: 1/2;
        h1 {
            margin: 0;
            padding: 0;
        }
        .search-results {
            color: var(--secondary-color);
        }
        p {
            margin: 1rem 0;
            font-size: smaller;
        }

    }
    img {
        max-width: 100%;
        padding: 0;
        text-align: right;
    }
</style>