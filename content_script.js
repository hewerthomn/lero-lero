$(function(){
	function rand(a) {
        return a[Math.floor(Math.random() * a.length)];
	}

	var editable = null;
	$("input, textarea").mousedown(function(){
		// Capture the editable element
		editable = $(this);
	});

    var messagesFile = "lerolero";

	chrome.extension.onRequest.addListener(
		function(request, sender, sendResponse) {

			if (request.insertLerolero === true) {
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
                    var messagesUrl = chrome.extension.getURL("messages/"+messagesFile+".json");
                    $.getJSON(messagesUrl, function(messages) {
                        console.debug(messages.arr0.length);
    					var lerolero = rand(messages.arr0) + rand(messages.arr1) + rand(messages.arr2) + rand(messages.arr3);
    					var maxlength = editable.attr("maxlength")
    					if (maxlength) {
    						lerolero = lerolero.substring(0, maxlength)
    					}
    					editable.val(editable.val() + lerolero);
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