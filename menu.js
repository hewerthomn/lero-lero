document.addEventListener('DOMContentLoaded', function () {

    var selects = document.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
        selects[i].addEventListener('change', function(){
            var setting = {};
            setting[this['id']] = this['value'];
            chrome.storage.local.set(setting);
        });
    }

    chrome.storage.local.get('tipo', function(data) {
        document.getElementById("tipo").value = data.tipo;
    });

});