# LÉIA
![Icône LÉIA](https://addons.cdn.mozilla.net/user-media/addon_icons/2123/2123183-64.png)

[Soutenez LÉIA, faites un don !](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZSBRU3M8DXVRS&source=url)

**Contact :** a.mezurat@protonmail.com

**LÉIA** est sous [licence Apache](https://github.com/ANN-MB/LEIA/blob/master/LICENSE)

ADDON Firefox enfin disponible ! Voir [https://addons.mozilla.org/fr/firefox/addon/leiaccessible/](https://addons.mozilla.org/fr/firefox/addon/leiaccessible/)

## Dernières mises-à-jour (15/05/2019)

* Fonction de surlignage **highlight()** optimisée et rétablie
* Tous les pronoms ajoutés au dictionnaire
* Dictionnaire séparé dans un autre fichier JS
* Rétablissement des dimensions correctes de la fenêtre de préférences
* Optimisation de la fonction **skim()**

## Problèmes connus ou évolutions à venir

* Prédictif et point-médian non fonctionnels sur les balises dotées de **[contenteditable=true]**
* Fonction **highlight()** ne reconnaît que le point médian et la puce.
* Dictionnaire prédictif à enrichir
* Les mots composés tels que **tout·e-puissant·e** donnent **tout toute-puissant puissante** lorsque **tout-puissant toute-puissante** serait préférable

## Résumé

**LÉIA** est une extension pour le navigateur Firefox (et bientôt d'autres). Elle est vouée à améliorer l'**accessibilité** des personnes malvoyantes, non-voyantes et dyslexiques aux sites internet qui auraient choisi de rédiger leur contenu en **écriture inclusive**.

## Qu'est–ce que l'écriture inclusive ?

L'écriture inclusive, aussi appelée langage épicène ou encore langage non-sexiste, est une manière d'écrire le français afin de contrer la règle grammaticale qui veut que « le masculin l'emporte ». Le genre « neutre » en français étant exprimé exclusivement au masculin.

Peu importe le nombre de femmes qui composent un groupe, s'il compte un seul homme, on parlera de ce groupe au masculin.
Le but est donc de faire de notre langue, le français, une langue qui représente mieux les individus dont elle parle et à qui elle s'adresse. L'écriture inclusive permet également de s'exprimer à propos de personnes ne se reconnaissant ni du masculin, ni du féminin (ex : personnes non-binaires).

L'écriture inclusive telle que nous la connaissons aujourd'hui ne date pas d'hier et est expérimentée depuis, au moins, les années 70. Cependant, sa popularisation est très récente. Adoptée par la RATP, la Marie de Paris, et certains manuels scolaires, elle fut finalement recommandée par le [Haut Conseil à l'Égalité entre les Femmes et les Hommes](http://www.haut-conseil-egalite.gouv.fr/stereotypes-et-roles-sociaux/zoom-sur/article/pour-une-communication-sans-stereotype-de-sexe-le-guide-pratique-du-haut) en 2016 et est maintenant employée sur de nombreux sites d'annonces d'emploi, dans des journaux à grand tirage, etc.

### À quoi ça ressemble concrètement ? ###

Par exemple, au lieu d'écrire : 
« Les membres de la chambre haute sont désignés par le titre de **sénateur** »
On écrira :
« Les membres de la chambre haute sont **désigné·e·s** par le titre de **sénateur·rice** »

Même si nous devons nous réjouir de cette réforme de la langue française, celle-ci amène avec elle quelques complications.

## Alors quel est le problème ?

Le problème de l'écriture inclusive est qu'elle amène avec elle de nouvelles graphies (de nouvelles façons d'écrire les mots).

Bien que l'orthographe grammaticale ne soit pas fondamentalement bouleversée, elle l'est suffisamment pour poser des problèmes d'interprétation par les **lecteurs d'écran et les plages braille**, dispositifs destinés à l'appréhension du langage écrit par les personnes malvoyantes.

L'écriture inclusive s'emploie généralement avec des caractères spéciaux - point médian (·) ou puce (•) qui sont mal interprétés, soit le point (.) ou le tiret (-) qui sont déjà voués à d'autres usages syntaxiques. De plus, tous les lecteurs d'écran n'interprètent pas ces séparateurs de la même façon.

L'accessibilité web a toujours été une surcouche informatique pénible pour les développeur·euse·s qui ne s'en préoccupent que rarement pour de diverses raisons : manque de temps ou d'information à ce sujet, difficultés à trouver des normes universelles acceptées par tous les navigateurs et systèmes d’exploitation, ou encore parce que les personnes malvoyantes sont parfois considérées comme une minorité pour laquelle il est peut intéressant d'accorder du temps et de l'argent.

Partant de ce constat, et après avoir constaté sur internet que de nombreuses personnes malvoyantes regrettaient de ces nouvelles normes, il m'a semblé intéressant de chercher une solution la plus universelle possible pour que l'écriture inclusive soit également accessible pour les personnes malvoyantes. Et donc, **une écriture inclusive réellement inclusive** !

## LÉIA

LÉIA permet diverses choses :
* Supprimer les séparateurs et réécrire les phrases de façon intelligible par les lecteurs d'écran
(en lisant le mot aux deux genres, ou au genre choisi par l'utilisateur·rice)
* Surligner les terminaisons inclusives pour les mettre en évidence et simplifier la lecture
* Accéder simplement au point médian grâce à un raccourci clavier simple [ ; ] + [ ; ]
* Activer un dictionnaire prédictif permettant de compléter automatiquement des mots au masculin avec la terminaison au féminin

### Comment ça marche ? ###

Le script parcours l'architecture d'une page web à la recherche de motifs propres à l'écriture inclusive. En fonction du motif identifié, le script applique alors une règle spécifique et modifie la page avec une nouvelle écriture.

##### Exemple : #####

* Le script détecte **artisan·e·s**
* Il détecte le motif **racine + suffixe masculin + séparateur + e + s**
* La dernière lettre de la racine étant un **n**, le script appelle une règle concernant les mots dont le féminin et le masculin "sonnent" différemment à l'oral. 
* La règle de sortie suivante est utilisée : **racine + suffixe masculin + s + [espace] + racine + suffixe féminin + s**
* Le script replace l'expression originale par **artisans artisanes**

## Développement

L'élaboration de ce programme, qui a commencé il y a un peu plus d'un an fût particulièrement complexe pour plusieurs raisons :

### Recherche sur l'orthographe française ###

Les guide de rédaction en écriture inclusive, et notamment celui du [Haut Conseil à l'Égalité](http://bit.ly/2fejwZ7) qui tente de la populariser, proposent seulement une poignée de graphies possibles pour seulement 17 terminaisons et 5 pronoms, adverbes etc. Or, d'après de longues recherches, j'ai identifié une **soixantaine de terminaisons différentes** et 11 pronoms, adverbes, etc, différenciant le masculin du féminin.

### Recherche sur les usages populaires de l'écriture inclusive ###

Pour palier à ce manquement, il a fallu intégrer dans un premier temps les graphies déjà utilisées par tout le monde sur internet, dans la presse ou dans des documents politiques. Difficulté de taille puisque les usages populaires, donc non codifiés, sont parfois assez différents pour un seul et même mot. Là ou certaines écrivent **amoureux·euse**, certains écrivent **amoureux·se**. J'ai du enfin créer différentes formes de néologismes pour des mots que je n'avais jamais rencontré (ex : **tiers·ces** ou **tier·ce·s**).

### Programmation ###

Le choix du JavaScript est simple : **LÉIA** doit s'appliquer sur l'ordinateur de l'utilisateur·rice et non depuis le serveur puisque cela impliquerait que chaque site internet intègre le script (ce qui a peu de chance d'arriver) et il ne serait donc pas paramétrable par l'utilisateur·rice malvoyant·e De plus, cela signifierait faire disparaître syntaxiquement l'écriture inclusive pour toutes les personnes, y compris voyantes.

Si vous constatez le moindre bug, [n'hésitez-pas à me le signaler](mailto:a.mezurat@protonmail.com) :)


## Ressources utilisées pour mener à bien ce projet

##### Livres #####

BORDE Davy, 2016. [Tirons la langue – Plaidoyer contre le sexisme dans la langue française.](http://www.editions-utopia.org/portfolio-view/tirons-la-langue-plaidoyer-contre-le-sexisme-dans-la-langue-francaise/) Éditions Utopia.

ZACCOUR Suzanne & LESSARD Michaël, 2018. [Manuel de grammaire non sexiste et inclusive.](https://www.syllepse.net/lng_FR_srub_62_iprod_716-manuel-de-grammaire-non-sexiste-et-inclusive.html) Éditions Syllepse.

##### Brochures #####

Haut Conseil à l'Égalité entre les femmes et les hommes (HCE), 2016. [Pour une communication publique sans stéréotype de sexe.](http://bit.ly/2fejwZ7) Édité par La documentation Française.

HADDAD Raphaël & BARIC Carline, 2016. [Manuel d'écriture inclusive.](https://www.motscles.net/s/Manuel-decriture-inclusive-yal5.pdf) Édité par l'agence Mots-Clés.

##### Sites internet #####

https://regex101.com/ - test des expressions régulières

https://stackoverflow.com/ - conseils de programmation (forum de développeur et développeuses)

https://fr.wiktionary.org/ - vérification de l'orthographe, de la conjugaison, des accords

http://dict.xmatiere.com/ et https://www.listesdemots.net - recherche de suffixes

https://www.feminin-pluriel.exionnaire.com/ - quelques déclinaisons irrégulières au féminin

bertrandboutin.ca (hors ligne) - d'autres exceptions de noms et d'adjectifs au féminin

https://www.github.com/ - pour l'hébergement du développement du script

https://codepen.io/vincent-valentin/full/woGLVL - pour la réflexion sur les graphies de l'écriture inclusive

https://developer.mozilla.org/ - documentation sur la création d'add-on Firefox

http://romy.tetue.net/ - pour ses articles sur l'accessibilité web et l'écriture inclusive 

##### Programmes #####

**Mozilla Firefox** - navigateur concerné par l'add-on

**Notepad++** - programmation en JavaScript

**KobaSpeech, NVDA, Talkback, JAWS** - test des synthèses vocales logicielles

## Remerciements

Merci à [Julie Moynat](https://www.juliemoynat.fr) pour les retours, à l'équipe d'[incluZor·e](http://incluzor.fr/) pour nos échanges, et à plein d'autres ami·e·s anonymes pour leurs conseils et soutiens :)
