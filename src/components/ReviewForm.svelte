<script lang="ts">
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: 6 },
        (_, i) => currentYear - 5 + i
    );

    let selectedYear = "";
</script>

<form class="review-form" action="/submit-review" method="POST">
    <label>
        Class Code:
        <input type="text" required />
    </label>
    <label>
        Class Name:
        <input type="text" required />
    </label>
    <label>
        Professor:
        <input type="text" required />
    </label>
    <label>
        Semester:
        <input type="radio" name="semester" value="Fall" required />
        <label for="fall">Fall</label>
        <input type="radio" name="semester" value="Winter" required />
        <label for="winter">Winter</label>
        <input type="radio" name="semester" value="Spring" required />
        <label for="spring">Spring</label>
        <input type="radio" name="semester" value="Summer" required />
        <label for="summer">Summer</label>
    </label>
    <label>
        Year:
        <select bind:value={selectedYear}>
            <option value="">Select a year</option>

            {#each years as year}
                <option value={year}>{year}</option>
            {/each}
        </select>
    </label>
    <label>
        Review:
        <input type="text" required />
    </label>
    <button type="submit">Submit</button>
</form>
