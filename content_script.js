(() => {
  const DEFAULT_MESSAGE_TYPE = "lerolero";
  const MESSAGE_TYPES = new Set(["lerolero", "mussum", "pt", "dilma"]);

  let editable = null;

  function isSupportedEditable(element) {
    return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
  }

  function rememberEditable(event) {
    if (isSupportedEditable(event.target)) {
      editable = event.target;
    }
  }

  document.addEventListener("mousedown", rememberEditable, true);
  document.addEventListener("focusin", rememberEditable, true);

  function getEditable() {
    if (editable?.isConnected) {
      return editable;
    }

    return isSupportedEditable(document.activeElement) ? document.activeElement : null;
  }

  function randomItem(items) {
    if (!Array.isArray(items) || items.length === 0) {
      return "";
    }

    return items[Math.floor(Math.random() * items.length)];
  }

  function normalizeMessageType(typeName) {
    return MESSAGE_TYPES.has(typeName) ? typeName : DEFAULT_MESSAGE_TYPE;
  }

  async function getMessageType() {
    const { tipo = DEFAULT_MESSAGE_TYPE } = await chrome.storage.local.get({
      tipo: DEFAULT_MESSAGE_TYPE,
    });

    return normalizeMessageType(tipo);
  }

  async function loadMessages(typeName) {
    const messagesUrl = chrome.runtime.getURL(`messages/${typeName}.json`);
    const response = await fetch(messagesUrl);

    if (!response.ok) {
      throw new Error(`Falha ao carregar mensagens (${response.status}).`);
    }

    return response.json();
  }

  function buildMessage(messages) {
    return ["arr0", "arr1", "arr2", "arr3"]
      .map((key) => randomItem(messages[key]))
      .join("");
  }

  function numericAttribute(element, attributeName, fallback) {
    const rawValue = element.getAttribute(attributeName);

    if (rawValue === null || rawValue === "") {
      return fallback;
    }

    const value = Number(rawValue);
    return Number.isFinite(value) ? value : fallback;
  }

  async function insertLeroLero() {
    const element = getEditable();

    if (!element) {
      return false;
    }

    const inputType = (element.getAttribute("type") || element.type || "").toLowerCase();
    const name = (element.getAttribute("name") || "").toLowerCase();

    if (inputType === "email" || name.includes("email")) {
      element.value = "lerolero@example.com";
      return true;
    }

    if (inputType === "url" || name.includes("url") || name.includes("website")) {
      element.value = "https://www.lerolero.com";
      return true;
    }

    if (inputType === "number") {
      const min = numericAttribute(element, "min", 0);
      const max = numericAttribute(element, "max", 100);
      const lowerBound = Math.min(min, max);
      const upperBound = Math.max(min, max);
      const randomNumber = Math.random() * (upperBound - lowerBound) + lowerBound;

      element.value = String(Math.floor(randomNumber));
      return true;
    }

    const messageType = await getMessageType();
    const messages = await loadMessages(messageType);
    let message = buildMessage(messages);
    const currentValue = element.value || "";
    const maxLength = element.maxLength;

    if (maxLength >= 0) {
      message = message.substring(0, Math.max(0, maxLength - currentValue.length));
    }

    element.value = currentValue + message;
    return true;
  }

  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request?.action !== "insertLerolero") {
      return false;
    }

    insertLeroLero()
      .then((inserted) => sendResponse({ insertLerolero: inserted }))
      .catch((error) => {
        console.error("Lero Lero: falha ao preencher o campo.", error);
        sendResponse({ insertLerolero: false, error: error.message });
      });

    return true;
  });
})();
