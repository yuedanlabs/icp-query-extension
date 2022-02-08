const default_options = {
    api_url: "https://icp-query.ss-work.workers.dev/icp",
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set(
        {
            options: default_options,
        },
    );
});
