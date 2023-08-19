<script lang="ts">
    import type { Data } from "~types"
    import Loader from "./loader.svelte";
    import { Divider, NoticeBar, Icon } from 'stdf';
    import Warn from "./warn.svelte"
    import { DEFAULT_DEMO_DATA } from "~default-data";
    let data: Data;
    let showFeedback: boolean;
    let showWhois: boolean;
    let showDNS: boolean;
    let showICP: boolean;
    let showNotice = true;

    async function fetch_data(API: string, domain: string) {
        if (process.env.NODE_ENV === "development" && process.env.PLASMO_TAG === "dev") return DEFAULT_DEMO_DATA
        const url = new URL(API)
        url.searchParams.append("url", domain)
        url.searchParams.append("version", "2")
        if (showWhois) {
            url.searchParams.append("whois", "1")
        }
        if (showDNS) {
            url.searchParams.append("dns", "1")
        }
        if (showICP) {
            url.searchParams.append("icp", "1")
        }
        const res = await fetch(url);
        if (res.ok || res.status === 429) {
            return res.json();
        }
    }

    chrome.storage.sync.get("options", function (res) {
        if (res.options && res.options.api_url != "") {
            showFeedback = 'show_feedback' in res.options ? res.options.show_feedback : true
            showWhois = 'show_whois' in res.options ? res.options.show_whois : true
            showDNS = 'show_dns' in res.options ? res.options.show_dns: true
            showICP = 'show_icp' in res.options ? res.options.show_icp: true
            chrome.tabs.query(
                { active: true, currentWindow: true },
                async function (tabs) {
                    let domain = new URL(tabs[0].url).hostname;
                    const result = await fetch_data(res.options.api_url, domain);
                    data = Array.isArray(result) ? result[0] : result
                }
            );
        } else {
            data = { msg: "请先配置API" };
        }
    });

    // notice setting
    chrome.storage.local.get("show_notice").then((res)=>{
        showNotice = (res.show_notice?.version >= 10000 && res.show_notice.value === false) ? false : true
    })
    const close_notice = () => {
        chrome.storage.local.set({show_notice: {
            version: 10000,
            value: false,
        }})
    }

    const show_option_page = () => {
        chrome.runtime.openOptionsPage()
    }
</script>

{#if showNotice}
    <NoticeBar leftIcon="slot" fontSize="xs" injClass="text-success bg-success/10 mt-2" textList={['本次更新，默认显示当前网站域名的 ICP 信息，如不需要，可前往配置（选项）页面关闭']} on:clickright={close_notice}>🥳</NoticeBar>
{/if}

{#if data}
    {#if data.msg}
        <p>{data.msg}</p>
    {/if}

    {#if showICP && data.icp}
        <Divider text="ICP" />
        {#if data.icp.subject && data.icp.website}
            <table class="min-w-[260px]">
                <tbody>
                    <!-- <tr>
                        <td class="head">备案名称</td>
                        <td class="text">{data.website.name}</td>
                    </tr> -->
                    <tr>
                        <td class="head">备案类型</td>
                        <td class="text">{data.icp.subject.nature}</td>
                    </tr>
                    <tr>
                        <td class="head">主办方</td>
                        {#if data.icp.subject.nature === "企业"}
                            <td class="text"><a class="underline decoration-1 hover:decoration-2 underline-offset-4 hover:text-success" href="https://www.tianyancha.com/search?key={data.icp.subject.name}" target="_blank" rel="noopener noreferrer">{data.icp.subject.name}<svg class="icon mx-[2px] inline-block" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M137.54 186.36a8 8 0 0 1 0 11.31l-9.94 10a56 56 0 0 1-79.22-79.27l24.12-24.12a56 56 0 0 1 76.81-2.28a8 8 0 1 1-10.64 12a40 40 0 0 0-54.85 1.63L59.7 139.72a40 40 0 0 0 56.58 56.58l9.94-9.94a8 8 0 0 1 11.32 0Zm70.08-138a56.08 56.08 0 0 0-79.22 0l-9.94 9.95a8 8 0 0 0 11.32 11.31l9.94-9.94a40 40 0 0 1 56.58 56.58l-24.12 24.14a40 40 0 0 1-54.85 1.6a8 8 0 1 0-10.64 12a56 56 0 0 0 76.81-2.26l24.12-24.12a56.08 56.08 0 0 0 0-79.24Z"/></svg></a></td>
                        {:else}
                            <td class="text">{data.icp.subject.name}</td>
                        {/if}
                    </tr>
                    <tr>
                        <td class="head">备案号</td>
                        <td class="text">{data.icp.subject.license}</td>
                    </tr>
                    <tr>
                        <td class="head">备案日期</td>
                        <td class="text">{(new Date(data.icp.subject.updateTime)).toLocaleDateString()}</td>
                    </tr>
                </tbody>
            </table>
        {:else}
            <p>{data.icp.msg}</p>
        {/if}
    {/if}

        {#if showWhois && data.whois}
            <Divider text="WHOIS" />
            <table class="min-w-[260px]">
                <tbody>
                    <tr>
                        <td class="head">域名状态</td>
                        <td class="text">
                            {#each data.whois["Domain Status"].map(e=>e.split(' ')[0]) as item, i}
                                <li>{item}</li>
                            {/each}</td>
                    </tr>
                    <tr>
                        <td class="head">DNS 服务器</td>
                        <td class="text">
                            {#each data.whois["Name Server"] as item, i}
                                <li>{item}</li>
                            {/each}
                        </td>
                    </tr>
                    <tr>
                        <td class="head">注册日期</td>
                        <td class="text">{data.whois["Created Date"]}</td>
                    </tr>
                    <tr>
                        <td class="head">更新日期</td>
                        <td class="text">{data.whois["Updated Date"] || "-"}</td>
                    </tr>
                    <tr>
                        <td class="head">截止日期</td>
                        <td class="text">{data.whois["Expiry Date"]}</td>
                    </tr>
                    <tr>
                        <td class="head">注册商</td>
                        <td class="text">{data.whois["Registrar"]}</td>
                    </tr>
                    <tr>
                        <td class="head">所属机构</td>
                        <td class="text">{data.whois["Registrant Organization"] || "-"}</td>
                    </tr>
                    <tr>
                        <td class="head">注册属地</td>
                        <td class="text">{data.whois["Registrant Country"] || "-"}</td>
                    </tr>
                </tbody>
            </table>
        {/if}

        {#if showDNS && data.dns}
            <Divider text="DNS" />
            <table class="min-w-[260px]">
                <tbody>
                    <tr>
                        <td class="head">A</td>
                        <td class="text">
                            {#if data.dns.A.length === 0}
                                <span>-</span>
                            {/if}
                            {#each data.dns.A as item, i}
                                <li>{item}</li>
                            {/each}</td>
                    </tr>
                    <tr>
                        <td class="head">AAAA</td>
                        <td class="text">
                            {#if data.dns.AAAA.length === 0}
                                <span>-</span>
                            {/if}
                            {#each data.dns.AAAA as item, i}
                                <li>{item}</li>
                            {/each}
                        </td>
                    </tr>
                    <tr>
                        <td class="head">CNAME</td>
                        <td class="text">
                            {#if data.dns.CNAME.length === 0}
                                <span>-</span>
                            {/if}
                            {#each data.dns.CNAME as item, i}
                                <li>{item}</li>
                            {/each}
                        </td>
                    </tr>
                    <tr>
                        <td class="head">DNS 服务器</td>
                        <td class="text">
                            {#if data.dns.NS.length === 0}
                                <span>-</span>
                            {/if}
                            {#each data.dns.NS as item, i}
                                <li>{item}</li>
                            {/each}
                        </td>
                    </tr>
                    {#if data.dns.GEO}
                        <tr>
                            <td class="head">地理位置</td>
                            <td class="text">
                                {data.dns.GEO.area || '-'}
                            </td>
                        </tr>
                        <tr>
                            <td class="head">运营商</td>
                            <td class="text">
                                {data.dns.GEO.isp || '-'}
                            </td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        {/if}

    {#if showFeedback}
        <Divider text="FEEDBACK" />
        <div class="feedback">
            <span>结果不满意?</span>
            <a href="mailto:yuedan.work+feedback@gmail.com?subject=Feedback%20for%20ICP%20Query%20Extension&body=Email%3A%20%3Cyour%20email%20address%2C%20optional%3E%0A*Token%3A%20%3Cyour%20token%20in%20use%3E%0A*Content%3A%20%3Cinput%20your%20suggestions%20or%20feedback%20here%3E%0A%0A%23%20In%20addition%2C%20you%20can%20also%20write%20something%20else%20to%20the%20developer%20(of%20course%20this%20is%20optional))">点击反馈</a>
            <button on:click={show_option_page} class="ml-4">
                <Icon name='ri-close-line' size="16" />
            </button>
        </div>
    {/if}

    {#if data && data.warn}
        <Warn warn={data.warn} />
    {/if}
{:else}
    <Loader />
    <p>...waiting...</p>
{/if}

<style>
    table {
        margin: auto;
    }

    .head {
        display: inline-block;
        width: 3.5rem;
        text-align: justify;
        text-align-last: justify;
    }

    .text {
        font-size: 10px;
        opacity: 0.6;
    }

    .feedback {
        font-size: xx-small;
        opacity: 0.6;
        color: blue;
    }
</style>
