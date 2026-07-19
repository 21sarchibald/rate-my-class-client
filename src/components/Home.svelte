<script lang="ts">
  import ClassCard from "./ClassCard.svelte";
  import FilterComponent from "./FilterComponent.svelte";
  import SearchBar from "./SearchBar.svelte";


</script>

<div class="hero-banner">
    <div class="hero-info">
        <h1>Find classes.</h1>
        <h1><strong>Share</strong> your experiences.</h1>
        <p>Read honest reviews from real students and help others choose the right class.</p>
        <SearchBar />
        <FilterComponent />
    </div>
    <img src="chatgpt-uni.png" alt="Illustration of a university from Gemini">
</div>
<div>
    <ClassCard />
</div>
<div class="login-signup">
    <strong><a href="/login">Login</a></strong> or
    <strong><a href="/signup">Create an account</a></strong>
    to start reviewing classes.
</div>


<style>
    .hero-banner {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 3rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--secondary-color);
    }
    .hero-info {
        grid-column: 1/2;
        h1 {
            margin: 0;
        }
        p {
            margin: 1rem 0;
        }

    }
    img {
        max-width: 100%;
        text-align: right;
    }
    .login-signup {
        margin: 1rem;
        padding: 1.5rem;
        border-radius: 50px;
        background-color: var(--secondary-color);
        color: var(--light-grey);
        width: 450px;
        justify-self: center;
        text-align: center;
    }
</style>