<script lang="ts">
console.log("ReviewFormComponent loaded");
    import { onMount } from "svelte";
    import authSvelte from "../js/auth.svelte";
    import { getParam } from '../js/utils.mts';
    import type { CreateReviewRequest, ReviewErrors } from "../js/types.mts";
    import { createReview } from "../js/reviews/reviewData.mts";
    import { treeifyError } from "astro:schema";
    const currentYear = new Date().getFullYear();

    onMount(() => {
        authSvelte.checkAuth();
        console.log(authSvelte.userStore.user)
    });

    const years = Array.from(
        { length: 6 },
        (_, i) => currentYear - 5 + i
    );

    let userId = authSvelte.userStore.user;

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

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        console.log(authSvelte.userStore)
        if (!validate()) {
            console.error("Validation error");
            return;
        }

        const newReview = {
            courseCode: courseCode.trim().toUpperCase(),
            courseName: courseName.trim(),
            professor: professor.trim(),
            semester: semester as CreateReviewRequest["semester"],
            isBlock: isBlock,
            year: Number(selectedYear),
            rating: Number(rating),
            gradeReceived: gradeReceived as CreateReviewRequest["gradeReceived"],
            difficulty: Number(difficulty),
            type: type.toLowerCase() as CreateReviewRequest["type"],
            recommend: recommend,
            description: description.trim()
        } as CreateReviewRequest;

        try {
        console.log("Creating review");
        isSubmitting = true;
        const response = await createReview(newReview);
        console.log("New review successfully created!", response);
        isSubmitting = false;
        isSuccess = true;
          
      }
      catch(error: any){
        isSubmitting = false;
        console.log("Error creating new review", error);
        errorMessage = error.message;
      }
    }

</script>
<h1>Create Review</h1>
<form class="review-form" action="/reviews/create" method="POST" onsubmit={handleSubmit}>
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
        Class Type:
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
        <textarea class="description" name="description" bind:value={description} placeholder="Tell other students about your experience..." required></textarea>
    </label>
    
    <button type="submit">Submit</button>
</form>

<style>
    h1 {
        text-align: center;
    }
    .review-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: var(--tertiary-color);
    }
    label {
      display: flex;
      flex-direction: row;
      font-weight: bold;
      margin-right: 0.5rem;
    }
    input {
      margin-left: 0.5rem;
      font-size: 1rem;
      border-radius: 50px;
      padding: 0.3rem;
    }
    select {
        border-radius: 50px;
        margin-left: 0.5rem;
    }
    .description {
        width: 100%;
        min-height: 50px;
        margin-left: 0.5rem;
        border-radius: 8px;
    }
    button {
      padding: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 50px;
      background-color: var(--secondary-color);
      color: var(--light-grey);
      &:hover {
        background-color: #64835b;
      }
    }
    /* .error {
      color: red;
      margin-bottom: 1rem;
      text-align: center;
    } */
  </style>
