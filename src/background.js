const default_options = {
    api_url: "https://icp-query.ss-work.workers.dev/icp",
};

chrome.runtime.onInstalled.addListener((res) => {
    // https://developer.chrome.com/docs/extensions/reference/tabs/#opening-an-extension-page-in-a-new-tab
    if (res.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.storage.sync.set(
            {
                options: default_options,
            },
        );
        chrome.tabs.create({
            url: "options/index.html",
        });
    }
});
