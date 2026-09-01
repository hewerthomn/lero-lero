const CONTEXT_MENU_ID = "insert-lero-lero";
const DEFAULT_MESSAGE_TYPE = "lerolero";
const MESSAGE_TYPES = new Set(["lerolero", "mussum", "pt", "dilma"]);

function normalizeMessageType(typeName) {
  return MESSAGE_TYPES.has(typeName) ? typeName : DEFAULT_MESSAGE_TYPE;
}

async function updateActionIcon(typeName) {
  const normalizedType = normalizeMessageType(typeName);

  try {
    await chrome.action.setIcon({ path: `icons/${normalizedType}.png` });
  } catch (error) {
    console.warn("Lero Lero: não foi possível atualizar o ícone.", error);
  }
}

async function ensureDefaults() {
  const { tipo = DEFAULT_MESSAGE_TYPE } = await chrome.storage.local.get({
    tipo: DEFAULT_MESSAGE_TYPE,
  });
  const normalizedType = normalizeMessageType(tipo);

  if (normalizedType !== tipo) {
    await chrome.storage.local.set({ tipo: normalizedType });
  }

  await updateActionIcon(normalizedType);
}

function rebuildContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create(
      {
        id: CONTEXT_MENU_ID,
        title: "Adicionar Lero-lero...",
        contexts: ["editable"],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.warn(
            "Lero Lero: não foi possível criar o menu de contexto.",
            chrome.runtime.lastError.message,
          );
        }
      },
    );
  });
}

chrome.runtime.onInstalled.addListener(() => {
  rebuildContextMenu();
  void ensureDefaults();
});

chrome.runtime.onStartup.addListener(() => {
  void ensureDefaults();
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.tipo) {
    void updateActionIcon(changes.tipo.newValue);
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== CONTEXT_MENU_ID || !tab?.id) {
    return;
  }

  chrome.tabs.sendMessage(tab.id, { action: "insertLerolero" }, () => {
    // Algumas páginas não aceitam content scripts (chrome://, Web Store etc.).
    // Ler lastError evita um erro não tratado no service worker.
    void chrome.runtime.lastError;
  });
});
