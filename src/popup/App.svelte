<script lang="ts">
    import logo from "../assets/favicon.png";
    import Table from "./Table.svelte";
</script>

<main>
    <div class="header">
        <img src={logo} alt="Svelte Logo" style="" />
        <span>ICP Query</span>
    </div>

    <Table />
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    main {
        text-align: center;
        padding: .5rem;
        margin: 0 auto;
    }

    .header {
        display: flex;
        flex-direction: row;
        margin: auto;
        justify-content: center;
        align-items: center;
    }

    .header span {
        margin-left: 1rem;
        color: #2ee0cf;
        text-transform: uppercase;
        font-size: 1rem;
        /* font-weight: 100; */
        /* line-height: 1.1; */
        /* margin: 2rem auto; */
        max-width: 14rem;
    }
</style>
