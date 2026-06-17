<script lang="ts">
    import type { Data } from "~types"
    import Warn from "./warn.svelte"
    import { DEFAULT_DEMO_DATA } from "~default-data"

    let data: Data
    let currentDomain = ""
    let showFeedback = true
    let showWhois = true
    let showDNS = true
    let showICP = true
    let showNotice = true
    let errorMsg = {
        server: "服务器暂时不可用，请稍后重试",
        limited: "今日查询次数已达上限",
        timeout: "服务器响应超时，请稍后重试",
        invalidApi: "API 地址格式错误，请前往选项页检查",
        invalidPage: "当前页面不支持查询，仅支持 HTTP/HTTPS 页面",
    }

    function extractDomain(rawUrl?: string) {
        if (!rawUrl) return null
        try {
            const parsed = new URL(rawUrl)
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
                return null
            }
            return parsed.hostname
        } catch (e) {
            return null
        }
    }

    function formatDate(rawDate?: string) {
        if (!rawDate) return "-"
        const date = new Date(rawDate)
        if (Number.isNaN(date.getTime())) {
            return rawDate
        }
        return date.toLocaleDateString()
    }

    function formatDateTime(rawDate?: string) {
        if (!rawDate) return "-"
        const date = new Date(rawDate)
        if (Number.isNaN(date.getTime())) {
            return rawDate
        }

        try {
            const formatted = new Intl.DateTimeFormat("zh-CN", {
                timeZone: "Asia/Shanghai",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }).format(date)

            return `${formatted.replace(/\//g, "-")} 北京时间`
        } catch (e) {
            return rawDate
        }
    }

    function formatDomainStatus(status: string) {
        return status.replace(/\s+https?:\/\/\S+$/i, "").trim()
    }

    function asStringArray(raw: unknown): string[] {
        if (Array.isArray(raw)) {
            return raw.map((item) => String(item).trim()).filter(Boolean)
        }
        if (typeof raw === "string") {
            return raw.split(/[\n,]+/).map((item) => item.trim()).filter(Boolean)
        }
        return []
    }

    function normalizeData(raw: unknown): Data {
        if (!raw || typeof raw !== "object") {
            return { msg: errorMsg.server }
        }
        const source = raw as Record<string, unknown>
        const normalized = source as Data

        if (!normalized.icp && (source.subject || source.website || source.msg)) {
            normalized.icp = {
                subject: source.subject as Data["icp"]["subject"],
                website: source.website as Data["icp"]["website"],
                msg: typeof source.msg === "string" ? source.msg : undefined,
            }
        }

        if (normalized.whois) {
            normalized.whois = {
                ...normalized.whois,
                "Domain Status": asStringArray((normalized.whois as Record<string, unknown>)["Domain Status"]),
                "Name Server": asStringArray((normalized.whois as Record<string, unknown>)["Name Server"]),
            }
        }

        if (normalized.dns) {
            normalized.dns = {
                ...normalized.dns,
                A: asStringArray((normalized.dns as Record<string, unknown>).A),
                AAAA: asStringArray((normalized.dns as Record<string, unknown>).AAAA),
                CNAME: asStringArray((normalized.dns as Record<string, unknown>).CNAME),
                NS: asStringArray((normalized.dns as Record<string, unknown>).NS),
                GEO: normalized.dns.GEO,
            }
        }

        return normalized
    }

    async function fetch_data(API: string, domain: string): Promise<Data> {
        if (process.env.NODE_ENV === "development" && process.env.PLASMO_TAG === "dev") return DEFAULT_DEMO_DATA
        let url: URL
        try {
            url = new URL(API)
        } catch (e) {
            return { msg: errorMsg.invalidApi }
        }
        url.searchParams.set("url", domain)
        url.searchParams.set("version", "2")
        if (showWhois) {
            url.searchParams.set("whois", "1")
        } else {
            url.searchParams.delete("whois")
        }
        if (showDNS) {
            url.searchParams.set("dns", "1")
        } else {
            url.searchParams.delete("dns")
        }
        if (showICP) {
            url.searchParams.set("icp", "1")
        } else {
            url.searchParams.delete("icp")
        }
        try {
            const res = await fetch(url.toString(), { signal: AbortSignal.timeout(30000) })
            if (res.status === 429) {
                return { msg: errorMsg.limited }
            }
            if (!res.ok) {
                return { msg: errorMsg.server }
            } else {
                const result = await res.json()
                const payload = Array.isArray(result) ? result[0] : result
                return normalizeData(payload)
            }
        } catch (err) {
            if (err instanceof DOMException && err.name === "TimeoutError") {
                return { msg: errorMsg.timeout }
            }
            return { msg: errorMsg.server }
        }
    }

    chrome.storage.sync.get("options", function (res) {
        if (res.options?.api_url?.trim()) {
            showFeedback = "show_feedback" in res.options ? res.options.show_feedback : true
            showWhois = "show_whois" in res.options ? res.options.show_whois : true
            showDNS = "show_dns" in res.options ? res.options.show_dns : true
            showICP = "show_icp" in res.options ? res.options.show_icp : true
            chrome.tabs.query(
                { active: true, currentWindow: true },
                async function (tabs) {
                    const domain = extractDomain(tabs[0]?.url)
                    if (!domain) {
                        data = { msg: errorMsg.invalidPage }
                        return
                    }
                    currentDomain = domain
                    data = await fetch_data(res.options.api_url, domain)
                }
            )
        } else {
            data = { msg: "请先配置 API 地址" }
        }
    })

    chrome.storage.local.get("show_notice").then((res) => {
        showNotice = (res.show_notice?.version >= 10000 && res.show_notice.value === false) ? false : true
    })

    const close_notice = () => {
        showNotice = false
        chrome.storage.local.set({
            show_notice: {
                version: 10000,
                value: false,
            },
        })
    }

    const show_option_page = () => {
        chrome.runtime.openOptionsPage()
    }
</script>

<section class="result-panel">
    {#if showNotice}
        <div class="notice-card">
            <p>默认显示当前网站 ICP 信息，可在设置中关闭。</p>
            <button type="button" on:click={close_notice}>知道了</button>
        </div>
    {/if}

    {#if data}
        <div class="summary-strip">
            <span>当前域名</span>
            <strong>{currentDomain || "未检测到域名"}</strong>
        </div>

        {#if data.msg}
            <div class="state-card error-state">
                <strong>查询未完成</strong>
                <p>{data.msg}</p>
                <button type="button" class="iq-button iq-button-secondary state-action" on:click={show_option_page}>检查设置</button>
            </div>
        {/if}

        {#if showICP && data.icp}
            <section class="result-section">
                <div class="section-heading">
                    <h2>ICP 备案</h2>
                    <span>主体与备案号</span>
                </div>
                {#if data.icp.subject && data.icp.website}
                    <div class="row-list">
                        <div class="info-row">
                            <span>备案类型</span>
                            <strong>{data.icp.subject.nature}</strong>
                        </div>
                        <div class="info-row">
                            <span>主办方</span>
                            <strong>
                                {#if data.icp.subject.nature === "企业"}
                                    <a class="iq-link" href="https://www.tianyancha.com/search?key={data.icp.subject.name}" target="_blank" rel="noopener noreferrer">{data.icp.subject.name}</a>
                                {:else}
                                    {data.icp.subject.name}
                                {/if}
                            </strong>
                        </div>
                        <div class="info-row">
                            <span>备案号</span>
                            <strong>{data.icp.subject.license}</strong>
                        </div>
                        <div class="info-row">
                            <span>备案日期</span>
                            <strong>{formatDate(data.icp.subject.updateTime)}</strong>
                        </div>
                    </div>
                {:else}
                    <p class="empty-copy">{data.icp.msg || "未返回 ICP 备案信息"}</p>
                {/if}
            </section>
        {/if}

        {#if showWhois && data.whois}
            <section class="result-section">
                <div class="section-heading">
                    <h2>WHOIS</h2>
                    <span>注册商与域名状态</span>
                </div>
                <div class="row-list">
                    <div class="info-row">
                        <span>域名状态</span>
                        <strong class="chip-list">
                            {#if (data.whois["Domain Status"] || []).length === 0}
                                <span class="value-chip">-</span>
                            {/if}
                            {#each (data.whois["Domain Status"] || []) as item}
                                <span class="value-chip">{formatDomainStatus(item)}</span>
                            {/each}
                        </strong>
                    </div>
                    <div class="info-row">
                        <span>DNS 服务器</span>
                        <strong class="chip-list">
                            {#if (data.whois["Name Server"] || []).length === 0}
                                <span class="value-chip">-</span>
                            {/if}
                            {#each (data.whois["Name Server"] || []) as item}
                                <span class="value-chip">{item}</span>
                            {/each}
                        </strong>
                    </div>
                    <div class="info-row">
                        <span>注册日期</span>
                        <strong>{formatDateTime(data.whois["Created Date"])}</strong>
                    </div>
                    <div class="info-row">
                        <span>更新日期</span>
                        <strong>{formatDateTime(data.whois["Updated Date"])}</strong>
                    </div>
                    <div class="info-row">
                        <span>截止日期</span>
                        <strong>{formatDateTime(data.whois["Expiry Date"])}</strong>
                    </div>
                    <div class="info-row">
                        <span>注册商</span>
                        <strong>{data.whois["Registrar"] || "-"}</strong>
                    </div>
                    <div class="info-row">
                        <span>所属机构</span>
                        <strong>{data.whois["Registrant Organization"] || "-"}</strong>
                    </div>
                    <div class="info-row">
                        <span>注册属地</span>
                        <strong>{data.whois["Registrant Country"] || "-"}</strong>
                    </div>
                </div>
            </section>
        {/if}

        {#if showDNS && data.dns}
            <section class="result-section">
                <div class="section-heading">
                    <h2>DNS 解析</h2>
                    <span>记录与位置</span>
                </div>
                <div class="row-list">
                    <div class="info-row">
                        <span>A</span>
                        <strong class="chip-list">
                            {#if (data.dns.A || []).length === 0}
                                <span class="value-chip">-</span>
                            {/if}
                            {#each (data.dns.A || []) as item}
                                <span class="value-chip">{item}</span>
                            {/each}
                        </strong>
                    </div>
                    <div class="info-row">
                        <span>AAAA</span>
                        <strong class="chip-list">
                            {#if (data.dns.AAAA || []).length === 0}
                                <span class="value-chip">-</span>
                            {/if}
                            {#each (data.dns.AAAA || []) as item}
                                <span class="value-chip">{item}</span>
                            {/each}
                        </strong>
                    </div>
                    <div class="info-row">
                        <span>CNAME</span>
                        <strong class="chip-list">
                            {#if (data.dns.CNAME || []).length === 0}
                                <span class="value-chip">-</span>
                            {/if}
                            {#each (data.dns.CNAME || []) as item}
                                <span class="value-chip">{item}</span>
                            {/each}
                        </strong>
                    </div>
                    <div class="info-row">
                        <span>DNS 服务器</span>
                        <strong class="chip-list">
                            {#if (data.dns.NS || []).length === 0}
                                <span class="value-chip">-</span>
                            {/if}
                            {#each (data.dns.NS || []) as item}
                                <span class="value-chip">{item}</span>
                            {/each}
                        </strong>
                    </div>
                    {#if data.dns.GEO}
                        <div class="info-row">
                            <span>地理位置</span>
                            <strong>{data.dns.GEO.area || "-"}</strong>
                        </div>
                        <div class="info-row">
                            <span>运营商</span>
                            <strong>{data.dns.GEO.isp || "-"}</strong>
                        </div>
                    {/if}
                </div>
            </section>
        {/if}

        {#if showFeedback}
            <div class="feedback-card">
                <span>结果需要修正？</span>
                <a class="iq-link" href="mailto:yuedan.work+feedback@gmail.com?subject=Feedback%20for%20ICP%20Query%20Extension&body=Email%3A%20%3Cyour%20email%20address%2C%20optional%3E%0A*Token%3A%20%3Cyour%20token%20in%20use%3E%0A*Content%3A%20%3Cinput%20your%20suggestions%20or%20feedback%20here%3E%0A%0A%23%20In%20addition%2C%20you%20can%20also%20write%20something%20else%20to%20the%20developer%20(of%20course%20this%20is%20optional))">发送反馈</a>
                <button type="button" on:click={show_option_page}>配置显示项</button>
            </div>
        {/if}

        {#if data && data.warn}
            <Warn warn={data.warn} />
        {/if}
    {:else}
        <div class="loading-state" aria-live="polite">
            <div class="skeleton-line wide" />
            <div class="skeleton-line" />
            <div class="skeleton-card" />
            <p>正在查询当前网站信息</p>
        </div>
    {/if}
</section>

<style>
    .result-panel {
        padding: 12px;
    }

    .notice-card,
    .feedback-card,
    .state-card,
    .summary-strip,
    .result-section {
        border: 1px solid var(--iq-border);
        border-radius: var(--iq-radius-sm);
        background: var(--iq-surface);
    }

    .notice-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 10px;
        padding: 10px;
        background: var(--iq-accent-soft);
    }

    .notice-card p {
        margin: 0;
        color: var(--iq-text);
        font-size: 12px;
        line-height: 1.45;
        text-align: left;
    }

    .notice-card button,
    .feedback-card button {
        flex: 0 0 auto;
        border: 0;
        color: var(--iq-accent-strong);
        background: transparent;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
    }

    .summary-strip {
        display: grid;
        grid-template-columns: 74px minmax(0, 1fr);
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        padding: 10px 12px;
        background: var(--iq-surface-subtle);
    }

    .summary-strip span {
        color: var(--iq-text-muted);
        font-size: 12px;
    }

    .summary-strip strong {
        min-width: 0;
        overflow: hidden;
        color: var(--iq-text);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12px;
        font-weight: 750;
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .state-card {
        margin-bottom: 10px;
        padding: 14px;
        text-align: left;
    }

    .error-state {
        border-color: rgb(180 35 24 / 0.32);
        background: var(--iq-error-soft);
    }

    .state-card strong {
        display: block;
        color: var(--iq-error);
        font-size: 13px;
        line-height: 1.3;
    }

    .state-card p {
        margin: 5px 0 12px;
        color: var(--iq-text-muted);
        font-size: 12px;
        line-height: 1.5;
    }

    .state-action {
        min-height: 32px;
        padding: 0 12px;
        font-size: 12px;
    }

    .result-section + .result-section,
    .result-section + .feedback-card,
    .state-card + .result-section {
        margin-top: 10px;
    }

    .section-heading {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 10px;
        padding: 11px 12px;
        border-bottom: 1px solid var(--iq-border);
        background: var(--iq-surface-subtle);
    }

    .section-heading h2 {
        margin: 0;
        color: var(--iq-text);
        font-size: 13px;
        font-weight: 780;
        line-height: 1.2;
    }

    .section-heading span {
        color: var(--iq-text-soft);
        font-size: 11px;
        white-space: nowrap;
    }

    .row-list {
        padding: 2px 12px;
    }

    .info-row {
        display: grid;
        grid-template-columns: 72px minmax(0, 1fr);
        gap: 12px;
        padding: 9px 0;
    }

    .info-row + .info-row {
        border-top: 1px solid rgb(148 163 184 / 0.18);
    }

    .info-row > span {
        color: var(--iq-text-muted);
        font-size: 12px;
        line-height: 1.45;
        text-align: left;
    }

    .info-row > strong {
        min-width: 0;
        color: var(--iq-text);
        font-size: 12px;
        font-weight: 650;
        line-height: 1.45;
        text-align: right;
        word-break: break-word;
    }

    .chip-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 5px;
    }

    .value-chip {
        display: inline-flex;
        align-items: center;
        max-width: 100%;
        padding: 3px 7px;
        border: 1px solid var(--iq-border);
        border-radius: 999px;
        color: var(--iq-text);
        background: var(--iq-surface-subtle);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 11px;
        font-weight: 650;
        line-height: 1.2;
        overflow-wrap: anywhere;
    }

    .empty-copy {
        margin: 0;
        padding: 14px 12px;
        color: var(--iq-text-muted);
        font-size: 12px;
        line-height: 1.5;
        text-align: left;
    }

    .feedback-card {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 10px;
        padding: 10px 12px;
        color: var(--iq-text-muted);
        font-size: 12px;
        line-height: 1.4;
    }

    .feedback-card span {
        margin-right: auto;
    }

    .loading-state {
        padding: 18px 12px 20px;
    }

    .loading-state p {
        margin: 14px 0 0;
        color: var(--iq-text-muted);
        font-size: 12px;
        text-align: center;
    }

    .skeleton-line,
    .skeleton-card {
        overflow: hidden;
        position: relative;
        border-radius: 999px;
        background: var(--iq-surface-muted);
    }

    .skeleton-line {
        width: 56%;
        height: 12px;
        margin: 0 auto 9px;
    }

    .skeleton-line.wide {
        width: 78%;
    }

    .skeleton-card {
        height: 118px;
        margin-top: 14px;
        border-radius: var(--iq-radius-sm);
    }

    .skeleton-line::after,
    .skeleton-card::after {
        content: "";
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.52), transparent);
        animation: shimmer 1.4s ease-in-out infinite;
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .skeleton-line::after,
        .skeleton-card::after {
            animation: none;
        }
    }

    @media (max-width: 340px) {
        .result-panel {
            padding: 10px;
        }

        .info-row {
            grid-template-columns: 64px minmax(0, 1fr);
            gap: 8px;
        }

        .section-heading span {
            display: none;
        }
    }
</style>
