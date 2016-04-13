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
