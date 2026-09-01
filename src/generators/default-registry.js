(() => {
  const {
    constants,
    GeneratorRegistry,
    LegacyTextGenerator,
    EmailGenerator,
    UrlGenerator,
    NumberGenerator,
  } = globalThis.LeroLero;

  function createDefaultGeneratorRegistry() {
    const registry = new GeneratorRegistry();

    registry
      .register("email", new EmailGenerator())
      .register("url", new UrlGenerator())
      .register("number", new NumberGenerator());

    for (const generatorType of constants.GENERATOR_TYPES) {
      registry.register(generatorType, new LegacyTextGenerator(generatorType));
    }

    return registry;
  }

  globalThis.LeroLero.createDefaultGeneratorRegistry = createDefaultGeneratorRegistry;
})();
