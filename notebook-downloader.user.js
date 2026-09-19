// ==UserScript==
// @name         Notebook Downloader
// @namespace    local.notebook-downloader
// @version      1.1.0
// @description  Ajoute un bouton pour télécharger le notebook Jupyter classique ouvert.
// @match        https://*.notebooks.datascientest.com/*
// @run-at       document-idle
// @grant        unsafeWindow
// @sandbox      JavaScript
// @noframes
// ==/UserScript==

(() => {
  'use strict';

  // ================= PARAMÈTRES À PERSONNALISER =================
  // SITE : modifie la ligne @match tout en haut, ou ajoute une ligne par domaine.
  // @match est lu par Tampermonkey AVANT ce code : il ne peut pas lire CONFIG.
  // Aucun identifiant ni lien propre à un utilisateur n'est nécessaire.
  const CONFIG = Object.freeze({
    anchorSelector: '#save_notebook-button', // Sélecteur CSS de l'élément après lequel ajouter le bouton.
    buttonLabel: 'Télécharger',             // Texte affiché sur le bouton.
    buttonIcon: '↓',                        // Icône en texte ; '' pour aucune icône.
    accentColor: '#ff6847',                 // Couleur du contour et des messages.
    fileName: '',                           // '' = vrai nom du notebook ; sinon, ex. 'mon_cours.ipynb'.
    fallbackFileName: 'notebook.ipynb',      // Nom utilisé si aucun nom n'est disponible.
  });
  // ================= FIN DES PARAMÈTRES =================
  // Le moteur ci-dessous n'a pas besoin d'être modifié pour ces réglages.

  try {
    document.querySelector(CONFIG.anchorSelector);
  } catch {
    console.error('Notebook Downloader : CONFIG.anchorSelector doit être un sélecteur CSS valide.');
    return;
  }

  // unsafeWindow donne accès à Jupyter, qui appartient à la page du cours.
  const page = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
  const buttonId = 'notebook-downloader-button';
  const noticeId = 'notebook-downloader-notice';
  const styleId = 'notebook-downloader-style';
  let noticeTimer;
  let busy = false;

  // Ne pas installer plusieurs exemplaires si le script est lancé deux fois.
  if (document.getElementById(styleId)) return;
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    #${buttonId} {
      appearance: none; cursor: pointer; color: inherit; background: transparent;
      border: 0; border-radius: 0; font: inherit; white-space: nowrap;
    }
    #${buttonId}:focus-visible { outline: 3px solid ${CONFIG.accentColor}; outline-offset: -4px; }
    #${buttonId}:disabled { opacity: .55; cursor: wait; }
    #${buttonId} > span { display: inline-flex; align-items: center; gap: 6px; }
    #${noticeId} {
      position: fixed; bottom: 24px; right: 24px; z-index: 10000;
      box-sizing: border-box; max-width: min(440px, calc(100vw - 32px));
      padding: 16px 20px; border: 1px solid ${CONFIG.accentColor}; border-radius: 10px;
      background: #fff; color: #252525; box-shadow: 0 5px 24px #0002;
      font: 14px/1.5 system-ui, sans-serif; white-space: pre-line;
    }
  `;
  (document.head || document.documentElement).appendChild(style);

  function notify(message) {
    let notice = document.getElementById(noticeId);
    if (!notice) {
      notice = document.createElement('div');
      notice.id = noticeId;
      notice.setAttribute('role', 'status');
      notice.setAttribute('aria-live', 'polite');
      document.body.appendChild(notice);
    }
    notice.textContent = message;
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => notice.remove(), 14000);
  }

  function currentNotebook() {
    return page.Jupyter?.notebook ?? page.IPython?.notebook;
  }

  function filename(notebook) {
    const path = notebook.notebook_path || document.body.dataset.notebookPath;
    const original = CONFIG.fileName || (path && path.split('/').pop()) || notebook.notebook_name ||
      document.title.replace(/\s*-\s*Jupyter Notebook\s*$/i, '') || CONFIG.fallbackFileName;
    let stem = String(original).replace(/\.ipynb$/i, '')
      .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').trim().replace(/[. ]+$/g, '');
    if (!stem) stem = 'notebook';
    if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(stem)) stem = '_' + stem;
    return Array.from(stem).slice(0, 160).join('') + '.ipynb';
  }

  function validate(data, expectedCells) {
    if (data?.nbformat !== 4 || !Number.isInteger(data.nbformat_minor) ||
        !data.metadata || typeof data.metadata !== 'object' ||
        !Array.isArray(data.cells) || data.cells.length === 0) {
      throw new Error('Le contenu reçu ne ressemble pas à un notebook Jupyter complet.');
    }
    if (expectedCells !== undefined && data.cells.length !== expectedCells) {
      throw new Error('Le nombre de cellules a changé. Attends la fin du chargement et réessaie.');
    }
    for (const cell of data.cells) {
      const sourceOK = typeof cell.source === 'string' ||
        (Array.isArray(cell.source) && cell.source.every(line => typeof line === 'string'));
      if (!sourceOK || !['code', 'markdown', 'raw'].includes(cell.cell_type) ||
          (cell.cell_type === 'code' && !Array.isArray(cell.outputs))) {
        throw new Error('Une cellule a un format inattendu. Le téléchargement a été arrêté.');
      }
    }
  }

  function download(event) {
    event.preventDefault();
    event.stopPropagation();
    if (busy) return;
    const notebook = currentNotebook();
    if (!notebook || typeof notebook.toJSON !== 'function') {
      notify('Jupyter n’est pas encore accessible. Attends la fin du chargement puis réessaie.');
      return;
    }
    if (notebook._fully_loaded === false) {
      notify('Le notebook est encore en cours de chargement. Réessaie dans quelques secondes.');
      return;
    }

    busy = true;
    const button = document.getElementById(buttonId);
    button.disabled = true;
    let objectURL;
    let link;
    try {
      const expectedCells = typeof notebook.get_cells === 'function' ? notebook.get_cells().length : undefined;
      // Export Jupyter natif : aucune cellule ou métadonnée n'est filtrée ici.
      const data = notebook.toJSON();
      validate(data, expectedCells);
      const text = JSON.stringify(data, null, 2);
      validate(JSON.parse(text), expectedCells);
      const name = filename(notebook);
      const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
      objectURL = URL.createObjectURL(blob);
      link = document.createElement('a');
      link.href = objectURL;
      link.download = name;
      link.hidden = true;
      document.body.appendChild(link);
      link.click();
      notify(`Téléchargement demandé : ${name}\n${data.cells.length} cellules exportées. Confirme l’enregistrement si le navigateur le demande.`);
    } catch (error) {
      notify(`Export impossible : ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      link?.remove();
      if (objectURL) {
        const createdURL = objectURL;
        setTimeout(() => URL.revokeObjectURL(createdURL), 60000);
      }
      // Évite un double téléchargement en cas de double-clic.
      setTimeout(() => { busy = false; button.disabled = false; }, 1000);
    }
  }

  function mount() {
    const anchor = document.querySelector(CONFIG.anchorSelector);
    if (!anchor) return;
    const existing = document.getElementById(buttonId);
    if (existing) {
      if (existing.previousElementSibling !== anchor) anchor.after(existing);
      return;
    }
    const button = document.createElement('button');
    button.id = buttonId;
    button.type = 'button';
    button.className = anchor.getAttribute('class') || '';
    button.title = 'Exporter le notebook actuellement ouvert, y compris les modifications présentes. Les ressources externes ne sont pas incluses.';
    button.setAttribute('aria-label', `${CONFIG.buttonLabel} le notebook au format .ipynb`);
    const label = document.createElement('span');
    if (CONFIG.buttonIcon) {
      const icon = document.createElement('span');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = CONFIG.buttonIcon;
      label.appendChild(icon);
    }
    label.appendChild(document.createTextNode(CONFIG.buttonLabel));
    button.appendChild(label);
    button.addEventListener('click', download);
    anchor.after(button);
  }

  mount();
  // La plateforme peut créer ou remplacer la barre après le chargement initial.
  // Une vérification légère évite d'observer toutes les modifications des cellules.
  const mountTimer = setInterval(mount, 1500);
  window.addEventListener('pagehide', () => clearInterval(mountTimer), { once: true });
})();
