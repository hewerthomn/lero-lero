$(function(){
	function rand(a) {
        return a[Math.floor(Math.random() * a.length)];
	}

	var editable = null;
	$("html").on("mousedown", "input, textarea", function(){
		editable = $(this);
	})

    var messageType = "lerolero";
    chrome.storage.local.get('tipo', function(data) {
        messageType = data.tipo;
        chrome.runtime.sendMessage({messageType : data.tipo}); // atualiza o icone
    });
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
            switch(key) {
                case 'tipo':
                    messageType = changes[key].newValue;
                    chrome.runtime.sendMessage({messageType : messageType}); // atualiza o icone
                break;
            }
        }
    });

	chrome.extension.onRequest.addListener(
		function(request, sender, sendResponse) {
			if (request.insertLerolero === true && editable) {
				type = editable.attr("type");
				name = editable.attr("name");
				if (type == "email" || name.indexOf("email") != -1) {
					editable.val("lerolero@example.com");
				}
				else if (type == "url" || name.indexOf("url") != -1 || name.indexOf("website") != -1) {
					editable.val("http://www.lerolero.com");
				}
				else if (type == "number") {
					var max = editable.attr("max") ? editable.attr("max") : 100;
					var min = editable.attr("min") ? editable.attr("min") : 0;
					var randomNumber = Math.random() * (max - min) + min;
					editable.val(Math.floor(randomNumber));
				}
				else {
                    var messagesUrl = chrome.extension.getURL("messages/" + messageType + ".json");
                    $.getJSON(messagesUrl, function(messages) {
    					var message = rand(messages.arr0) + rand(messages.arr1) + rand(messages.arr2) + rand(messages.arr3);
    					var maxlength = editable.attr("maxlength")
    					if (maxlength) {
    						message = message.substring(0, maxlength)
    					}
    					editable.val(editable.val() + message);
                    });
				}

				sendResponse({"insertLerolero": true});
			}
			else {
				sendResponse({"insertLerolero": false});
			}
		}
	);
});