(() => {
  const {
    constants,
    SettingsRepository,
    FieldDetector,
    FormScanner,
    FieldFiller,
    createDefaultGeneratorRegistry,
  } = globalThis.LeroLero;

  const settingsRepository = new SettingsRepository();
  const fieldDetector = new FieldDetector();
  const formScanner = new FormScanner(fieldDetector);
  const fieldFiller = new FieldFiller();
  const generatorRegistry = createDefaultGeneratorRegistry();

  function rememberEditable(event) {
    formScanner.remember(event.target);
  }

  document.addEventListener("mousedown", rememberEditable, true);
  document.addEventListener("focusin", rememberEditable, true);

  async function fillActiveField() {
    const element = formScanner.getActiveField();

    if (!element) {
      return false;
    }

    const descriptor = fieldDetector.detect(element);
    const generatorId = descriptor.kind === "text"
      ? await settingsRepository.getGeneratorType()
      : descriptor.kind;
    const value = await generatorRegistry.generate(generatorId, { descriptor });
    const mode = descriptor.kind === "text" ? "append" : "replace";

    return fieldFiller.fill(descriptor, value, { mode });
  }

  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request?.action !== constants.ACTIONS.FILL_ACTIVE_FIELD) {
      return false;
    }

    fillActiveField()
      .then((inserted) => sendResponse({ inserted }))
      .catch((error) => {
        console.error("Lero Lero: failed to fill the field.", error);
        sendResponse({ inserted: false, error: error.message });
      });

    return true;
  });
})();
