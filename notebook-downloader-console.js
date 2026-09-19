// Notebook Downloader — mode console, sans extension.
// À coller dans la console du navigateur (F12 → Console), pas dans une cellule Python.
// Télécharge le notebook Jupyter classique actuellement ouvert sous le nom cours.ipynb.

(() => {
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
  lien.download = 'cours.ipynb';
  document.body.appendChild(lien);
  lien.click();
  lien.remove();

  // Libère l'adresse temporaire après 10 secondes, sans supprimer le fichier téléchargé.
  setTimeout(() => URL.revokeObjectURL(url), 10000);
})();
