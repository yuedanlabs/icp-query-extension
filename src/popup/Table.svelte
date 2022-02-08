<script lang="ts">
    let data: object;

    async function fetch_data(API: string, domain: string) {
        let res = await fetch(`${API}?url=${domain}`);
        if (res.status == 200) {
            return res.json();
        }
    }

    chrome.storage.sync.get("options", function (res) {
        if (res.options && res.options.api_url != "") {
            chrome.tabs.query(
                { active: true, currentWindow: true },
                async function (tabs) {
                    let domain = new URL(tabs[0].url).hostname;
                    data = await fetch_data(res.options.api_url, domain);
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
            </tbody>
        </table>
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
</style>
