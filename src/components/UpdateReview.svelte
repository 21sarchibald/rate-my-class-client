<script lang="ts">
    import { onMount } from "svelte";
    import authSvelte from "../js/auth.svelte";
    import { getParam } from '../js/utils.mts';
    import type { ReviewErrors } from "../js/types.mts";
    import type { Review } from "../js/types.mts";
    import { getReviewById, updateReview } from "../js/reviews.mts";

    let isLoading = $state(true); // default to true
    let reviewFound = $state(false); // default to false
    let hasSubmittedAtLeastOnce = $state(false);
    let reviewId = "";
    let user = authSvelte.userStore;

    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: 6 },
        (_, i) => currentYear - 5 + i
    );

    let courseCode = $state("");
    let courseName = $state("");
    let professor = $state("");
    let semester = $state<"" | "Winter" | "Spring" | "Summer" | "Fall">("");
    let isBlock = $state<boolean>(false);
    let selectedYear = $state<number | "">("");
    let rating = $state("");
    let gradeReceived = $state<"" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "F" | "P" | "W">("");
    let difficulty = $state("");
    let type = $state<"" | "online" | "in-person" | "hybrid">("");
    let isRecommended = $state<boolean>(false);
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

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        hasSubmittedAtLeastOnce = true;
        const token = user.token;
        const isValid = validate();
        errorMessage = "";
        if (!isValid) return;

        isSubmitting = true;

        try {
            console.log("Attemting review update for: ", courseName);
            console.log("Token being sent:", token)
            if (!semester || !selectedYear || !gradeReceived || !type) return;
            const res = await updateReview(token, reviewId, courseCode, courseName, professor, semester, isBlock, selectedYear, Number(rating), gradeReceived,
                Number(difficulty), type, isRecommended, description)
            console.log("Token sent to updateReview:", token);
            console.log("Review ID being updated:", reviewId);
            if (res) {
                isSuccess = true;

            }
        } catch (error:any) {
            console.log("handleSubmit error found: ", error);
            errorMessage = "Failed to update review.";
            return errorMessage
            isSubmitting = false;
        }
    }

    onMount(async () => {
        try {
            const paramId = getParam("_id");

            if (paramId) {
                reviewId = paramId
                const data = await getReviewById(reviewId);
                if(!data) {
                    errorMessage = "Review not found";
                    isLoading = false;
                    reviewFound = false;
                    throw new Error("Review not found");
                }
                
                courseCode = data.courseCode;
                courseName = data.courseName;
                professor = data.professor;
                semester = data.semester;
                isBlock = data.isBlock;
                selectedYear = data.year;
                rating = String(data.rating);
                gradeReceived = data.gradeReceived;
                difficulty = String(data.difficulty);
                console.log("difficulty:", difficulty)
                type = data.type;
                isRecommended = data.recommend;
                description = data.description;
                
                isLoading = false;
                reviewFound = true;
            }
        } catch(error) {
             console.log(error)
        }
    }); 

</script>

{#if isLoading }
    <h3>Loading review.....</h3>
{:else if isSuccess}
    <h3>Review updated successfully!</h3>
    <a href="/">Return to home</a>
{:else if !reviewFound}
    <h3>Review not found.</h3>
    <a href="/">Return to home</a>
    {#if errorMessage}
        <h3>{errorMessage}</h3>
    {/if}
{:else}
    <form class="review-form" onsubmit={handleSubmit}>
            {#if errorMessage}
                <div class="error">
                    <p>{errorMessage}</p>
                </div>
            {/if}
        <label>
            Class Code:
            <input type="text" name="courseCode" bind:value={courseCode} required />
            {#if hasSubmittedAtLeastOnce && errors.courseCode}
                <span class="error">{errors.courseCode}</span>
            {/if}
        </label>
        <label>
            Class Name:
            <input type="text" name="courseName" bind:value={courseName} required />
            {#if hasSubmittedAtLeastOnce && errors.courseName}
                <span class="error">{errors.courseName}</span>
            {/if}
        </label>
        <label>
            Professor:
            <input type="text" name="professor" bind:value={professor} required />
            {#if hasSubmittedAtLeastOnce && errors.professor}
                <span class="error">{errors.professor}</span>
            {/if}
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
            {#if hasSubmittedAtLeastOnce && errors.semester}
                <span class="error">{errors.semester}</span>
            {/if}
        </label>
        <label>
            Block:
            <input type="checkbox" name="isBlock" bind:checked={isBlock} />
            {#if hasSubmittedAtLeastOnce && errors.isBlock}
                <span class="error">{errors.isBlock}</span>
            {/if}
        </label>
        <label>
            Year:
            <select bind:value={selectedYear}>
                <option value="">Select a year</option>

                {#each years as year}
                <option value={year}>{year}</option>
                {/each}
            </select>
            {#if hasSubmittedAtLeastOnce && errors.year}
                <span class="error">{errors.year}</span>
            {/if}
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
            {#if hasSubmittedAtLeastOnce && errors.rating}
                <span class="error">{errors.rating}</span>
            {/if}
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
            {#if hasSubmittedAtLeastOnce && errors.gradeReceived}
                <span class="error">{errors.gradeReceived}</span>
            {/if}
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
            {#if hasSubmittedAtLeastOnce && errors.difficulty}
                <span class="error">{errors.difficulty}</span>
            {/if}
        </label>
        <label>
            Online:
            <select name="classType" id="classType" bind:value={type} required>
                <option value="">Select class type</option>
                <option value="in-person">In-Person</option>
                <option value="online">Online</option>
                <option value="hybrid">Hybrid</option>
            </select>
            {#if hasSubmittedAtLeastOnce && errors.type}
                <span class="error">{errors.type}</span>
            {/if}
        </label>
        <label>
            Recommend:
            <input type="checkbox" name="recommend" bind:checked={isRecommended} />
            {#if hasSubmittedAtLeastOnce && errors.recommend}
                <span class="error">{errors.recommend}</span>
            {/if}
        </label>
        <label>
            Description:
            <textarea name="description" bind:value={description} placeholder="Tell other students about your experience..." required></textarea>
            {#if hasSubmittedAtLeastOnce && errors.description}
                <span class="error">{errors.description}</span>
            {/if}
        </label>
        
        <button type="submit">Update</button>
    </form>

{/if}

<style>
    a {
        color: black;
    }
</style>