importScripts(
  "../shared/namespace.js",
  "../storage/settings-repository.js",
);

const { constants, SettingsRepository } = globalThis.LeroLero;
const settingsRepository = new SettingsRepository();

async function updateActionIcon(typeName) {
  const normalizedType = SettingsRepository.normalizeGeneratorType(typeName);

  try {
    await chrome.action.setIcon({ path: `icons/${normalizedType}.png` });
  } catch (error) {
    console.warn("Lero Lero: could not update the action icon.", error);
  }
}

async function ensureDefaults() {
  const generatorType = await settingsRepository.getGeneratorType();
  await updateActionIcon(generatorType);
}

function rebuildContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create(
      {
        id: constants.CONTEXT_MENU_ID,
        title: "Adicionar Lero-lero...",
        contexts: ["editable"],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.warn(
            "Lero Lero: could not create the context menu.",
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
  const generatorKey = constants.STORAGE_KEYS.GENERATOR_TYPE;

  if (areaName === "local" && changes[generatorKey]) {
    void updateActionIcon(changes[generatorKey].newValue);
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== constants.CONTEXT_MENU_ID || !tab?.id) {
    return;
  }

  chrome.tabs.sendMessage(
    tab.id,
    { action: constants.ACTIONS.FILL_ACTIVE_FIELD },
    () => {
      // Some pages do not accept content scripts (chrome://, Web Store, etc.).
      void chrome.runtime.lastError;
    },
  );
});
