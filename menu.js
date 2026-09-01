document.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("tipo");

  if (!select) {
    return;
  }

  const { tipo = "lerolero" } = await chrome.storage.local.get({ tipo: "lerolero" });
  const validValue = Array.from(select.options).some((option) => option.value === tipo);

  select.value = validValue ? tipo : "lerolero";

  select.addEventListener("change", async () => {
    await chrome.storage.local.set({ tipo: select.value });
  });
});
