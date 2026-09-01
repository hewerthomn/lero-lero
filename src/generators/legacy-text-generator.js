(() => {
  function randomItem(items) {
    if (!Array.isArray(items) || items.length === 0) {
      return "";
    }

    return items[Math.floor(Math.random() * items.length)];
  }

  class LegacyTextGenerator {
    constructor(messageType) {
      this.messageType = messageType;
    }

    async generate() {
      const messagesUrl = chrome.runtime.getURL(`messages/${this.messageType}.json`);
      const response = await fetch(messagesUrl);

      if (!response.ok) {
        throw new Error(`Failed to load messages (${response.status}).`);
      }

      const messages = await response.json();

      return ["arr0", "arr1", "arr2", "arr3"]
        .map((key) => randomItem(messages[key]))
        .join("");
    }
  }

  globalThis.LeroLero.LegacyTextGenerator = LegacyTextGenerator;
})();
