import { DEFAULT_OPTIONS } from "./default-data";

chrome.runtime.onInstalled.addListener((res) => {
    // https://developer.chrome.com/docs/extensions/reference/tabs/#opening-an-extension-page-in-a-new-tab
    if (res.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.storage.sync.set(
            {
                options: DEFAULT_OPTIONS,
            },
        );
        chrome.runtime.openOptionsPage()
    }
});

import { AllICPSuffix } from "./icp-suffix";
import icon_grey from "url:~assets/icon_grey.png"
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete") return
    const { hostname } = new URL(tab.url)
    if (!AllICPSuffix.find(e => hostname.endsWith(e))) {
        chrome.action.setIcon({path: icon_grey, tabId})
    }
})
