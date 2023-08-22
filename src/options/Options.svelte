<script lang="ts">
    import type { Options } from "~types"
    import { Button, Toast, Switch } from 'stdf';

    let options: Options = {
        api_url: "",
        show_feedback: true,
        show_whois: true,
        show_dns: true,
        show_icp: true,
    };
    let show_status = false;
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
                show_status = true;
            }
        );
    }

    chrome.storage.sync.get("options", function (res) {
        if (res.options) {
            options = res.options;
        }
    });
</script>

<div class="container max-w-xl mx-auto">
    <h2 class="text-xl text-slate-800 font-bold">Options</h2>
    <label class="flex items-center justify-between p-4 mx-2 my-4 shadow-sm">
        <span class="font-medium">ICP API URL</span>
        <div class="w-3/4 space-y-2">
            <input type="text" class="form-input text-xs w-full" bind:value={options.api_url} placeholder="Input Your ICP API URL Here">
            <p class="text-red-400 text-start">{validation}</p>
        </div>
    </label>

    <div class="flex items-center justify-between p-4 mx-2 my-4 shadow-sm">
        <span class="font-medium">Show Feedback</span>
        <Switch bind:check={options.show_feedback} injClass="bg-success dark:bg-success" />
    </div>

    <div class="flex items-center justify-between p-4 mx-2 my-4 shadow-sm">
        <span class="font-medium">Show Whois</span>
        <Switch bind:check={options.show_whois} injClass="bg-success dark:bg-success" />
    </div>

    <div class="flex items-center justify-between p-4 mx-2 my-4 shadow-sm">
        <span class="font-medium">Show DNS</span>
        <Switch bind:check={options.show_dns} injClass="bg-success dark:bg-success" />
    </div>

    <div class="flex items-center justify-between p-4 mx-2 my-4 shadow-sm">
        <span class="font-medium">Show ICP</span>
        <Switch bind:check={options.show_icp} injClass="bg-success dark:bg-success" />
    </div>

    <div class="flex items-center justify-between p-4 mx-2 my-4 shadow-sm">
        <span class="font-medium">Show GongAn Record</span>
        <span class="text-success text-start">coming soon...</span>
        <Switch disabled />
    </div>

    <Toast bind:visible={show_status} message="Options saved" position="top" py="40" />
    <Button state="success" size="sm" on:click={save_options}>Save</Button>
</div>
