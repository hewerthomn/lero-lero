(() => {
  const { constants } = globalThis.LeroLero;

  class SettingsRepository {
    constructor(storageArea = chrome.storage.local) {
      this.storageArea = storageArea;
    }

    static normalizeGeneratorType(typeName) {
      return constants.GENERATOR_TYPES.includes(typeName)
        ? typeName
        : constants.DEFAULT_GENERATOR;
    }

    async getGeneratorType() {
      const key = constants.STORAGE_KEYS.GENERATOR_TYPE;
      const values = await this.storageArea.get({
        [key]: constants.DEFAULT_GENERATOR,
      });
      const storedType = values[key];
      const normalizedType = SettingsRepository.normalizeGeneratorType(storedType);

      if (storedType !== normalizedType) {
        await this.storageArea.set({ [key]: normalizedType });
      }

      return normalizedType;
    }

    async setGeneratorType(typeName) {
      const normalizedType = SettingsRepository.normalizeGeneratorType(typeName);
      await this.storageArea.set({
        [constants.STORAGE_KEYS.GENERATOR_TYPE]: normalizedType,
      });
      return normalizedType;
    }
  }

  globalThis.LeroLero.SettingsRepository = SettingsRepository;
})();
