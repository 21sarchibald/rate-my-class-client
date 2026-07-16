<script lang="ts">
    import { onMount } from "svelte";
    import { getParam } from "../js/utils.mts";
    import { searchReviews } from "../js/reviews/reviewData.mts";
    import type { SearchResults } from "../js/types.mts";

    let results: SearchResults | null = null;
    let loading = true;
    let error = "";

    onMount(async () => {
        const query = getParam("query");

        if (!query) {
            error = "No search query.";
            loading = false;
            return;
        }

        try {
            results = await searchReviews(query);
        } catch (err: any) {
            error = err.message;
        } finally {
            loading = false;
        }
    });
</script>

{#if loading}
    <p>Searching...</p>

{:else if error}
    <p>{error}</p>

{:else if results}

{#if results.courses.length}
    <h3>Courses</h3>

    <div class="result-list">
        {#each results.courses as course}
            <a href={`/reviews?courseId=${course.courseId}`}>
                {course.courseCode} - {course.courseName}
            </a>
        {/each}
    </div>
{/if}

{#if results.professors.length}
    <h3>Professors</h3>

    <div class="result-list">
        {#each results.professors as professor}
            <a href={`/reviews?professor=${encodeURIComponent(professor)}`}>
                {professor}
            </a>
        {/each}
    </div>
{/if}

    {#if results.courses.length === 0 && results.professors.length === 0}
        <p>No results found.</p>
    {/if}

{/if}

<style>
    * {
        padding: 10px;
    }
    .result-list {
        display: block;
    }

    .result-list a {
        color: rgb(218, 7, 120);
        display: block;
    }
</style>