<script lang="ts">
    let options = {
        api_url: "",
    };
    let status_text = "";
    let validation = "";

    function save_options() {
        validation = "";
        if (options.api_url.length < 8) {
            validation = "Please enter a valid URL";
            return false;
        }
        if (
            options.api_url.substring(0, 7) != "http://" &&
            options.api_url.substring(0, 8) != "https://"
        ) {
            validation = "Please enter a valid URL";
            return false;
        }
        chrome.storage.sync.set(
            {
                options: options,
            },
            function () {
                // Update status to let user know options were saved.
                status_text = "Options saved.";
                setTimeout(function () {
                    status_text = "";
                }, 750);
            }
        );
    }

    chrome.storage.sync.get("options", function (res) {
        if (res.options) {
            options = res.options;
        }
    });
</script>

<div>
    <table>
        <tr>
            <td class="table head">ICP API URL:</td>
            <td class="table"
                ><textarea
                    id="icp_api_url"
                    name="icp_api_url"
                    rows="3"
                    cols="33"
                    bind:value={options.api_url}
                    placeholder="Input Your ICP API URL Here"
                /></td
            >
            <td class="table" style="color: red;">{validation}</td>
        </tr>
        <tr>
            <td class="table head">Set API To:</td>
            <td class="table"
                ><span id="icp_api_url_result" style="color: red;"
                    >{options.api_url}</span
                ></td
            >
        </tr>
    </table>

    <br />
    <div id="status" class="status">{status_text}</div>
    <button id="save" on:click={save_options}>Save</button>
</div>

<style>
    table {
        margin: auto;
        margin-top: 2rem;
    }

    .table {
        margin: 1rem;
    }

    .head {
        display: inline-block;
        width: 5rem;
        text-align: justify;
        text-align-last: justify;
    }

    .status {
        color: red;
        font-size: medium;
        margin: 2rem;
    }
</style>
