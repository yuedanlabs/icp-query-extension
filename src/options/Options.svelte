<script lang="ts">
    import type { Options } from "~types"

    let options: Options = {
        api_url: "",
        show_feedback: true,
        show_whois: true,
        show_dns: true,
        show_icp: true,
    }
    let show_status = false
    let validation = ""
    let statusTimer: ReturnType<typeof setTimeout>

    function save_options() {
        validation = ""
        const apiUrl = options.api_url?.trim() || ""
        try {
            const parsed = new URL(apiUrl)
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
                throw new Error("invalid protocol")
            }
        } catch (e) {
            validation = "请输入有效的 HTTP 或 HTTPS URL"
            return false
        }
        options.api_url = apiUrl
        chrome.storage.sync.set(
            {
                options: options,
            },
            function () {
                show_status = true
                clearTimeout(statusTimer)
                statusTimer = setTimeout(() => {
                    show_status = false
                }, 2200)
            }
        )
    }

    chrome.storage.sync.get("options", function (res) {
        if (res.options) {
            options = { ...options, ...res.options }
        }
    })
</script>

<section class="settings-page">
    <div class="settings-header">
        <p>设置</p>
        <h1>配置查询来源与显示内容</h1>
        <span>这些选项会同步到浏览器扩展存储。</span>
    </div>

    <div class="settings-card iq-shell">
        <div class="field-block">
            <label for="api-url">ICP API URL</label>
            <p>用于查询 ICP、WHOIS 和 DNS 信息的服务地址。</p>
            <input id="api-url" type="text" class="iq-input" bind:value={options.api_url} placeholder="https://example.com/api/icp" aria-invalid={validation ? "true" : "false"} aria-describedby="api-help api-error" />
            <p id="api-help" class="helper-copy">URL 会自动附加当前域名和查询参数。</p>
            {#if validation}
                <p id="api-error" class="error-copy">{validation}</p>
            {/if}
        </div>

        <div class="switch-list" aria-label="显示内容">
            <label class="switch-row">
                <span>
                    <strong>显示反馈入口</strong>
                    <small>在弹窗底部保留反馈和配置入口。</small>
                </span>
                <input type="checkbox" bind:checked={options.show_feedback} />
                <i class="toggle-track" />
            </label>

            <label class="switch-row">
                <span>
                    <strong>显示 WHOIS</strong>
                    <small>展示注册商、注册日期和域名状态。</small>
                </span>
                <input type="checkbox" bind:checked={options.show_whois} />
                <i class="toggle-track" />
            </label>

            <label class="switch-row">
                <span>
                    <strong>显示 DNS</strong>
                    <small>展示 A、AAAA、CNAME、NS 与位置结果。</small>
                </span>
                <input type="checkbox" bind:checked={options.show_dns} />
                <i class="toggle-track" />
            </label>

            <label class="switch-row">
                <span>
                    <strong>显示 ICP</strong>
                    <small>展示备案主体、备案号和更新时间。</small>
                </span>
                <input type="checkbox" bind:checked={options.show_icp} />
                <i class="toggle-track" />
            </label>

            <div class="switch-row disabled-row">
                <span>
                    <strong>公安备案</strong>
                    <small>该项仍在规划中。</small>
                </span>
                <span class="coming-soon">未开放</span>
            </div>
        </div>

        <div class="settings-actions">
            {#if show_status}
                <span class="save-status" role="status">设置已保存</span>
            {/if}
            <button class="iq-button" type="button" on:click={save_options}>保存</button>
        </div>
    </div>
</section>

<style>
    .settings-page {
        max-width: 720px;
        text-align: left;
    }

    .settings-header {
        margin-bottom: 18px;
    }

    .settings-header p {
        margin: 0 0 8px;
        color: var(--iq-accent-strong);
        font-size: 13px;
        font-weight: 760;
        line-height: 1.2;
    }

    .settings-header h1 {
        margin: 0;
        color: var(--iq-text);
        font-size: 28px;
        font-weight: 780;
        letter-spacing: -0.02em;
        line-height: 1.12;
    }

    .settings-header span {
        display: block;
        margin-top: 9px;
        color: var(--iq-text-muted);
        font-size: 14px;
        line-height: 1.6;
    }

    .settings-card {
        padding: 22px;
    }

    .field-block {
        padding-bottom: 20px;
        border-bottom: 1px solid var(--iq-border);
    }

    .field-block label {
        display: block;
        margin-bottom: 6px;
        color: var(--iq-text);
        font-size: 14px;
        font-weight: 750;
        line-height: 1.3;
    }

    .field-block > p {
        margin: 0 0 12px;
        color: var(--iq-text-muted);
        font-size: 13px;
        line-height: 1.55;
    }

    .helper-copy,
    .error-copy {
        margin: 8px 0 0;
        font-size: 12px;
        line-height: 1.45;
    }

    .helper-copy {
        color: var(--iq-text-soft);
    }

    .error-copy {
        color: var(--iq-error);
        font-weight: 650;
    }

    .switch-list {
        display: grid;
        gap: 0;
    }

    .switch-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 18px;
        padding: 16px 0;
        border-bottom: 1px solid rgb(148 163 184 / 0.22);
        cursor: pointer;
    }

    .switch-row span {
        min-width: 0;
    }

    .switch-row strong {
        display: block;
        color: var(--iq-text);
        font-size: 14px;
        font-weight: 720;
        line-height: 1.3;
    }

    .switch-row small {
        display: block;
        margin-top: 4px;
        color: var(--iq-text-muted);
        font-size: 12px;
        line-height: 1.45;
    }

    .switch-row input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
    }

    .toggle-track {
        position: relative;
        width: 44px;
        height: 26px;
        border: 1px solid var(--iq-border);
        border-radius: 999px;
        background: var(--iq-surface-muted);
        transition: background-color 160ms ease, border-color 160ms ease;
    }

    .toggle-track::after {
        content: "";
        position: absolute;
        top: 3px;
        left: 3px;
        width: 18px;
        height: 18px;
        border-radius: 999px;
        background: var(--iq-surface);
        box-shadow: 0 2px 8px rgb(15 23 42 / 0.18);
        transition: transform 160ms ease;
    }

    .switch-row input:checked + .toggle-track {
        border-color: var(--iq-accent);
        background: var(--iq-accent);
    }

    .switch-row input:checked + .toggle-track::after {
        transform: translateX(18px);
    }

    .switch-row input:focus-visible + .toggle-track {
        outline: 2px solid rgb(8 127 111 / 0.48);
        outline-offset: 2px;
    }

    .disabled-row {
        cursor: default;
        opacity: 0.72;
    }

    .coming-soon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 28px;
        padding: 0 10px;
        border-radius: 999px;
        color: var(--iq-text-muted);
        background: var(--iq-surface-subtle);
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
    }

    .settings-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
        padding-top: 18px;
    }

    .save-status {
        color: var(--iq-accent-strong);
        font-size: 13px;
        font-weight: 700;
    }

    @media (max-width: 720px) {
        .settings-page {
            max-width: none;
        }

        .settings-header h1 {
            font-size: 24px;
        }

        .settings-card {
            padding: 18px;
        }
    }
</style>
