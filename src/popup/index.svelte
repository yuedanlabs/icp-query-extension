<script lang="ts">
    import logo from "data-base64:~assets/favicon.png"
    import Table from "./Table.svelte"
    import "~style.css"
</script>

<main class="popup-root">
    <div class="popup-card iq-shell">
        <header class="popup-header">
            <div class="brand-lockup">
                <img src={logo} alt="ICP Query" />
                <div>
                    <p>ICP Query</p>
                    <span>网站备案与域名信息</span>
                </div>
            </div>
            <a class="settings-pill" href="./options.html" target="_blank" rel="noopener noreferrer">设置</a>
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
        padding: 10px;
        margin: 0;
    }

    .popup-card {
        overflow: hidden;
    }

    .popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 14px 12px;
        border-bottom: 1px solid var(--iq-border);
        background: linear-gradient(180deg, rgb(8 127 111 / 0.06), transparent);
    }

    .brand-lockup {
        display: flex;
        align-items: center;
        min-width: 0;
        gap: 10px;
        text-align: left;
    }

    .brand-lockup img {
        width: 34px;
        height: 34px;
        border-radius: 10px;
    }

    .brand-lockup p {
        margin: 0;
        color: var(--iq-text);
        font-size: 15px;
        font-weight: 750;
        line-height: 1.2;
    }

    .brand-lockup span {
        display: block;
        margin-top: 2px;
        color: var(--iq-text-muted);
        font-size: 11px;
        line-height: 1.2;
    }

    .settings-pill {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        padding: 0 11px;
        border: 1px solid var(--iq-border);
        border-radius: 999px;
        color: var(--iq-text);
        background: var(--iq-surface);
        font-size: 12px;
        font-weight: 650;
        text-decoration: none;
        transition: background-color 160ms ease, transform 160ms ease;
    }

    .settings-pill:hover {
        background: var(--iq-surface-subtle);
    }

    .settings-pill:active {
        transform: translateY(1px);
    }

    .popup-footer {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
        padding: 10px;
        border-top: 1px solid var(--iq-border);
        background: var(--iq-surface-subtle);
    }

    .popup-footer a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 30px;
        border-radius: 999px;
        color: var(--iq-text-muted);
        font-size: 12px;
        font-weight: 650;
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
            padding: 8px;
        }
    }
</style>
