<script lang="ts">
  import NavMenu from "./NavMenu.svelte";
    import SearchBar from "./SearchBar.svelte";


    let isOpen = false
    function handleHamburgurToggle() {
        isOpen = !isOpen;

    }
</script>

<header>
    <div class="logo">
        <a href="/"><img src="../../rmc_logo.jpg" alt="Logo"></a>
        <a class="logo-title" href="/">Rate My Class</a>
    </div>
    <SearchBar />
    <div class="menu-right">

        <button class="hamburger-menu" onclick={handleHamburgurToggle}>
            <img src="../../hamburger-menu-svgrepo-com.svg" alt="Hamburger menu">
        </button>
        <nav class="nav-right" class:open={isOpen}>

            <NavMenu />
        </nav>
    </div>
</header>