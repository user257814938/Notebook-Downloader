# Notebook Downloader

Télécharge le notebook Jupyter ouvert dans ton navigateur au format `.ipynb`.

Deux modes sont disponibles. Choisis celui qui te convient : tu n'as pas besoin d'utiliser les deux.

| Mode | Fichier | Utilisation |
| --- | --- | --- |
| **Bouton permanent** | [notebook-downloader.user.js](notebook-downloader.user.js) | À installer une fois avec [Tampermonkey](https://www.tampermonkey.net/). Ajoute un bouton **Download** à côté de **SAVE**, ou flottant en haut à droite. |
| **Console, sans extension** | [notebook-downloader-console.js](notebook-downloader-console.js) | À copier dans la console du navigateur à chaque téléchargement. |

**[Installer Notebook Downloader avec Tampermonkey](https://raw.githubusercontent.com/user257814938/Notebook-Downloader/main/notebook-downloader.user.js)**

Installe d'abord Tampermonkey, puis ouvre ce lien dans le même navigateur sur ordinateur.

**Chrome / Comet :** dans les détails de l'extension Tampermonkey, active **Autoriser les scripts utilisateur**. Installer l'extension et activer le script dans son tableau de bord ne suffit pas si cette autorisation du navigateur est désactivée. Recharge ensuite le cours. Voir l'[aide officielle](https://www.tampermonkey.net/faq.php?q=Q209).

## Mode console — sans extension

1. Connecte-toi à ta plateforme, ouvre le notebook et attends son chargement complet.
2. Ouvre [notebook-downloader-console.js](notebook-downloader-console.js), puis copie tout le code. Sur GitHub, le bouton **Raw** permet d'afficher le contenu brut.
3. Dans l'onglet du notebook, appuie sur **F12**, puis sélectionne **Console**.
4. Colle le code à côté du symbole `>`, puis appuie sur **Entrée**. Il s'agit de la console du navigateur, pas d'une cellule Python.
5. Enregistre le fichier proposé : **le nom du notebook est récupéré automatiquement**, par exemple `00_python_01_variables.ipynb`. Tu n'as aucun nom à saisir dans le script.

Si le navigateur bloque le collage avec un avertissement, prends connaissance du script et du message avant de suivre les indications affichées. Le script fourni lit le notebook ouvert et crée le fichier localement ; il ne transmet pas le contenu à un autre site.

Ce mode reprend le script console initial, avec des commentaires JavaScript valides (`//`). Il ne nécessite pas Tampermonkey et n'ajoute pas de bouton permanent. Si le message « Export Jupyter classique indisponible dans cette page » apparaît, cette page n'expose pas l'API attendue.

## Mode bouton — installation depuis GitHub

À effectuer sur ordinateur, dans le navigateur où tu ouvres tes notebooks.

1. Installe **Tampermonkey** depuis la boutique officielle de ton navigateur, accessible via son [site officiel](https://www.tampermonkey.net/).
2. Ouvre le **[lien d'installation direct](https://raw.githubusercontent.com/user257814938/Notebook-Downloader/main/notebook-downloader.user.js)** dans le navigateur où Tampermonkey est installé. Tu peux aussi ouvrir **[notebook-downloader.user.js](notebook-downloader.user.js)** sur GitHub, puis cliquer sur **Raw** (fichier brut).
3. Tampermonkey doit afficher une page d'installation pour **Notebook Downloader**. Clique sur **Installer**.
4. Recharge ton notebook après avoir sauvegardé tes modifications. Le bouton **Download** apparaît à côté de **SAVE**, ou en haut à droite si cet emplacement est introuvable ou masqué.

### Si le lien affiche du code au lieu du bouton Installer

1. Copie l'adresse du fichier **Raw**, pas celle de la page GitHub qui présente le code.
2. Ouvre **Tampermonkey → Tableau de bord → Utilitaires**.
3. Dans **Installer depuis une URL** (ou *Import from URL*, selon la version), colle cette adresse et lance l'importation.
4. Confirme avec **Installer**, puis recharge ton notebook.

Aucun compte GitHub n'est nécessaire pour récupérer le script depuis ce dépôt public.

## Mises à jour automatiques depuis GitHub

À partir de la version **1.3.0**, le script déclare explicitement ses adresses `@updateURL` et `@downloadURL`, qui pointent vers le fichier Raw de la branche `main` de ce dépôt. Tampermonkey vérifie cette adresse et récupère les nouvelles versions selon ses réglages de mise à jour. Le contenu de tes notebooks n'est pas envoyé à GitHub.

- **Première transition :** ouvre une fois le [lien d'installation direct](https://raw.githubusercontent.com/user257814938/Notebook-Downloader/main/notebook-downloader.user.js) et confirme la mise à jour, si ta version installée ne dispose pas encore de ces adresses.
- Dans les paramètres Tampermonkey, conserve les vérifications de mises à jour activées. Dans les paramètres de Notebook Downloader, vérifie que **Rechercher des mises à jour** est coché.
- Les mises à jour ne sont pas instantanées : Tampermonkey vérifie périodiquement. Tu peux aussi lancer une recherche manuelle depuis son tableau de bord.
- Recharge la page du notebook après la mise à jour pour utiliser le nouveau code.
- Pour publier une nouvelle version, augmente toujours `@version` (par exemple `1.3.0` → `1.3.1`) et publie le fichier à la même adresse. Modifier uniquement le code sans augmenter ce numéro ne suffit pas.

Les mises à jour remplacent le code du script, y compris les personnalisations effectuées directement dans CONFIG. Ce mécanisme met à jour **Notebook Downloader dans Tampermonkey** ; l'extension Tampermonkey elle-même reste mise à jour par la boutique du navigateur. Le script console se récupère manuellement et n'est pas concerné.

## Mode bouton — installation manuelle alternative

1. Installe Tampermonkey dans ton navigateur habituel.
2. Clique sur son icône, puis sur **Créer un nouveau script**.
3. Ouvre `notebook-downloader.user.js` et copie tout son contenu.
4. Dans l'éditeur Tampermonkey, remplace tout le modèle existant (**Ctrl+A**, puis **Ctrl+V**).
5. Enregistre avec **Ctrl+S** et vérifie que le script est activé.
6. Recharge ton notebook après avoir sauvegardé tes modifications.

Si tu avais installé une première version de ce projet sous un autre nom, désactive-la ou supprime-la de Tampermonkey avant d'utiliser **Notebook Downloader**, pour éviter deux boutons.

## Utilisation du bouton

**SAVE** enregistre le notebook sur la plateforme. Le bouton séparé **Download** télécharge le fichier `.ipynb` sur ton ordinateur. Si la barre est absente ou masquée, **Download** apparaît en bouton flottant en haut à droite.

Dans la barre, le bouton reprend automatiquement les classes CSS, la police, la taille, la graisse, l'espacement des lettres et les dimensions du bouton voisin. Sur la plateforme examinée : Rubik, 11 px, graisse 600, majuscules et espacement de 1,4 px. Ces valeurs sont lues sur la page, sans être imposées aux autres sites. L'icône SVG de 24 px est intégrée directement au script ; aucun fichier image séparé n'est nécessaire.

La version 1.2.2 a été vérifiée dans Comet après rechargement : le bouton apparaît automatiquement et ses styles calculés correspondent à ceux de SAVE (typographie, hauteur de 60 px et marges internes de 0 px / 20 px).

1. Connecte-toi à ta plateforme et ouvre un notebook compatible.
2. Attends son chargement, puis clique sur **Download**.
3. Si le navigateur le demande, choisis le dossier et clique sur **Enregistrer**.

Le fichier conserve le nom du notebook ouvert, par exemple `introduction_python.ipynb`. Le navigateur gère le dossier de destination et les éventuels doublons selon ses réglages.

Tu peux ensuite importer le fichier dans Google Drive ou l'enregistrer dans un dossier déjà synchronisé avec Drive pour ordinateur. Le script ne se connecte pas à ton compte Google.

## Compatibilité

Les deux modes nécessitent une interface **Jupyter classique** exposant `Jupyter.notebook` ou `IPython.notebook` et sa fonction `toJSON()`. Ils ne fonctionnent pas automatiquement sur tous les sites de notebooks.

Le **mode bouton** se place dans la barre de commandes ou, si son emplacement est absent ou masqué, en bouton flottant en haut à droite. Les pages concernées sont définies dans la ligne `@match` du script Tampermonkey :

```javascript
// @match        https://*.notebooks.datascientest.com/*
```

Ce filtre technique reste nécessaire pour limiter l'exécution aux pages prises en charge. Par défaut, le bouton est placé après `#save_notebook-button`. L'emplacement est configurable comme expliqué ci-dessous. Pour prendre en charge un autre site, il faut vérifier son API Jupyter. Le bouton flottant permet de fonctionner sans adapter l'emplacement dans sa barre de commandes.

## Personnaliser les scripts

Les paramètres modifiables sont regroupés au début de chaque fichier dans un bloc **CONFIG**. Les deux scripts restent autonomes : aucun fichier de configuration externe à installer ou à charger.

### Quel script est générique ?

| Fichier | Dépend du domaine ? | Dépend de la barre de boutons du site ? | Paramètres à modifier |
| --- | --- | --- | --- |
| `notebook-downloader-console.js` | Non | Non | Aucun : le nom du notebook est récupéré automatiquement. `CONFIG.fileName` permet seulement d'imposer un autre nom si souhaité. |
| `notebook-downloader.user.js` | Oui, via `@match` | Non : bouton flottant de secours | Pour un autre site compatible : domaine autorisé. Emplacement, texte, icône, couleur et nom du fichier sont facultatifs. |

« Générique » signifie ici **compatible avec les pages qui exposent Jupyter classique**. Le copier-coller console ne garantit pas la compatibilité avec JupyterLab, Google Colab ou un autre éditeur de notebooks utilisant une API différente.

### Mode console

Par défaut, **ne modifie rien** : copie-colle le fichier entier dans la console, et le téléchargement reprend le nom du notebook ouvert. Les paramètres suivants sont facultatifs :

```javascript
const CONFIG = Object.freeze({
  fileName: '',
  fallbackFileName: 'notebook.ipynb',
});
```

`fileName: ''` active le nom automatique. `fallbackFileName` sert uniquement si aucun nom n'est disponible. Pour imposer volontairement un nom, tu peux remplacer `''` par `'mes_notes.ipynb'`.

Copie **tout le fichier** dans la console de la page du notebook. Aucune URL, aucun nom d'école et aucun identifiant n'est nécessaire.

### Mode bouton : 1. Choisir le site dans l'en-tête

La ligne `@match` indique à Tampermonkey **où le script peut s'exécuter**. Il s'agit d'un filtre de domaine, pas de ton lien de connexion personnel. Le filtre actuel couvre les différents serveurs de notebooks de la plateforme prise en charge : tu n'as pas besoin d'y mettre ton sous-domaine personnel.

Pour un autre site compatible, remplace cette ligne par son propre motif. Exemple fictif :

```javascript
// @match        https://notebooks.exemple.fr/*
```

Plusieurs sites peuvent être déclarés avec plusieurs lignes `@match`. N'ajoute que les domaines que tu souhaites utiliser.

**Ce réglage doit rester dans l'en-tête.** Tampermonkey le lit avant d'exécuter le JavaScript : écrire une URL dans `CONFIG` ne modifierait pas `@match`. L'adresse du site est donc définie une seule fois, dans cet en-tête, sans copie à synchroniser dans le moteur.

### Mode bouton : 2. Modifier CONFIG

```javascript
const CONFIG = Object.freeze({
  anchorSelector: '#save_notebook-button',
  buttonLabel: 'Download',
  buttonIcon: 'download',
  accentColor: '#ff6847',
  fileName: '',
  fallbackFileName: 'notebook.ipynb',
});
```

| Paramètre | Effet |
| --- | --- |
| `anchorSelector` | Sélecteur CSS d'un élément après lequel ajouter le bouton. `#save_notebook-button` désigne l'élément portant cet identifiant. S'il est absent ou masqué, le bouton flotte en haut à droite. |
| `buttonLabel` | Texte du bouton. |
| `buttonIcon` | `'download'` affiche une flèche vers un bac, dessinée en SVG intégré. Un autre texte affiche ce symbole ; `''` masque l'icône. Aucune bibliothèque ni police externe nécessaire. |
| `accentColor` | Couleur CSS du contour de sélection et des messages. |
| `fileName` | `''` conserve automatiquement le nom du notebook. Une valeur comme `'mes_notes.ipynb'` impose un nom. |
| `fallbackFileName` | Nom proposé si le notebook n'a pas de nom identifiable. |

Une modification dans CONFIG est réutilisée partout où ce réglage intervient : il n'est pas nécessaire de remplacer des valeurs dans le reste du fichier. Les identifiants internes du script et les mécanismes Jupyter ne sont pas des informations personnelles à configurer.

Après modification dans Tampermonkey, enregistre avec **Ctrl+S**, puis recharge le notebook après avoir sauvegardé ton travail. Les modifications locales dans Tampermonkey ne changent pas le fichier partagé sur GitHub ; une réinstallation ou une mise à jour peut remplacer ces personnalisations. Garde une copie de tes paramètres si tu les modifies.

## Ce que contient le téléchargement

Les deux scripts utilisent la fonction native Jupyter `toJSON()` pour exporter **l'état du notebook actuellement ouvert**, y compris les modifications présentes avant un clic sur SAVE. Ils récupèrent tous les deux le nom du notebook automatiquement par défaut. `CONFIG.fileName` permet d'imposer un autre nom uniquement si tu le souhaites. Le mode bouton ajoute des vérifications de structure et de nombre des cellules avant de demander le téléchargement.

Les deux modes conservent les données fournies par Jupyter sans filtrer les cellules, le code, le texte, les sorties, les pièces jointes ou les métadonnées. Ils ne téléchargent pas le fichier brut du serveur et ne garantissent pas une identité octet par octet avec celui-ci.

Les vidéos, images liées par URL, fichiers de données externes et l'environnement Python ne sont pas copiés. Les cellules Python ne sont pas exécutées par le script.

## Si le bouton n'apparaît pas

- Vérifie que Tampermonkey et **Notebook Downloader** sont activés.
- Vérifie que ton notebook est ouvert sur une page compatible et recharge cette page.
- Vérifie que Tampermonkey est autorisé sur le site concerné.
- Si l'extension demande l'autorisation d'exécuter des scripts utilisateur, consulte son [aide officielle](https://www.tampermonkey.net/faq.php?q=Q209).
- Sur Chrome / Comet, vérifie **Autoriser les scripts utilisateur** dans les détails de Tampermonkey, même si le script apparaît déjà activé dans son tableau de bord.
- Si le bouton indique que le notebook est encore en chargement, attends quelques secondes et réessaie.

## Partager le script

Partage le **[lien d'installation Tampermonkey](https://raw.githubusercontent.com/user257814938/Notebook-Downloader/main/notebook-downloader.user.js)**, par exemple sur WhatsApp, en précisant qu'il faut d'abord installer Tampermonkey sur ordinateur. Le **[dépôt GitHub](https://github.com/user257814938/Notebook-Downloader)** permet de consulter les instructions et les deux scripts.

Conserve l'extension **`.user.js`** dans le nom du fichier : elle permet au gestionnaire de scripts de reconnaître le fichier à installer. Aucun notebook personnel n'est nécessaire dans le dépôt.

Pour les personnes qui préfèrent le mode sans extension, partage le lien de `notebook-downloader-console.js` et les étapes de la section **Mode console**. Ce fichier se colle dans la console ; il ne s'installe pas dans Tampermonkey.

## Désactivation

Désactive **Notebook Downloader** dans Tampermonkey, puis recharge le notebook. Le bouton disparaît.

## Fonctionnement et vérifications

Le code d'export ne contient aucun identifiant personnel, ne fait aucune requête réseau et ne modifie pas les réglages du navigateur. Tampermonkey peut contacter GitHub séparément pour récupérer les mises à jour du script. L'intégration de la barre du mode bouton a été examinée sur une page de cours connectée.

Des vérifications locales ont confirmé la conservation des données JSON d'un notebook de 43 cellules, le nommage des fichiers, les messages d'erreur et l'absence de boutons en double. Des simulations supplémentaires couvrent le bouton flottant, l'apparition tardive de la barre et la disparition de son emplacement. L'installation depuis le lien Raw a été confirmée par l'utilisateur. Un essai réel de la version 1.2.0 exécutée depuis la console dans Comet a confirmé l'affichage du bouton et l'enregistrement de `00_python_01_variables.ipynb` : 32 cellules, 31 443 octets, JSON au format notebook 4. Cet essai ne valide pas à lui seul le lancement automatique par Tampermonkey.
