(() => {
  function wildcardMatch(value, pattern) {
    if (!pattern || pattern === "*") {
      return true;
    }

    const escapedPattern = pattern
      .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\*/g, ".*");

    return new RegExp(`^${escapedPattern}$`, "i").test(value);
  }

  class ProfileResolver {
    matches(profile, inputUrl) {
      const url = inputUrl instanceof URL ? inputUrl : new URL(inputUrl);
      const match = profile?.match ?? {};

      return wildcardMatch(url.hostname, match.hostname || "*")
        && wildcardMatch(url.pathname, match.pathname || "*");
    }

    resolve(inputUrl, profiles = []) {
      return profiles.filter((profile) => this.matches(profile, inputUrl));
    }
  }

  globalThis.LeroLero.ProfileResolver = ProfileResolver;
})();
