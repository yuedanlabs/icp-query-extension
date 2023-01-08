<script lang="ts">
    let data: object;
    let showFeedback: boolean;

    async function fetch_data(API: string, domain: string) {
        const url = new URL(API)
        url.searchParams.append("url", domain)
        const res = await fetch(url);
        if (res.ok) {
            return res.json();
        }
    }

    chrome.storage.sync.get("options", function (res) {
        if (res.options && res.options.api_url != "") {
            showFeedback = 'show_feedback' in res.options ? res.options.show_feedback : true
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
</script>

{#if data}
    {#if data.msg}
        <p>{data.msg}</p>
    {:else}
        <table>
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
    {/if}

    {#if showFeedback}
        <hr>
        <div class="feedback">
            <span>结果不满意?</span>
            <a href="mailto:yuedan.work+feedback@gmail.com?subject=Feedback%20for%20ICP%20Query%20Extension&body=Email%3A%20%3Cyour%20email%20address%2C%20optional%3E%0A*Token%3A%20%3Cyour%20token%20in%20use%3E%0A*Content%3A%20%3Cinput%20your%20suggestions%20or%20feedback%20here%3E%0A%0A%23%20In%20addition%2C%20you%20can%20also%20write%20something%20else%20to%20the%20developer%20(of%20course%20this%20is%20optional))">点击反馈</a>
        </div>
    {/if}
{:else}
    <p>...waiting</p>
{/if}

<style>
    table {
        margin: auto;
    }

    .head {
        display: inline-block;
        width: 3rem;
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
