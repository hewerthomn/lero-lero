(() => {
  class FormScanner {
    constructor(fieldDetector) {
      this.fieldDetector = fieldDetector;
      this.lastEditable = null;
    }

    remember(element) {
      if (this.fieldDetector.supports(element)) {
        this.lastEditable = element;
      }
    }

    getActiveField() {
      if (this.lastEditable?.isConnected) {
        return this.lastEditable;
      }

      return this.fieldDetector.supports(document.activeElement)
        ? document.activeElement
        : null;
    }

    scan(root = document) {
      return Array.from(root.querySelectorAll("input, textarea"))
        .filter((element) => this.fieldDetector.supports(element));
    }
  }

  globalThis.LeroLero.FormScanner = FormScanner;
})();
