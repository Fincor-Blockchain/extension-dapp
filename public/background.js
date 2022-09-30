/*global chrome*/

chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("refresh", { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    helloWorld();
});

function helloWorld() {}
