<script lang="ts">
    import { onMount } from "svelte";
    import authSvelte from "../js/auth.svelte";
    import { getParam } from '../js/utils.mts';
    import type { FormErrors } from "../js/types.mts";

    let { onSuccess = (path: string) => { window.location.href = path; } } = $props<{
        onSuccess?: (path: string) => void;
    }>();

    // Form field state
    let name =$state("");
    let username =$state("");
    let password =$state("");
    let confirmPassword =$state("");
    let email = $state("");
    let major =$state("");
    let redirectPath = '/dashboard';
    
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

    async function registerHandler(event: Event) {
        event.preventDefault(); 
        hasSubmittedAtLeastOnce = true;

        const isValid = await validateForm();
        errorMessage = "";
        if (!isValid) return;

        isSubmitting = true;

        try {
            console.log("Attempting registration for: ", email);
            const res = await authSvelte.register(name, username, major, email, password);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Registration successful!", res);
            isSuccess = true;
            try {
                await authSvelte.login(email, password);
                onSuccess(redirectPath);
            } catch (loginError: any) {
                console.log("failed to login after registration: ", loginError)
                redirectPath = '/login'
                onSuccess(redirectPath)
            }
            
            name ="";
            username = "";
            password = "";
            confirmPassword = "";
            email = "";
            major = "";


        } catch (registrationError: any) {
            console.log("Registration failed: ", registrationError);
            errorMessage = registrationError.message;
        } finally {
            isSubmitting = false;
        }
    }

    onMount(() => {
        const param = getParam("redirect");
        if (param) {
            redirectPath = param;
            setTimeout(() => {
            window.location.href = param;
        }, 5000);
        } else if (document.referrer != window.location.href) {
            redirectPath = document.referrer;
        }
    });
</script>
<div class="form-wrapper">

    {#if isSuccess}
    <div class="success-banner">
        <h3>🎉 Account Created!</h3>
        <p>Your registration was successful. Welcome aboard!</p>
    </div>
    {:else}

        <form onsubmit={registerHandler} class="registration-form">
            {#if errorMessage}
                <div class="error">
                    <p>{errorMessage}</p>
                </div>
            {/if}
            <div class="form-group1">
                <div>
                    <label for="name" >Name</label>
                    <input type="text" id="name"  placeholder="ex. John Doe" bind:value={name} oninput={handleInput} class:is-invalid={hasSubmittedAtLeastOnce && errors.name} class:is-valid={hasSubmittedAtLeastOnce && !errors.name} >
                    {#if hasSubmittedAtLeastOnce && errors.name}
                        <span class="error">{errors.name}</span>
                    {/if}
                </div>
                <div>
                    <label for="major">Major</label>
                    <input type="text" id="major" placeholder="ex. Computer Science" bind:value={major} oninput={handleInput} class:is-invalid={hasSubmittedAtLeastOnce && errors.major} class:is-valid={hasSubmittedAtLeastOnce && !errors.major} >
                    {#if hasSubmittedAtLeastOnce && errors.major}
                        <span class="error">{errors.major}</span>
                    {/if}
                </div>    
                <div>
                    <label for="username" >Username</label>
                    <input type="text" id="username" placeholder="ex. johndoe1" bind:value={username} oninput={handleInput} class:is-invalid={hasSubmittedAtLeastOnce && errors.username} class:is-valid={hasSubmittedAtLeastOnce && !errors.username} >
                    {#if hasSubmittedAtLeastOnce && errors.username}
                        <span class="error">{errors.username}</span>
                    {/if}
                </div>    
                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="ex. johndoe@example.com" bind:value={email} oninput={handleInput} class:is-invalid={hasSubmittedAtLeastOnce && errors.email} class:is-valid={hasSubmittedAtLeastOnce && !errors.email} >
                    {#if hasSubmittedAtLeastOnce && errors.email}
                        <span class="error">{errors.email}</span>
                    {/if}
                </div>
            </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" bind:value={password} oninput={handleInput} class:is-invalid={hasSubmittedAtLeastOnce && errors.password} class:is-valid={hasSubmittedAtLeastOnce && !errors.password} >
                    {#if hasSubmittedAtLeastOnce && errors.password}
                        <span class="error">{errors.password}</span>
                    {/if}
                </div>    
                <div>
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" placeholder="Confirm Password" bind:value={confirmPassword} oninput={handleInput} class:is-invalid={hasSubmittedAtLeastOnce && errors.confirmPassword} class:is-valid={hasSubmittedAtLeastOnce && !errors.confirmPassword} >
                    {#if hasSubmittedAtLeastOnce && errors.confirmPassword}
                        <span class="error">{errors.confirmPassword}</span>
                    {/if}
                </div>    
                
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
        </form>
    {/if}
</div>

<style>
    .registration-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .form-group1 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    label {
        display: flex;
        flex-direction: column;
        font-weight: bold;

    }
    input {
        margin-top: 0.5rem;
        padding: 0.5rem;
        font-size: 1rem;
        box-sizing: border-box;
        width: 100%;
        border-radius: 50px;
    }
    button {
        padding: 0.5rem;
        font-size: 1rem;
        cursor: pointer;
        background-color: #44613c;
        color: #f4f3f3;
    }
    .error {
        color: red;
        margin-bottom: 1rem;
        text-align: center;
    }
    .is-invalid {
        border: 2px solid red;
        box-shadow: 0 0 5px red;
        margin-bottom: 0.5rem;
    }
    .is-valid {
        border: 2px solid green;
    }
</style>