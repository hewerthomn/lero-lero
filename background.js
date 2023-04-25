function updateType(typeName) {
	chrome.browserAction.setIcon({path:"icons/" + typeName + ".png"});
}

chrome.contextMenus.create({
	"title": "Adicionar Lero-lero...",
	"contexts":["editable"],
	"onclick": function(info, tab) {
		chrome.tabs.sendRequest(tab.id, {
				"insertLerolero": true
			},function(response) {}
		)
	}
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.messageType){
			updateType(request.messageType);
		}
	});
