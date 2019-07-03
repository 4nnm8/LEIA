<p align="center"><img src="https://i.ibb.co/4MBr2cm/logo-leia.png" alt="LÉIA - l'écriture inclusive accessible" border="0" /></p>

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZSBRU3M8DXVRS&source=url" target="_blank">Soutenez LÉIA, faites un don !</a>

**Contact :** <a href="mailto:a.mezurat@protonmail.com">a.mezurat@protonmail.com</a>

**LÉIA** est sous <a href="https://github.com/ANN-MB/LEIA/blob/master/LICENSE" target="_blank">licence Apache</a>

<a href="https://addons.mozilla.org/fr/firefox/addon/leiaccessible/" target="_blank">Extension Firefox disponible ici</a>

<a href="https://github.com/ANN-MB/LEIA/blob/master/LEIA%202.9%20chrome.crx" target="_blank">Extension Chome et Opéra disponible ici (à télécharger et installer manuellement pour le moment)</a>

<hr/>

## Dernières mises-à-jour (01/07/2019)

* Portage de l'extension sur les navigateurs **Chrome** et **Opera**.
* Amélioration de l'accessibilité de la fenêtre de préférences.
* Ajout d'une page d'aide concernant les préférences.
* Feuille de style pour la fenêtre de préférences séparée pour que tous les styles ne soient pas chargés avec toutes les pages web visitées.

## Évolutions à venir

* Amélioration de la fonction de stylisation syllabique :

     → prendra en compte tous les séparateurs (point, slash, tiret).

     → la coloration s'adaptera à la couleur de fond
     
* Enrichissement et amélioration de la pertinence du dictionnaire prédictif.

* Pouvoir zoomer dans la fenêtre de préférences (tout navigateur) sans overflow du texte. + Correction de la taille de la fenêtre de préférences pour Chrome et Opéra. 

<hr/>

## LÉIA, c'est quoi ?

**LÉIA** est une extension pour le navigateur Firefox, Chrome et Opera. Elle est vouée à améliorer l'**accessibilité** des personnes malvoyantes, non-voyantes ou ayant des difficultés de lecture aux sites internet qui auraient choisi de rédiger leur contenu en **écriture inclusive**.

<p align="center">
  <b>LÉIA</b> au <a href="http://hackecritureinclusive.com/" target="_blank">Hackaton Écriture Inclusive 2018</a><br/><br/>
  <a href="https://twitter.com/HackEcritureInc/status/966746253802594307" target="_blank"><img src="https://pbs.twimg.com/media/DWqSlpLW4AAXtDi.jpg" width="420px" alt="Présentation de LÉIA au Hackaton" /></a>                                                                                  
</p>

## Les fonctionnalités de LÉIA

* Supprimer les séparateurs et réécrire les phrases de façon intelligible par les lecteurs d'écran
(en lisant le mot aux deux genres, ou au genre choisi par l'utilisateur·rice)
* Accéder simplement au point médian grâce à un raccourci clavier simple (deux fois la touche point-virgule).
* Activer un dictionnaire prédictif permettant de compléter automatiquement des mots au masculin avec la terminaison au féminin
* Stylisation syllabique des terminaisons inclusives pour faciliter la lecture

<p style="text-align:center"><img src="https://addons.cdn.mozilla.net/user-media/previews/full/221/221580.png" alt="Aperçu de la conversion du texte avant et après activation de LÉIA" /></p>

### Comment ça marche ? ###

**LÉIA** est programmée en JavaScript. Cette extension se base notamment sur l'utilisation d'un <a href="https://github.com/ANN-MB/LEIA/blob/master/extension%20firefox/dico.js" target="_blank">dictionnaire</a>, d'expressions régulières (RegExp), de fonctions iteratives et récursives.

Le script parcours l'architecture d'une page web à la recherche de motifs propres à l'écriture inclusive. En fonction du motif identifié, le script applique alors une règle spécifique et modifie la page avec une nouvelle écriture.

##### Exemple : #####

* Le script détecte **artisan·e·s**
* Il détecte le motif **racine + suffixe masculin + séparateur + e + s**
* Le dictionnaire est convoqué pour retrouver le motif détecté, et propose le motif de sortie adapté.
* Ici, la règle utilisée sera : **racine + suffixe masculin + S + ESPACE + racine + suffixe féminin + S**
* Le script replace l'expression originale par **artisans artisanes**

### Cas non pris en charge : ###

L'écriture inclusive pour les mots entrant dans les catégories suivantes ne sont pas prises en charge par le LÉIA car :
* difficilement ou non fusionnables 
* suffixe féminin unique ou trop rare
* mot dont le genre féminin et le genre masculin ne sont pas construits à partir de la même racine

**TITRES :** duc / duchesse, roi / reine, abbé / abbesse, empereur / impératrice…

Pris en charge par défaut : baron·ne, époux·ouse, dauphin·e, compte·esse…

**GÉNÉALOGIE :** fils / fille, frère / sœur, parrain / marraine, neveu / nièce…

Pris en charge par défaut : cousin·e, filleul·e, benjamin·e, cadet·te…

**ANIMAUX :** loup / louve, canard / cane, daim / daine, dindon / dinde

Pris en charge par défaut : chien·ne, âne·esse, ours·e, maquereau·elle…

</hr>

## Qu'est–ce que l'écriture inclusive ?

L'écriture inclusive, aussi appelée langage épicène ou encore langage non-sexiste, est une manière d'écrire le français afin de contrer la règle grammaticale qui veut que « le masculin l'emporte ». Le genre « neutre » en français étant exprimé exclusivement au masculin.

Peu importe le nombre de femmes qui composent un groupe, s'il compte un seul homme, on parlera de ce groupe au masculin.
Le but est donc de faire de notre langue, le français, une langue qui représente mieux les individus dont elle parle et à qui elle s'adresse. L'écriture inclusive permet également de s'exprimer à propos de personnes ne se reconnaissant ni du masculin, ni du féminin (ex : personnes non-binaires).

L'écriture inclusive telle que nous la connaissons aujourd'hui ne date pas d'hier et est expérimentée depuis, au moins, les années 70. Cependant, sa popularisation est très récente. Adoptée par la RATP, la Marie de Paris, et certains manuels scolaires, elle fut finalement recommandée par le <a href="http://www.haut-conseil-egalite.gouv.fr/stereotypes-et-roles-sociaux/zoom-sur/article/pour-une-communication-sans-stereotype-de-sexe-le-guide-pratique-du-haut" target="_blank">Haut Conseil à l'Égalité entre les Femmes et les Hommes</a> en 2016 et est maintenant employée sur de nombreux sites d'annonces d'emploi, dans des journaux à grand tirage, etc.

### À quoi ça ressemble concrètement ? ###

Par exemple, au lieu d'écrire : 

« Les membres de la chambre haute sont désignés par le titre de **sénateur** »

On écrira :

« Les membres de la chambre haute sont **désigné·e·s** par le titre de **sénateur·rice** »

Même si nous devons nous réjouir de cette réforme de la langue française, celle-ci amène avec elle quelques complications.

## Pourquoi c'est un problème ?

Le problème de l'écriture inclusive est qu'elle amène avec elle de nouvelles graphies (de nouvelles façons d'écrire les mots).

Bien que l'orthographe grammaticale ne soit pas fondamentalement bouleversée, elle l'est suffisamment pour poser des problèmes d'interprétation par les **lecteurs d'écran et les plages braille**, dispositifs destinés à l'appréhension du langage écrit par les personnes malvoyantes. Mais aussi à des personnes ayant des difficultés avec la lecture (personnes dyslexiques par exemple).

### Voici deux articles qui en parlent : ###

* <a href="https://aides-techniques.handicap.fr/a-ecriture-inclusive-accessible-10358.php" target="_blank">L'écriture inclusive, indéchiffrable pour les non-voyants</a>
* <a href="https://www.rtl.fr/girls/identites/ecriture-inclusive-la-federation-des-aveugles-denonce-une-langue-illisible-7791065702" target="_blank">Écriture inclusive : la fédération des Aveugles dénonce une "langue illisible"</a>

L'écriture inclusive s'emploie généralement avec des caractères spéciaux - point médian (·) ou puce (•) qui sont mal interprétés, soit le point (.) ou le tiret (-) qui sont déjà voués à d'autres usages syntaxiques. De plus, tous les lecteurs d'écran n'interprètent pas ces séparateurs de la même façon.

L'accessibilité web a toujours été une surcouche informatique pénible pour les développeur·euse·s qui ne s'en préoccupent que rarement pour de diverses raisons : manque de temps ou d'information à ce sujet, difficultés à trouver des normes universelles acceptées par tous les navigateurs et systèmes d’exploitation, ou encore parce que les personnes malvoyantes sont parfois considérées comme une minorité pour laquelle il est peut intéressant d'accorder du temps et de l'argent.

Partant de ce constat, et après avoir constaté sur internet que de nombreuses personnes malvoyantes regrettaient de ces nouvelles normes, il m'a semblé intéressant de chercher une solution la plus universelle possible pour que l'écriture inclusive soit également accessible pour les personnes malvoyantes. Et donc, **une écriture inclusive réellement inclusive** !

### Recherche sur les usages populaires de l'écriture inclusive ###

L'élaboration de ce programme, qui a commencé fin 2017 est particulièrement complexe pour diverses raisons :

Les guide de rédaction en écriture inclusive actuellement disponibles, proposent rarement plus de 20 règles de terminaisons. De plus, étant non codifiées officiellement, le même mot peut être retrouvé écrit de diverses façons (exemple : **amoureux·euse**, ou **amoureux·se**).

Après de longues recherches, j'ai identifié une **soixantaine de terminaisons différentes** différenciant le masculin du féminin. Il a donc fallu extrapoler des règles avec des terminaisons non disponibles dans les guides, soit par analogie avec les graphies existantes, soit en recherchant des usages populaires (sur internet, dans la presse, etc).

De plus, comme l'écriture inclusive s'emploie parfois avec le tiret (-) ou le point (.), il faut faire en sorte que le script ne modifie pas des mots "ressemblant à de l'écriture inclusive". C'est notamment problématique concernant les mots composés avec tirets et des sigles et acrronymes avec points.


## Remerciements

Merci à [Julie Moynat](https://www.juliemoynat.fr) pour les retours et pour [son article](https://www.lelutinduweb.fr/ecriture-inclusive-accessibilite-solutions/), à l'équipe d'[incluZor·e](http://incluzor.fr/) pour nos échanges, et à plein d'autres ami·e·s anonymes pour leurs conseils et soutiens :)

## Ressources utilisées pour mener à bien ce projet

#### Livres ####

BORDE Davy, 2016. [Tirons la langue – Plaidoyer contre le sexisme dans la langue française.](http://www.editions-utopia.org/portfolio-view/tirons-la-langue-plaidoyer-contre-le-sexisme-dans-la-langue-francaise/) Éditions Utopia.

ZACCOUR Suzanne & LESSARD Michaël, 2018. [Manuel de grammaire non sexiste et inclusive.](https://www.syllepse.net/lng_FR_srub_62_iprod_716-manuel-de-grammaire-non-sexiste-et-inclusive.html) Éditions Syllepse.

#### Brochures ####

Haut Conseil à l'Égalité entre les femmes et les hommes (HCE), 2016. [Pour une communication publique sans stéréotype de sexe.](http://bit.ly/2fejwZ7) Édité par La documentation Française.

HADDAD Raphaël & BARIC Carline, 2016. [Manuel d'écriture inclusive.](https://www.motscles.net/s/Manuel-decriture-inclusive-yal5.pdf) Édité par l'agence Mots-Clés.

#### Sites internet ####

https://regex101.com/ - test des expressions régulières

https://stackoverflow.com/ - conseils de programmation (forum de développeurs et développeuses)

https://fr.wiktionary.org/ - vérification de l'orthographe, de la conjugaison, des accords

http://dict.xmatiere.com/ et https://www.listesdemots.net - recherche de suffixes M/F

https://www.feminin-pluriel.exionnaire.com/ - quelques déclinaisons irrégulières au féminin

bertrandboutin.ca (hors ligne) - d'autres exceptions de noms et d'adjectifs au féminin

https://www.github.com/ - pour l'hébergement du développement du script

https://www.lelutinduweb.fr/blog/ - blog sur l'accessibilité web

http://romy.tetue.net/ - articles sur l'accessibilité web et l'écriture inclusive 

https://epicene.info/marqueurs.html - comparaison des caractères marqueurs d'écriture inclusive

https://codepen.io/vincent-valentin/full/woGLVL - réflexion sur les graphies de l'écriture inclusive

https://qaz.wtf/u/show.cgi - conversion de caractères en code Unicode

https://developer.mozilla.org/ - documentation sur la création d'add-on Firefox

#### Programmes ####

**[Mozilla Firefox](https://www.mozilla.org/fr/firefox/new/)** - navigateur concerné par l'add-on

**[Notepad++](https://notepad-plus-plus.org/fr/)** - programmation en JavaScript

**[KobaSpeech](https://kobaspeech.com/en/), [NVDA](https://www.nvda-fr.org/), [Talkback](https://support.google.com/accessibility/android/answer/6283677?hl=fr), [JAWS](http://www.accessolutions.fr/Jaws-pour-Windows.html)** - test des synthèses vocales logicielles

## Les initiatives sympa

[Épicène - Normaliser et faciliter l'usage de l'écriture inclusive](https://github.com/MattiSG/epicene.info)

[La disparition est un jeu éducatif textuel qui a pour but l'apprentissage de écriture inclusive](https://github.com/Chrisdml/La-Disparition)

[Dictionnaire Français Hunspell compatible avec l'écriture inclusive](https://github.com/RadicaliseesSurInternet/hunspell-inclusif) + [Dictionnaire Firefox](https://addons.mozilla.org/fr/firefox/addon/fr-inclusif)

[Alt0183 - Adoptez un caractère inclusif !](https://github.com/Alt0183/Alt0183)

## Les initiatives moins sympa

[Désinclusive - Bloqueur d'écriture inclusive](https://github.com/Nitoref/desinclusive) + [Extension Firefox](https://addons.mozilla.org/fr/firefox/addon/d%C3%A9sinclusive/)

[No-inclusive](https://addons.mozilla.org/fr/firefox/addon/no-inclusive/)

[Blocut | Bloqueur écriture inclusive](https://addons.mozilla.org/fr/firefox/addon/blocut/)
