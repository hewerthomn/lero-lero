(() => {
  function numericAttribute(element, attributeName) {
    const rawValue = element.getAttribute(attributeName);

    if (rawValue === null || rawValue === "") {
      return null;
    }

    const value = Number(rawValue);
    return Number.isFinite(value) ? value : null;
  }

  class FieldDetector {
    supports(element) {
      return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
    }

    detect(element) {
      if (!this.supports(element)) {
        throw new TypeError("Unsupported form field.");
      }

      const htmlType = element instanceof HTMLTextAreaElement
        ? "textarea"
        : (element.getAttribute("type") || element.type || "text").toLowerCase();
      const name = (element.getAttribute("name") || "").toLowerCase();
      let kind = "text";

      if (htmlType === "email" || name.includes("email")) {
        kind = "email";
      } else if (
        htmlType === "url"
        || name.includes("url")
        || name.includes("website")
      ) {
        kind = "url";
      } else if (htmlType === "number") {
        kind = "number";
      }

      return {
        element,
        kind,
        htmlType,
        name,
        id: element.id || null,
        constraints: {
          min: numericAttribute(element, "min"),
          max: numericAttribute(element, "max"),
          step: numericAttribute(element, "step"),
          minLength: element.minLength >= 0 ? element.minLength : null,
          maxLength: element.maxLength >= 0 ? element.maxLength : null,
          required: element.required === true,
        },
      };
    }
  }

  globalThis.LeroLero.FieldDetector = FieldDetector;
})();
