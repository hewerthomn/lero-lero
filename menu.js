document.addEventListener('DOMContentLoaded', function () {

    var selects = document.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
        var select = selects[i];
        select.addEventListener('change', function(){
            var setting = {};
            setting[this['id']] = this['value'];
            chrome.storage.local.set(setting);
        });
        chrome.storage.local.get(select["id"], function(data) {
            select.value = data[select["id"]];
        });
    }

});