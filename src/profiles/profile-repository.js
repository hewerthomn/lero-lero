(() => {
  const { constants } = globalThis.LeroLero;

  class ProfileRepository {
    constructor(storageArea = chrome.storage.local) {
      this.storageArea = storageArea;
    }

    async list() {
      const key = constants.STORAGE_KEYS.PROFILES;
      const values = await this.storageArea.get({ [key]: [] });
      return Array.isArray(values[key]) ? values[key] : [];
    }

    async findById(profileId) {
      const profiles = await this.list();
      return profiles.find((profile) => profile.id === profileId) ?? null;
    }

    async save(profile) {
      if (!profile?.id || !profile?.name) {
        throw new TypeError("A profile requires id and name.");
      }

      const profiles = await this.list();
      const index = profiles.findIndex((item) => item.id === profile.id);

      if (index >= 0) {
        profiles[index] = profile;
      } else {
        profiles.push(profile);
      }

      await this.storageArea.set({
        [constants.STORAGE_KEYS.PROFILES]: profiles,
      });

      return profile;
    }

    async remove(profileId) {
      const profiles = await this.list();
      const nextProfiles = profiles.filter((profile) => profile.id !== profileId);
      await this.storageArea.set({
        [constants.STORAGE_KEYS.PROFILES]: nextProfiles,
      });
      return nextProfiles.length !== profiles.length;
    }
  }

  globalThis.LeroLero.ProfileRepository = ProfileRepository;
})();
