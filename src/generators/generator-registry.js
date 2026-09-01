(() => {
  class GeneratorRegistry {
    constructor() {
      this.generators = new Map();
    }

    register(id, generator) {
      if (!id || typeof generator?.generate !== "function") {
        throw new TypeError("A generator must have an id and a generate() method.");
      }

      this.generators.set(id, generator);
      return this;
    }

    has(id) {
      return this.generators.has(id);
    }

    get(id) {
      return this.generators.get(id) ?? null;
    }

    async generate(id, context = {}) {
      const generator = this.get(id);

      if (!generator) {
        throw new Error(`Unknown generator: ${id}`);
      }

      return generator.generate(context);
    }
  }

  globalThis.LeroLero.GeneratorRegistry = GeneratorRegistry;
})();
