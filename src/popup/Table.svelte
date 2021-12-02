<script lang="ts">
    import { API } from "../config";
    let data: object;
    $: chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let domain = new URL(tabs[0].url).hostname;
        fetch(`${API}?url=${domain}`)
            .then(res => {
                if (res.status == 200) {
                    return res.json();
                }
            })
            .then(res => {
                data = res;
            });
    });
</script>

{#if data}
    {#if data.msg}
        <p>{data.msg}</p>
    {:else}
        <table>
            <tbody>
                <tr>
                    <td class="head">备案名称</td>
                    <td class="text">{data.website.name}</td>
                </tr>
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
