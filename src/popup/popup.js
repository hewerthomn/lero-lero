document.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("tipo");

  if (!select) {
    return;
  }

  const settingsRepository = new globalThis.LeroLero.SettingsRepository();
  const generatorType = await settingsRepository.getGeneratorType();
  const validValue = Array.from(select.options)
    .some((option) => option.value === generatorType);

  select.value = validValue
    ? generatorType
    : globalThis.LeroLero.constants.DEFAULT_GENERATOR;

  select.addEventListener("change", async () => {
    select.value = await settingsRepository.setGeneratorType(select.value);
  });
});
