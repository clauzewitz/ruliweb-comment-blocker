function onError(error) {
    console.log(`Error: ${error}`);
}

function onGot(result) {
    var ignore_ids;
    if (result instanceof Array) {
        ignore_ids = result[0].ignore_ids;
    } else {
        ignore_ids = result.ignore_ids;
    }
    if (!ignore_ids) {
        return;
    }
    var idList = ignore_ids.split(",");
    if (1 > idList.length) {
        return;
    }
    var listGroup = document.querySelector(".comment_view_wrapper");
    var i;
    if (!!listGroup) {
        var nicknames = listGroup.querySelectorAll("input.member_srl");
        if (!!nicknames) {
            for (var i = 0; i < nicknames.length; i++) {
                var nid = nicknames[i].getAttribute("value");
                if (idList.indexOf(nid) > -1) {
                // console.log(listGroup.querySelector(".comment_element:nth-child(" + (i + 1) + ")"));
                    nicknames[i].parentElement.parentElement.parentElement.remove();
                }
            }
        }
    }
}

var getting = browser.storage.local.get("ignore_ids");
getting.then(onGot, onError);