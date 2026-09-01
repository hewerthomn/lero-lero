(() => {
  class EmailGenerator {
    generate() {
      return "lerolero@example.com";
    }
  }

  class UrlGenerator {
    generate() {
      return "https://www.lerolero.com";
    }
  }

  class NumberGenerator {
    generate({ descriptor } = {}) {
      const min = descriptor?.constraints?.min ?? 0;
      const max = descriptor?.constraints?.max ?? 100;
      const lowerBound = Math.ceil(Math.min(min, max));
      const upperBound = Math.floor(Math.max(min, max));

      if (lowerBound === upperBound) {
        return String(lowerBound);
      }

      const randomNumber = Math.floor(
        Math.random() * (upperBound - lowerBound + 1) + lowerBound,
      );

      return String(randomNumber);
    }
  }

  Object.assign(globalThis.LeroLero, {
    EmailGenerator,
    UrlGenerator,
    NumberGenerator,
  });
})();
