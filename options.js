function saveOptions(e) {
    if (e.defaultPrevented) {
        return;
    }

    function onSave(result) {
        document.querySelector("#ignore_ids").value = result.ignore_ids;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var ignoreIds = document.querySelector("#ignore_ids").value;
    ignoreIds = ignoreIds.replace(/ /g, "");

    var setting = browser.storage.local.set({
        ignore_ids: ignoreIds
    });
    setting.then(onSave, onError);
}

function restoreOptions() {
    function onGot(result) {
        document.querySelector("#ignore_ids").value = result.ignore_ids || "";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get("ignore_ids");
    getting.then(onGot, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);