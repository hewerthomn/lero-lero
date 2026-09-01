(() => {
  const namespace = globalThis.LeroLero ?? {};
  globalThis.LeroLero = namespace;

  namespace.constants = Object.freeze({
    CONTEXT_MENU_ID: "insert-lero-lero",
    ACTIONS: Object.freeze({
      FILL_ACTIVE_FIELD: "fill-active-field",
    }),
    STORAGE_KEYS: Object.freeze({
      GENERATOR_TYPE: "tipo",
      PROFILES: "profiles",
      SCHEMA_VERSION: "schemaVersion",
    }),
    DEFAULT_GENERATOR: "lerolero",
    GENERATOR_TYPES: Object.freeze(["lerolero", "mussum", "pt", "dilma"]),
  });
})();
