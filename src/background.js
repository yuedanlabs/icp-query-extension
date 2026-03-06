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
import icon from "url:~assets/icon.png"

const parseHostname = (rawUrl) => {
    if (!rawUrl) return null
    try {
        const url = new URL(rawUrl)
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            return null
        }
        return url.hostname
    } catch (e) {
        return null
    }
}

const hasIcpSuffix = (hostname) => {
    return AllICPSuffix.some((suffix) => hostname.endsWith(suffix))
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete") return
    const hostname = parseHostname(tab?.url)
    if (!hostname) {
        chrome.action.setIcon({ path: icon_grey, tabId })
        return
    }
    chrome.action.setIcon({ path: hasIcpSuffix(hostname) ? icon : icon_grey, tabId })
})
