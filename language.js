(() => {
  const supported = ["en", "zh-Hans", "zh-Hant", "ja", "ko"];

  function normalize(value) {
    const language = (value || "").toLowerCase();
    if (language.startsWith("zh-hant") || language.startsWith("zh-tw") || language.startsWith("zh-hk")) return "zh-Hant";
    if (language.startsWith("zh")) return "zh-Hans";
    if (language.startsWith("ja")) return "ja";
    if (language.startsWith("ko")) return "ko";
    return "en";
  }

  function show(language) {
    const selected = supported.includes(language) ? language : normalize(language);
    document.documentElement.lang = selected;
    document.querySelectorAll(".locale-panel").forEach((panel) => {
      const active = panel.id === selected;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
    document.querySelectorAll("[data-language]").forEach((link) => {
      const active = link.dataset.language === selected;
      link.classList.toggle("active", active);
      link.setAttribute("aria-current", active ? "page" : "false");
    });
  }

  const initial = location.hash.slice(1) || navigator.language;
  show(initial);
  addEventListener("hashchange", () => show(location.hash.slice(1)));
})();
