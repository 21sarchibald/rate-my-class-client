<script lang="ts">

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
    <div class="search">
        <input type="text">
        <img class="search-btn" src="../../search-icon.svg" alt="Search button">
    </div>
    <div class="menu-right">

        <button class="hamburger-menu" onclick={handleHamburgurToggle}>
            <img src="../../hamburger-menu-svgrepo-com.svg" alt="Hamburger menu">
        </button>
        <nav class="nav-right" class:open={isOpen}>
            <a href="#">Login</a>
            <a href="#">Sign Up</a>
        </nav>
    </div>
</header>