/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated(n) {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
}

browser.contextMenus.remove("user-add", function () {
    browser.contextMenus.create({
        id: "user-add",
        title: browser.i18n.getMessage("contextMenuUserAdd"),
        contexts: ["page"]
    }, onCreated);
});

browser.contextMenus.remove("user-remove", function () {
    browser.contextMenus.create({
        id: "user-remove",
        title: browser.i18n.getMessage("contextMenuUserRemove"),
        contexts: ["page"]
    }, onCreated);
});

function checkSiteUrl(pageUrl) {
    return /ruliweb.com/.test(pageUrl);
}

function addUserToBlockList(userId) {
    if (userId) {
        function getStorageSuccess(result) {
            var ignoreIds = result.ignore_ids || "";
            if (result.ignore_ids) {
                ignoreIds += ",";
            }
            ignoreIds += userId;
            browser.storage.local.set({
                ignore_ids: ignoreIds
            }).then(saveStorageSuccess, storageFailure);
        }

        function saveStorageSuccess(result) {
            document.location.reload();
        }

        function storageFailure() {
            console.log("error");
        }

        if (/(\d)/.test(userId)) {
            userId = userId.match(/([^\(])[0-9]*([^\)])/g);
            browser.storage.local.get("ignore_ids").then(getStorageSuccess, storageFailure);
        }
    }
}

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
function listener(info, tab) {
    if (info && checkSiteUrl(info.pageUrl)) {
        switch (info.menuItemId) {
            case "user-add":
                console.log(info);
                // console.log(info.selectionText);
                addUserToBlockList(info.selectionText);
                break;
            case "user-remove":
                console.log(info.selectionText);
                break;
        }
    }
}

if (!browser.contextMenus.onClicked.hasListener(listener)) {
    browser.contextMenus.onClicked.addListener(listener);
}
