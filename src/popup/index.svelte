<script lang="ts">
    import logo from "data-base64:~assets/favicon.png"
    import Table from "./Table.svelte"
    import "~style.css"
</script>

<main class="popup-root">
    <div class="popup-panel">
        <header class="popup-header">
            <img src={logo} alt="ICP Query" />
            <strong>ICP QUERY</strong>
        </header>

        <Table />

        <footer class="popup-footer">
            <a href="./options.html" target="_blank" rel="noopener noreferrer">选项</a>
            <a href="https://github.com/yuedanlabs/icp-query-extension" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://github.com/yuedanlabs/icp-query-extension/issues" target="_blank" rel="noopener noreferrer">反馈</a>
        </footer>
    </div>
</main>

<style>
    .popup-root {
        width: 360px;
        min-width: 320px;
        padding: 0;
        margin: 0;
        background: var(--iq-surface);
    }

    .popup-panel {
        overflow: hidden;
        min-height: 100%;
        background: var(--iq-surface);
        border: 1px solid var(--iq-border);
    }

    .popup-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        padding: 18px 18px 16px;
        border-bottom: 1px solid var(--iq-border);
        background: var(--iq-surface);
    }

    .popup-header img {
        width: 40px;
        height: 40px;
        border-radius: 8px;
    }

    .popup-header strong {
        margin: 0;
        color: var(--iq-accent);
        font-size: 18px;
        font-weight: 760;
        line-height: 1;
        letter-spacing: 0;
    }

    .popup-footer {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 4px;
        padding: 8px 14px 10px;
        border-top: 1px solid var(--iq-border);
        background: var(--iq-surface);
    }

    .popup-footer a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 26px;
        color: var(--iq-text-muted);
        font-size: 11.5px;
        font-weight: 620;
        text-decoration: none;
        transition: background-color 160ms ease, color 160ms ease;
    }

    .popup-footer a:hover {
        color: var(--iq-accent-strong);
        background: var(--iq-surface);
    }

    @media (max-width: 340px) {
        .popup-root {
            width: 320px;
        }
    }
</style>
