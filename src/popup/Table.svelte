<script lang="ts">
    import type { Data } from "~types"
    import Loader from "./loader.svelte";
    import { Divider, NoticeBar, Icon } from 'stdf';
    import Warn from "./warn.svelte"
    let data: Data;
    let showFeedback: boolean;
    let showWhois: boolean;
    let showDNS: boolean;
    let showNotice = true;

    async function fetch_data(API: string, domain: string) {
        const url = new URL(API)
        url.searchParams.append("url", domain)
        if (showWhois) {
            url.searchParams.append("whois", "1")
        }
        if (showDNS) {
            url.searchParams.append("dns", "1")
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
    <NoticeBar leftIcon="slot" fontSize="xs" injClass="text-success bg-success/10 mt-2" textList={['本次更新了一些重要功能，可以查看当前网站域名的 whois 信息，默认启用，如不需要，可前往配置（选项）页面关闭']} on:clickright={close_notice}>🥳</NoticeBar>
{/if}

{#if data}
    {#if data.msg}
        <p>{data.msg}</p>
    {:else}
        <Divider text="ICP" />
        <table class="min-w-[260px]">
            <tbody>
                <!-- <tr>
                    <td class="head">备案名称</td>
                    <td class="text">{data.website.name}</td>
                </tr> -->
                <tr>
                    <td class="head">备案类型</td>
                    <td class="text">{data.subject.nature}</td>
                </tr>
                <tr>
                    <td class="head">主办方</td>
                    <td class="text">{data.subject.name}</td>
                </tr>
                <tr>
                    <td class="head">备案号</td>
                    <td class="text">{data.subject.license}</td>
                </tr>
                <tr>
                    <td class="head">备案日期</td>
                    <td class="text">{(new Date(data.subject.updateTime)).toLocaleDateString()}</td>
                </tr>
            </tbody>
        </table>

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
                </tbody>
            </table>
        {/if}
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
