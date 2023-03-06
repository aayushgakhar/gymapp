<script>
    import '../app.css';
</script>

<header>
    <h1>My App</h1>
    <nav>
        <a href="/">Home</a>
        <a href="/profile">Profile</a>
    </nav>
</header>
<slot><!-- optional fallback --></slot>
<footer>Footer</footer>

<style>
    header {
        background: #eee;
    }
    footer {
        background: #eee;
    }
</style>