// Notebook Downloader — mode console, sans extension.
// À coller dans la console du navigateur (F12 → Console), pas dans une cellule Python.
// Télécharge le notebook Jupyter classique actuellement ouvert, sans adresse de site à configurer.

(() => {
  // ================= PARAMÈTRES À PERSONNALISER =================
  const CONFIG = Object.freeze({
    fileName: 'cours.ipynb', // Nom proposé pour le téléchargement (garder l'extension .ipynb).
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

  // Convertit le notebook en texte JSON lisible, le format des fichiers .ipynb.
  const contenu = JSON.stringify(notebook.toJSON(), null, 2);

  // Prépare le fichier en mémoire et lui attribue une adresse temporaire.
  const fichier = new Blob([contenu], { type: 'application/json' });
  const url = URL.createObjectURL(fichier);

  // Crée un lien temporaire et déclenche son téléchargement.
  const lien = document.createElement('a');
  lien.href = url;
  lien.download = CONFIG.fileName;
  document.body.appendChild(lien);
  lien.click();
  lien.remove();

  // Libère l'adresse temporaire après 10 secondes, sans supprimer le fichier téléchargé.
  setTimeout(() => URL.revokeObjectURL(url), 10000);
})();
