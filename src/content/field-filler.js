(() => {
  class FieldFiller {
    fill(descriptor, value, { mode = "replace" } = {}) {
      const element = descriptor?.element;

      if (!element) {
        return false;
      }

      const currentValue = element.value || "";
      const generatedValue = String(value ?? "");
      let nextValue;

      switch (mode) {
        case "append":
          nextValue = currentValue + generatedValue;
          break;
        case "prepend":
          nextValue = generatedValue + currentValue;
          break;
        case "only-if-empty":
          if (currentValue) {
            return false;
          }
          nextValue = generatedValue;
          break;
        case "replace":
        default:
          nextValue = generatedValue;
          break;
      }

      const maxLength = descriptor.constraints?.maxLength;

      if (Number.isInteger(maxLength) && maxLength >= 0) {
        nextValue = nextValue.substring(0, maxLength);
      }

      element.value = nextValue;
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));

      return true;
    }
  }

  globalThis.LeroLero.FieldFiller = FieldFiller;
})();
