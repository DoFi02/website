(() => {
  const supported = ["de", "en"];
  const buttons = [...document.querySelectorAll(".language-switch button")];
  const copies = [...document.querySelectorAll("[data-copy]")];

  function languageFromStorage() {
    try { return localStorage.getItem("language"); }
    catch { return null; }
  }

  function saveLanguage(language) {
    try { localStorage.setItem("language", language); }
    catch { /* The toggle still works when storage is unavailable. */ }
  }

  function setLanguage(language) {
    const current = supported.includes(language) ? language : "de";
    document.documentElement.lang = current;
    copies.forEach(element => { element.hidden = element.dataset.copy !== current; });
    buttons.forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === current));
    });
    document.querySelectorAll("[data-label-de][data-label-en]").forEach(element => {
      element.textContent = element.getAttribute(`data-label-${current}`);
    });
    document.querySelectorAll("[data-alt-de][data-alt-en]").forEach(element => {
      element.alt = element.getAttribute(`data-alt-${current}`);
    });
    if (document.body.dataset.page === "articles") {
      document.title = current === "de"
        ? "Artikel & Kommentare · Dominik Fink"
        : "Articles & comments · Dominik Fink";
    }
    if (document.body.dataset.page === "articles") renderArticles(current);
    saveLanguage(current);
  }

  function renderArticles(language) {
    const list = document.getElementById("article-list");
    const empty = document.getElementById("empty-state");
    const articles = Array.isArray(window.ARTICLES) ? window.ARTICLES : [];
    list.replaceChildren();
    empty.hidden = articles.length > 0;

    for (const article of articles) {
      const entry = document.createElement("article");
      entry.className = "article-entry";
      const heading = document.createElement("h2");
      const link = document.createElement("a");
      link.textContent = article.title;
      link.href = article.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      heading.append(link);
      entry.append(heading);

      const details = [article.publication, article.date].filter(Boolean).join(" · ");
      if (details) {
        const meta = document.createElement("div");
        meta.className = "article-meta";
        meta.textContent = details;
        entry.append(meta);
      }

      const comment = article.comment?.[language];
      if (comment) {
        const paragraph = document.createElement("p");
        paragraph.className = "article-comment";
        paragraph.textContent = comment;
        entry.append(paragraph);
      }
      list.append(entry);
    }
  }

  buttons.forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
  setLanguage(languageFromStorage());
})();
