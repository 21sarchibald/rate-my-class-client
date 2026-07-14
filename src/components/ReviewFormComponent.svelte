<script lang="ts">
    import { onMount } from "svelte";
    import authSvelte from "../js/auth.svelte";
    import { getParam } from '../js/utils.mts';
    import type { ReviewErrors } from "../js/types.mts";
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: 6 },
        (_, i) => currentYear - 5 + i
    );



    let courseCode = $state("");
    let courseName = $state("");
    let professor = $state("");
    let semester = $state("");
    let isBlock = $state(false);
    let selectedYear = $state("");
    let rating = $state("");
    let gradeReceived = $state("");
    let difficulty = $state("");
    let type = $state("");
    let recommend = $state(false);
    let description = $state("");

    //UI field state
    let errors: ReviewErrors = $state({});
    let errorMessage = $state("");
    let isSubmitting = $state(false);
    let isSuccess = $state(false);

    function validate() {
        errors = {};

        const courseCodeRegex = /^[A-Za-z]{2,5}\d{3}$/;

        if (!courseCode.trim()) {
            errors.courseCode = "Class code is required.";
        } else if (!courseCodeRegex.test(courseCode.trim().toUpperCase())) {
            errors.courseCode =
                "Enter a valid class code (e.g. CSE210 or CS123).";
        }

        if (!courseName.trim()) {
            errors.courseName = "Class name is required.";
        } else if (courseName.trim().length < 3) {
            errors.courseName = "Class name is too short.";
        }

        if (!professor.trim()) {
            errors.professor = "Professor is required.";
        }

        if (!semester) {
            errors.semester = "Please select a semester.";
        }

        if (!selectedYear) {
            errors.year = "Please select a year.";
        }

        if (!rating) {
            errors.rating = "Please choose a rating.";
        }

        if (!gradeReceived) {
            errors.gradeReceived = "Please select a grade.";
        }

        if (!difficulty) {
            errors.difficulty = "Please select a difficulty.";
        }

        if (!type) {
            errors.type = "Please select a class type.";
        }

        const trimmedDescription = description.trim();

        if (!trimmedDescription) {
            errors.description = "Please write a description.";
        } else if (trimmedDescription.length < 20) {
            errors.description = "Description must be at least 20 characters.";
        } else if (trimmedDescription.length > 2000) {
            errors.description = "Description must be less than 2000 characters.";
        }

        return Object.keys(errors).length === 0;
    }

    function handleSubmit(event: SubmitEvent) {
        if (!validate()) {
            event.preventDefault();
        }
    }

</script>

<form class="review-form" action="/submit-review" method="POST" onsubmit={handleSubmit}>
    <label>
        Class Code:
        <input type="text" name="courseCode" bind:value={courseCode} required />
    </label>
    <label>
        Class Name:
        <input type="text" name="courseName" bind:value={courseName} required />
    </label>
    <label>
        Professor:
        <input type="text" name="professor" bind:value={professor} required />
    </label>
    <label>
        Semester:
        <input type="radio" name="semester" value="Fall" bind:group={semester} required />
        <label for="fall">Fall</label>
        <input type="radio" name="semester" value="Winter" bind:group={semester} required />
        <label for="winter">Winter</label>
        <input type="radio" name="semester" value="Spring" bind:group={semester} required />
        <label for="spring">Spring</label>
        <input type="radio" name="semester" value="Summer" bind:group={semester} required />
        <label for="summer">Summer</label>
    </label>
    <label>
        Block:
        <input type="checkbox" name="isBlock" bind:checked={isBlock} />
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
        Rating:
        <input type="radio" name="rating" value="1" bind:group={rating} required />
        <label for="1">1</label>
        <input type="radio" name="rating" value="2" bind:group={rating} required />
        <label for="2">2</label>
        <input type="radio" name="rating" value="3" bind:group={rating} required />
        <label for="3">3</label>
        <input type="radio" name="rating" value="4" bind:group={rating} required />
        <label for="4">4</label>
        <input type="radio" name="rating" value="5" bind:group={rating} required />
        <label for="5">5</label>
    </label>
    <label>
        Grade:
        <select bind:value={gradeReceived} required>
            <option value="">Select grade</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="D-">D-</option>
            <option value="F">F</option>
            <option value="P">P</option>
            <option value="W">W</option>
</select>
    </label>
    <label>
        Difficulty:
        <select name="difficulty" id="difficulty" bind:value={difficulty} required>
            <option value="">Select difficulty</option>
            <option value="Easy">1</option>
            <option value="Moderate">2</option>
            <option value="Medium">3</option>
            <option value="Hard">4</option>
            <option value="Difficult">5</option>
        </select>
    </label>
    <label>
        Online:
        <select name="classType" id="classType" bind:value={type} required>
            <option value="">Select class type</option>
            <option value="In-Person">In-Person</option>
            <option value="Online">Online</option>
            <option value="Hybrid">Hybrid</option>
        </select>
    </label>
    <label>
        Recommend:
        <input type="checkbox" name="recommend" bind:checked={recommend} />
    </label>
    <label>
        Description:
        <textarea name="description" bind:value={description} placeholder="Tell other students about your experience..." required></textarea>
    </label>
    
    <button type="submit">Submit</button>
</form>
