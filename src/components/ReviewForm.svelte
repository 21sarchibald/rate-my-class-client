<script lang="ts">
    import { onMount } from "svelte";
    import authSvelte from "../js/auth.svelte";
    import { getParam } from '../js/utils.mts';
    import type { FormErrors } from "../js/types.mts";
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: 6 },
        (_, i) => currentYear - 5 + i
    );

    let selectedYear = "";

    let classCode = $state("");

    //UI field state
    let errors: FormErrors = $state({});
    let errorMessage = $state("");
    let isSubmitting = $state(false);
    let isSuccess = $state(false);

    async function validateForm() {
        const newErrors: FormErrors = {}

        // check name, major, username
        if (!name.trim()) newErrors.name = 'Name is requried.';
        if (!major.trim()) newErrors.major = 'Major is required';
        if (!username.trim()) newErrors.username = "Username is required.";

        // check length
        if (name.trim() &&  name.trim().length < 3 || name.trim().length > 20) newErrors.name = 'Name has to be between 3-20 characters.'

        // Email regex check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        // Password strength check
        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
        }

        if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        errors = newErrors;
        // If errors object has no key, form is valid!
        return Object.keys(errors).length === 0;

    }

    let hasSubmittedAtLeastOnce = $state(false);

    async function handleInput() {
        if (hasSubmittedAtLeastOnce) {
            await validateForm();
        }
    };
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
        Rating:
        <input type="radio" name="rating" value="1" required />
        <label for="1">1</label>
        <input type="radio" name="rating" value="2" required />
        <label for="2">2</label>
        <input type="radio" name="rating" value="3" required />
        <label for="3">3</label>
        <input type="radio" name="rating" value="4" required />
        <label for="4">4</label>
        <input type="radio" name="rating" value="5" required />
        <label for="5">5</label>
    </label>
    <label>
        Grade:
        <input type="text" name="grade" required />
    </label>
    <label>
        Difficulty:
        <select name="difficulty" id="difficulty" required>
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
        <input type="checkbox" name="online" />
    </label>
    <label>
        Recommend:
        <input type="checkbox" name="recommend" />
    </label>
    <label>
        Review:
        <input type="textarea" name="review" required/>
    </label>
    
    <button type="submit">Submit</button>
</form>
