(() => {
  class TemplateEngine {
    resolvePath(variables, path) {
      return path.split(".").reduce((value, key) => value?.[key], variables);
    }

    render(template, variables = {}) {
      return String(template).replace(
        /\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g,
        (placeholder, path) => {
          const value = this.resolvePath(variables, path);
          return value === undefined || value === null ? placeholder : String(value);
        },
      );
    }
  }

  globalThis.LeroLero.TemplateEngine = TemplateEngine;
})();
