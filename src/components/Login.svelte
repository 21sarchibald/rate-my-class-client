<script lang="ts">
    import { onMount } from 'svelte';
    import  auth  from '../js/auth.svelte.ts';
    import { setLocalStorage, getParam } from '../js/utils.mts';

  let { onSuccess = (path:string) => { window.location.href = path;} } = $props<{
      onSuccess?: (data: { email: string }) => void;
  }>();

  let email = $state("");
  let password = $state("");
  let errorMessage = $state("");
  let redirectPath = '/dashboard';

  async function loginHandler(event: Event) {
      event.preventDefault();
      errorMessage = "";
      // Handle login logic here

      try{
        console.log("Attempting login for:", email);
        const response = await auth.login(email, password);
        console.log("Login successful!", response);
        onSuccess(redirectPath);
          
      }
      catch(error: any){
        console.log("Login handler caught an error:", error);
        errorMessage = error.message;
      }

  }

  onMount(() => {
    // we added the getParam function to utils in Team 5
    const param = getParam("redirect");
    if (param) {
      // if the redirect param exists use that
      redirectPath = param;
    } else if (document.referrer != window.location.href) {
      // otherwise send back to the referring page if set
      redirectPath = document.referrer;
    }
    // otherwise redirectPath will stay "/" (send home)
  });

</script>

<h2>Login</h2>
{#if errorMessage}
  <p class="error">{errorMessage}</p>
{/if}
<form onsubmit={loginHandler} class="login-form">
  <label>
    Email:
    <input type="email" bind:value={email} placeholder="example@example.com" required />
  </label>
  <label>
    Password:
    <input type="password" bind:value={password} required />
  </label>
  <button type="submit">Login</button>
</form>

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
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
  }
  button {
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
  }
</style>