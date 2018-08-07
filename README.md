# Mytunes
Itunes GUI, Parser and Exporter

## TODO List
### MUST HAVE

* Lecteur
    * [x] Boutons disabled si pas de musique chargée
    * [ ] Locker le lecteur pour éviter des misclicks

* Liste des musiques
    * [x] CSS : ajuster la select box des genres pour que la flèche prenne moins de place
    * [ ] L'update des propriétés se fait en direct (plutôt que de passer par une phase "fetching")
    * [ ] Etudier le retour à un tableau normal ?
    * [ ] Vérifier la performance d'une recherche dynamique (plutôt qu'appuyer sur Entrée)

* Playlists :
    * [ ] BUG Scroll quand on sélectionne une playlist
    * [ ] Scroll vers la playlist sélectionnée
    * [ ] BUG Affecter un enfant à un parent puis renommer le parent => L'enfant revient à la racine (même chose quand on renomme l'enfant)
          => Problème de mise à jour du store ??
    * [ ] Footer avec la durée de la playlist
    * [ ] Chargement de la playlist dans la playlist courante sur double clic (après confirm dialog)

* Playlist Menu :
    * [x] Mise à jour de la bdd en direct (add musique, etc.)
    * [NO] Remplacer une playlist par une autre (enregistrer sous)
        * [NO] Message d'avertissement si remplacement
        * [NO] Transfert des enfants vers le nouveau (sans perdre les anciens enfants !)
    * [x] Suppression d'une playlist et de ses enfants
    * [x] Refaire le "Enregistrer sous"
        * [ ] BUG Le nouveau nom ne s'affiche pas (la playlist courante ne doit pas être mise à jour).
    * [ ] Refaire les items (drag & drop)
    * [ ] Gérer les musiques en double dans la playlist (marque les 2 comme lus)
    * [ ] Footer avec la durée de la playlist courante
    * [ ] Le volume reste au dessus du menu des playlists
    * [ ] Si le lecteur est en train de jouer, demander confirmation avant de lancer manuellement une autre musique (paramétrable)

* Listes / tree de playlist :
    * [ ] Déplier au clic sur la flèche (pas sur le nom)
    * [ ] BUG Recherche de playlists dans le dialog "load"
    * [ ] Drag d'arborescence => le store n'est pas MAJ

* Liste par genre :
    * [ ] Faire un menu gauche pour sélectionner le genre

* Général
    * [x] Sortir d'un loading infini
    * [x] Local storage pour le playlistManager
    * [ ] Reload de la page
    * [x] Communications WebSockets pour les fonctions de base (lecture, pause, suivant, volume)
    * [ ] Pouvoir confirmer les confirm dialog via la touche "Entrée"
    * [ ] Gestion des logs Front et Back
    * [ ] Backup réguliers de la BDD
    * [ ] Télécharger les fichiers CSS (font-awesome) et les icones (shortcut icon)

* Playlists intelligentes
    * [ ] Gestion des critères + Recherche
    * [ ] Organisation en arbre
    * [ ] Ajout à l'arbre existant des playlists ?

* Import
    * [ ] Import iTunes + récupération des fichiers (si besoin selon conception

* Export
    * [ ] Export de musiques
        * [ ] Ajout d'actions sur l'écran des musiques pour exporter ?
    * [ ] Export de la playlist courante

* Paramètres
    * [ ] Lister des genres
    * [ ] Activer la sécurité sur le playlist menu (confirm dialog si changement de musique manuel)
    * [ ] Activer les WS / Désactiver les envois de WS mais pas les réceptions / tout désactiver




### OPTIONALS
* Appli React Native
    * [ ] Détection de la connection au bon réseau (raspberry)
        * [ ] Détection du lecteur ou du raspberry sur n'importe quel réseau
    * [x] Communications WebSockets pour les fonctions de base (lecture, pause, suivant, volume)
    * [x] Communications WebSockets pour gérer la playlist courante
    * [ ] Communications WebSockets pour des fonctions avancées de contrôle du volume (gain, nivaux)

* Lecteur
    * [ ] Visualisation du flux audio (plug-in js)
    * [ ] Bouton mute pour le volume

* Import / Export
    * [ ] Barre de chargement de l'import
    * [ ] Barre de chargement de l'export

* Playlists
    * [ ] Pouvoir ajuster la largeur des 2 sections d'écran manuellement (avec icône <-||->)
    * [ ] Avoir les musiques et les playlists sur un seul écran
        * [ ] Pouvoir faire du drag'n drop de musiques directement dans les playlists
    * [ ] Gérer les playlist intelligentes et les playlists "normales" au même endroit

* Général
    * [ ] Mettre en place l'undo
    * [ ] Cocher les cases Actions sur le hover si le click est enfoncé (comme sur Photoshop) => chaud !
    * [ ] BDD centralisée avec MAJ quand connecté au réseau.