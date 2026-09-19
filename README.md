# Notebook Downloader

Télécharge le notebook Jupyter ouvert dans ton navigateur au format `.ipynb`.

Deux modes sont disponibles. Choisis celui qui te convient : tu n'as pas besoin d'utiliser les deux.

| Mode | Fichier | Utilisation |
| --- | --- | --- |
| **Bouton permanent** | [notebook-downloader.user.js](notebook-downloader.user.js) | À installer une fois avec [Tampermonkey](https://www.tampermonkey.net/). Ajoute un bouton **Télécharger** à côté de **SAVE** sur les pages compatibles. |
| **Console, sans extension** | [notebook-downloader-console.js](notebook-downloader-console.js) | À copier dans la console du navigateur à chaque téléchargement. |

**[Installer Notebook Downloader avec Tampermonkey](https://raw.githubusercontent.com/user257814938/Notebook-Downloader/main/notebook-downloader.user.js)**

Installe d'abord Tampermonkey, puis ouvre ce lien dans le même navigateur sur ordinateur.

## Mode console — sans extension

1. Connecte-toi à ta plateforme, ouvre le notebook et attends son chargement complet.
2. Ouvre [notebook-downloader-console.js](notebook-downloader-console.js), puis copie tout le code. Sur GitHub, le bouton **Raw** permet d'afficher le contenu brut.
3. Dans l'onglet du notebook, appuie sur **F12**, puis sélectionne **Console**.
4. Colle le code à côté du symbole `>`, puis appuie sur **Entrée**. Il s'agit de la console du navigateur, pas d'une cellule Python.
5. Enregistre le fichier proposé : **`cours.ipynb`**. Tu peux changer ce nom dans la fenêtre d'enregistrement.

Si le navigateur bloque le collage avec un avertissement, prends connaissance du script et du message avant de suivre les indications affichées. Le script fourni lit le notebook ouvert et crée le fichier localement ; il ne transmet pas le contenu à un autre site.

Ce mode reprend le script console initial, avec des commentaires JavaScript valides (`//`). Il ne nécessite pas Tampermonkey et n'ajoute pas de bouton permanent. Si le message « Export Jupyter classique indisponible dans cette page » apparaît, cette page n'expose pas l'API attendue.

## Mode bouton — installation depuis GitHub

À effectuer sur ordinateur, dans le navigateur où tu ouvres tes notebooks.

1. Installe **Tampermonkey** depuis la boutique officielle de ton navigateur, accessible via son [site officiel](https://www.tampermonkey.net/).
2. Ouvre le **[lien d'installation direct](https://raw.githubusercontent.com/user257814938/Notebook-Downloader/main/notebook-downloader.user.js)** dans le navigateur où Tampermonkey est installé. Tu peux aussi ouvrir **[notebook-downloader.user.js](notebook-downloader.user.js)** sur GitHub, puis cliquer sur **Raw** (fichier brut).
3. Tampermonkey doit afficher une page d'installation pour **Notebook Downloader**. Clique sur **Installer**.
4. Recharge ton notebook après avoir sauvegardé tes modifications. Le bouton **Télécharger** apparaît à côté de **SAVE**.

### Si le lien affiche du code au lieu du bouton Installer

1. Copie l'adresse du fichier **Raw**, pas celle de la page GitHub qui présente le code.
2. Ouvre **Tampermonkey → Tableau de bord → Utilitaires**.
3. Dans **Installer depuis une URL** (ou *Import from URL*, selon la version), colle cette adresse et lance l'importation.
4. Confirme avec **Installer**, puis recharge ton notebook.

Aucun compte GitHub n'est nécessaire pour récupérer le script depuis ce dépôt public.

## Mode bouton — installation manuelle alternative

1. Installe Tampermonkey dans ton navigateur habituel.
2. Clique sur son icône, puis sur **Créer un nouveau script**.
3. Ouvre `notebook-downloader.user.js` et copie tout son contenu.
4. Dans l'éditeur Tampermonkey, remplace tout le modèle existant (**Ctrl+A**, puis **Ctrl+V**).
5. Enregistre avec **Ctrl+S** et vérifie que le script est activé.
6. Recharge ton notebook après avoir sauvegardé tes modifications.

Si tu avais installé une première version de ce projet sous un autre nom, désactive-la ou supprime-la de Tampermonkey avant d'utiliser **Notebook Downloader**, pour éviter deux boutons.

## Utilisation du bouton

1. Connecte-toi à ta plateforme et ouvre un notebook compatible.
2. Attends son chargement, puis clique sur **Télécharger**.
3. Si le navigateur le demande, choisis le dossier et clique sur **Enregistrer**.

Le fichier conserve le nom du notebook ouvert, par exemple `introduction_python.ipynb`. Le navigateur gère le dossier de destination et les éventuels doublons selon ses réglages.

Tu peux ensuite importer le fichier dans Google Drive ou l'enregistrer dans un dossier déjà synchronisé avec Drive pour ordinateur. Le script ne se connecte pas à ton compte Google.

## Compatibilité

Les deux modes nécessitent une interface **Jupyter classique** exposant `Jupyter.notebook` ou `IPython.notebook` et sa fonction `toJSON()`. Ils ne fonctionnent pas automatiquement sur tous les sites de notebooks.

Le **mode bouton** est adapté à une barre de commandes précise. Les pages concernées sont définies dans la ligne `@match` du script Tampermonkey :

```javascript
// @match        https://*.notebooks.datascientest.com/*
```

Ce filtre technique reste nécessaire pour limiter l'exécution aux pages prises en charge. L'intégration attend un bouton SAVE portant l'identifiant `save_notebook-button` et un objet `Jupyter.notebook` ou `IPython.notebook` accessible. Pour prendre en charge un autre site, il faut adapter et tester ces points, pas seulement modifier le nom du projet.

## Ce que contient le téléchargement

Les deux scripts utilisent la fonction native Jupyter `toJSON()` pour exporter **l'état du notebook actuellement ouvert**, y compris les modifications présentes avant un clic sur SAVE. Le mode bouton ajoute des vérifications de structure et de nombre des cellules avant de demander le téléchargement. Le mode console conserve le fonctionnement simple du script initial et utilise le nom fixe `cours.ipynb`.

Les deux modes conservent les données fournies par Jupyter sans filtrer les cellules, le code, le texte, les sorties, les pièces jointes ou les métadonnées. Ils ne téléchargent pas le fichier brut du serveur et ne garantissent pas une identité octet par octet avec celui-ci.

Les vidéos, images liées par URL, fichiers de données externes et l'environnement Python ne sont pas copiés. Les cellules Python ne sont pas exécutées par le script.

## Si le bouton n'apparaît pas

- Vérifie que Tampermonkey et **Notebook Downloader** sont activés.
- Vérifie que ton notebook est ouvert sur une page compatible et recharge cette page.
- Vérifie que Tampermonkey est autorisé sur le site concerné.
- Si l'extension demande l'autorisation d'exécuter des scripts utilisateur, consulte son [aide officielle](https://www.tampermonkey.net/faq.php?q=Q209).
- Si le bouton indique que le notebook est encore en chargement, attends quelques secondes et réessaie.

## Partager le script

Partage le **[lien d'installation Tampermonkey](https://raw.githubusercontent.com/user257814938/Notebook-Downloader/main/notebook-downloader.user.js)**, par exemple sur WhatsApp, en précisant qu'il faut d'abord installer Tampermonkey sur ordinateur. Le **[dépôt GitHub](https://github.com/user257814938/Notebook-Downloader)** permet de consulter les instructions et les deux scripts.

Conserve l'extension **`.user.js`** dans le nom du fichier : elle permet au gestionnaire de scripts de reconnaître le fichier à installer. Aucun notebook personnel n'est nécessaire dans le dépôt.

Pour les personnes qui préfèrent le mode sans extension, partage le lien de `notebook-downloader-console.js` et les étapes de la section **Mode console**. Ce fichier se colle dans la console ; il ne s'installe pas dans Tampermonkey.

## Désactivation

Désactive **Notebook Downloader** dans Tampermonkey, puis recharge le notebook. Le bouton disparaît.

## Fonctionnement et vérifications

Les scripts ne contiennent aucun identifiant, ne font aucune requête réseau et ne modifient pas les réglages du navigateur. L'intégration de la barre du mode bouton a été examinée sur une page de cours connectée.

Des vérifications locales ont confirmé la conservation des données JSON d'un notebook de 43 cellules, le nommage des fichiers, les messages d'erreur et l'absence de boutons en double. L'installation Tampermonkey et l'enregistrement final doivent encore être confirmés dans le navigateur habituel ; ces tests locaux ne remplacent pas cette vérification.
