const default_options = {
    api_url: "https://wrrh68.lafyun.com/icp?token=637e79b77fd9b2915dfb7e6c",  // API with a trial token
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
