// Notebook Downloader — mode console, sans extension.
// À coller dans la console du navigateur (F12 → Console), pas dans une cellule Python.
// Télécharge le notebook Jupyter classique actuellement ouvert, sans adresse de site à configurer.

(() => {
  // ================= PARAMÈTRES FACULTATIFS =================
  const CONFIG = Object.freeze({
    fileName: '',                      // Laisser vide pour récupérer le vrai nom du notebook.
    fallbackFileName: 'notebook.ipynb', // Seulement si aucun nom n'est disponible.
  });
  // ================= FIN DES PARAMÈTRES =================

  // Récupère le notebook via Jupyter, ou via l'ancienne API IPython.
  const notebook = window.Jupyter?.notebook
    ?? window.IPython?.notebook;

  // Arrête le script si cette page ne propose pas l'export Jupyter classique.
  if (typeof notebook?.toJSON !== 'function') {
    console.log('Export Jupyter classique indisponible dans cette page.');
    return;
  }

  // Retrouve automatiquement le nom du fichier dans le notebook ou dans la page.
  const path = notebook.notebook_path || document.body.dataset.notebookPath;
  const original = CONFIG.fileName || (path && path.split('/').pop()) || notebook.notebook_name ||
    document.title.replace(/\s*-\s*Jupyter Notebook\s*$/i, '') || CONFIG.fallbackFileName;
  let stem = String(original).replace(/\.ipynb$/i, '')
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').trim().replace(/[. ]+$/g, '');
  if (!stem) stem = 'notebook';
  if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(stem)) stem = '_' + stem;
  const fileName = Array.from(stem).slice(0, 160).join('') + '.ipynb';

  // Convertit le notebook en texte JSON lisible, le format des fichiers .ipynb.
  const contenu = JSON.stringify(notebook.toJSON(), null, 2);

  // Prépare le fichier en mémoire et lui attribue une adresse temporaire.
  const fichier = new Blob([contenu], { type: 'application/json' });
  const url = URL.createObjectURL(fichier);

  // Crée un lien temporaire et déclenche son téléchargement.
  const lien = document.createElement('a');
  lien.href = url;
  lien.download = fileName;
  document.body.appendChild(lien);
  lien.click();
  lien.remove();

  // Libère l'adresse temporaire après 10 secondes, sans supprimer le fichier téléchargé.
  setTimeout(() => URL.revokeObjectURL(url), 10000);
})();
