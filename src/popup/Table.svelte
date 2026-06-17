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
        <div class="notice-line">
            <p>默认显示当前网站 ICP 信息，可在设置中关闭。</p>
            <button type="button" on:click={close_notice}>知道了</button>
        </div>
    {/if}

    {#if data}
        <div class="domain-row">
            <span>当前域名</span>
            <strong>{currentDomain || "未检测到域名"}</strong>
        </div>

        {#if data.msg}
            <div class="state-panel error-state">
                <strong>查询未完成</strong>
                <p>{data.msg}</p>
                <button type="button" class="iq-button iq-button-secondary state-action" on:click={show_option_page}>检查设置</button>
            </div>
        {/if}

        {#if showICP && data.icp}
            <section class="detail-section">
                <div class="section-divider"><span>ICP</span></div>
                {#if data.icp.subject && data.icp.website}
                    <div class="detail-list">
                        <div class="detail-row">
                            <span class="row-label">备案类型</span>
                            <strong class="row-value">{data.icp.subject.nature}</strong>
                        </div>
                        <div class="detail-row">
                            <span class="row-label">主办方</span>
                            <strong class="row-value accent-value">
                                {#if data.icp.subject.nature === "企业"}
                                    <a class="iq-link" href="https://www.tianyancha.com/search?key={data.icp.subject.name}" target="_blank" rel="noopener noreferrer">{data.icp.subject.name}</a>
                                {:else}
                                    {data.icp.subject.name}
                                {/if}
                            </strong>
                        </div>
                        <div class="detail-row">
                            <span class="row-label">备案号</span>
                            <strong class="row-value">{data.icp.subject.license}</strong>
                        </div>
                        <div class="detail-row">
                            <span class="row-label">备案日期</span>
                            <strong class="row-value">{formatDate(data.icp.subject.updateTime)}</strong>
                        </div>
                    </div>
                {:else}
                    <p class="empty-copy">{data.icp.msg || "未返回 ICP 备案信息"}</p>
                {/if}
            </section>
        {/if}

        {#if showWhois && data.whois}
            <section class="detail-section">
                <div class="section-divider"><span>WHOIS</span></div>
                <div class="detail-list">
                    <div class="detail-row list-row">
                        <span class="row-label">域名状态</span>
                        <div class="row-values">
                            {#if (data.whois["Domain Status"] || []).length === 0}
                                <strong class="row-value empty-value">-</strong>
                            {/if}
                            {#each (data.whois["Domain Status"] || []) as item}
                                <span class="list-value">{formatDomainStatus(item)}</span>
                            {/each}
                        </div>
                    </div>
                    <div class="detail-row list-row">
                        <span class="row-label multiline-label">DNS 服务器</span>
                        <div class="row-values mono-values">
                            {#if (data.whois["Name Server"] || []).length === 0}
                                <strong class="row-value empty-value">-</strong>
                            {/if}
                            {#each (data.whois["Name Server"] || []) as item}
                                <span class="list-value">{item}</span>
                            {/each}
                        </div>
                    </div>
                    <div class="detail-row">
                        <span class="row-label">注册日期</span>
                        <strong class="row-value">{formatDateTime(data.whois["Created Date"])}</strong>
                    </div>
                    <div class="detail-row">
                        <span class="row-label">更新日期</span>
                        <strong class="row-value">{formatDateTime(data.whois["Updated Date"])}</strong>
                    </div>
                    <div class="detail-row">
                        <span class="row-label">截止日期</span>
                        <strong class="row-value">{formatDateTime(data.whois["Expiry Date"])}</strong>
                    </div>
                    <div class="detail-row">
                        <span class="row-label">注册商</span>
                        <strong class="row-value">{data.whois["Registrar"] || "-"}</strong>
                    </div>
                    <div class="detail-row">
                        <span class="row-label">所属机构</span>
                        <strong class="row-value">{data.whois["Registrant Organization"] || "-"}</strong>
                    </div>
                    <div class="detail-row">
                        <span class="row-label">注册属地</span>
                        <strong class="row-value">{data.whois["Registrant Country"] || "-"}</strong>
                    </div>
                </div>
            </section>
        {/if}

        {#if showDNS && data.dns}
            <section class="detail-section">
                <div class="section-divider"><span>DNS</span></div>
                <div class="detail-list">
                    <div class="detail-row list-row">
                        <span class="row-label">A</span>
                        <div class="row-values mono-values">
                            {#if (data.dns.A || []).length === 0}
                                <strong class="row-value empty-value">-</strong>
                            {/if}
                            {#each (data.dns.A || []) as item}
                                <span class="list-value">{item}</span>
                            {/each}
                        </div>
                    </div>
                    <div class="detail-row list-row">
                        <span class="row-label">AAAA</span>
                        <div class="row-values mono-values">
                            {#if (data.dns.AAAA || []).length === 0}
                                <strong class="row-value empty-value">-</strong>
                            {/if}
                            {#each (data.dns.AAAA || []) as item}
                                <span class="list-value">{item}</span>
                            {/each}
                        </div>
                    </div>
                    <div class="detail-row list-row">
                        <span class="row-label">CNAME</span>
                        <div class="row-values mono-values">
                            {#if (data.dns.CNAME || []).length === 0}
                                <strong class="row-value empty-value">-</strong>
                            {/if}
                            {#each (data.dns.CNAME || []) as item}
                                <span class="list-value">{item}</span>
                            {/each}
                        </div>
                    </div>
                    <div class="detail-row list-row">
                        <span class="row-label multiline-label">DNS 服务器</span>
                        <div class="row-values mono-values">
                            {#if (data.dns.NS || []).length === 0}
                                <strong class="row-value empty-value">-</strong>
                            {/if}
                            {#each (data.dns.NS || []) as item}
                                <span class="list-value">{item}</span>
                            {/each}
                        </div>
                    </div>
                    {#if data.dns.GEO}
                        <div class="detail-row">
                            <span class="row-label">地理位置</span>
                            <strong class="row-value">{data.dns.GEO.area || "-"}</strong>
                        </div>
                        <div class="detail-row">
                            <span class="row-label">运营商</span>
                            <strong class="row-value">{data.dns.GEO.isp || "-"}</strong>
                        </div>
                    {/if}
                </div>
            </section>
        {/if}

        {#if showFeedback}
            <div class="feedback-line">
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
            <div class="skeleton-block" />
            <p>正在查询当前网站信息</p>
        </div>
    {/if}
</section>

<style>
    .result-panel {
        padding: 2px 18px 14px;
    }

    .notice-line {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 10px;
        margin: 2px 0 12px;
        padding: 8px 0 10px;
        border-bottom: 1px solid var(--iq-border);
    }

    .notice-line p {
        margin: 0;
        color: var(--iq-text-muted);
        font-size: 11.5px;
        line-height: 1.45;
        text-align: left;
    }

    .notice-line button,
    .feedback-line button {
        border: 0;
        color: var(--iq-accent-strong);
        background: transparent;
        font-size: 11.5px;
        font-weight: 700;
        cursor: pointer;
    }

    .domain-row {
        display: grid;
        grid-template-columns: 72px minmax(0, 1fr);
        align-items: baseline;
        gap: 16px;
        padding: 6px 0 8px;
        border-bottom: 1px solid var(--iq-border);
    }

    .domain-row span {
        color: var(--iq-text-soft);
        font-size: 11.5px;
        line-height: 1.4;
        text-align: left;
    }

    .domain-row strong {
        min-width: 0;
        overflow: hidden;
        color: var(--iq-text);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12px;
        font-weight: 750;
        line-height: 1.35;
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .state-panel {
        margin-top: 12px;
        padding: 12px 0 14px;
        border-bottom: 1px solid var(--iq-border);
        text-align: left;
    }

    .error-state strong {
        display: block;
        color: var(--iq-error);
        font-size: 13px;
        line-height: 1.3;
    }

    .state-panel p {
        margin: 5px 0 12px;
        color: var(--iq-text-muted);
        font-size: 12px;
        line-height: 1.5;
    }

    .state-action {
        min-height: 30px;
        padding: 0 12px;
        font-size: 12px;
    }

    .detail-section {
        margin-top: 16px;
    }

    .section-divider {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        align-items: center;
        gap: 12px;
        margin: 0 0 12px;
        color: var(--iq-text-soft);
        font-size: 12.5px;
        font-weight: 750;
        line-height: 1;
        text-align: center;
    }

    .section-divider::before,
    .section-divider::after {
        content: "";
        height: 1px;
        background: var(--iq-border);
    }

    .section-divider span {
        min-width: 42px;
    }

    .detail-list {
        display: grid;
        gap: 0;
    }

    .detail-row {
        display: grid;
        grid-template-columns: 94px minmax(0, 1fr);
        gap: 18px;
        align-items: start;
        padding: 5px 0;
    }

    .row-label {
        color: var(--iq-text);
        font-size: 13px;
        font-weight: 760;
        line-height: 1.45;
        text-align: left;
        white-space: nowrap;
    }

    .multiline-label {
        white-space: normal;
    }

    .row-value {
        min-width: 0;
        color: var(--iq-text-muted);
        font-size: 13px;
        font-weight: 520;
        line-height: 1.45;
        text-align: right;
        overflow-wrap: anywhere;
        word-break: break-word;
    }

    .accent-value {
        color: var(--iq-accent-strong);
        font-weight: 680;
    }

    .row-values {
        display: grid;
        min-width: 0;
        gap: 3px;
    }

    .list-value {
        display: grid;
        grid-template-columns: 18px minmax(0, 1fr);
        align-items: start;
        min-width: 0;
        color: var(--iq-text-muted);
        font-size: 13px;
        font-weight: 520;
        line-height: 1.45;
        text-align: left;
        overflow-wrap: anywhere;
        word-break: break-word;
    }

    .list-value::before {
        content: "";
        width: 4px;
        height: 4px;
        margin-top: 0.58em;
        border-radius: 50%;
        background: var(--iq-text-soft);
        justify-self: center;
        opacity: 0.82;
    }

    .mono-values .list-value,
    .domain-row strong {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12.3px;
        letter-spacing: 0;
    }

    .empty-value {
        display: block;
        text-align: right;
    }

    .empty-copy {
        margin: 0;
        padding: 1px 0 4px;
        color: var(--iq-text-muted);
        font-size: 12px;
        line-height: 1.5;
        text-align: center;
    }

    .feedback-line {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto auto;
        align-items: center;
        gap: 9px;
        margin-top: 18px;
        padding-top: 11px;
        border-top: 1px solid var(--iq-border);
        color: var(--iq-text-muted);
        font-size: 11.5px;
        line-height: 1.4;
    }

    .feedback-line span {
        min-width: 0;
    }

    .loading-state {
        padding: 18px 0 22px;
    }

    .loading-state p {
        margin: 14px 0 0;
        color: var(--iq-text-muted);
        font-size: 12px;
        text-align: center;
    }

    .skeleton-line,
    .skeleton-block {
        overflow: hidden;
        position: relative;
        border-radius: 999px;
        background: var(--iq-surface-muted);
    }

    .skeleton-line {
        width: 56%;
        height: 10px;
        margin: 0 auto 9px;
    }

    .skeleton-line.wide {
        width: 78%;
    }

    .skeleton-block {
        height: 112px;
        margin-top: 14px;
        border-radius: 8px;
    }

    .skeleton-line::after,
    .skeleton-block::after {
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
        .skeleton-block::after {
            animation: none;
        }
    }

    @media (max-width: 340px) {
        .result-panel {
            padding: 2px 14px 12px;
        }

        .detail-row {
            grid-template-columns: 78px minmax(0, 1fr);
            gap: 12px;
        }

        .row-label,
        .row-value,
        .list-value {
            font-size: 12px;
        }
    }
</style>
