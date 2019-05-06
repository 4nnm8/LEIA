# LÉIA

[Soutenez LÉIA, faites un don !](https://bit.ly/2vuzK7g)

**Contact :** a.mezurat@protonmail.com

**LÉIA** est sous licence Apache
![Licence Apache](https://raw.githubusercontent.com/ANN-MB/LEIA/master/img/apache.png)

## Dernières mises-à-jour (02/05/2019)
* Page de test adaptée aux nouvelles problématiques
* Enrichissement du dictionnaire prédictif (terminaisons rares, terminaisons en **-eresse**, **-eur**, **-ète**, **-if**)
* Suppression de certains conflits entre différentes terminaisons
* Modification du script pour prévention de conflits du DOM avec d'autres scripts
* Simplification et amélioration du menu de configuration

## Problèmes connus en recherche de solution
* **DOM flickering** pour une raison inconnue
* Les mots composés tels que **tout·e-puissant·e** donnent **tout toute-puissant puissante** lorsque **tout-puissant toute-puissante** serait préférable
* Conflit avec les mots composés contenant **t-le** (ex : haut-le-cœur) 
* Anglicisme ayant un masculin en **-er** et un féminin en **-euse** ou **-trice** non pris en compte (ex : bookmaker·euse
supporter·trice)
* Redondance entre le dictionnaire prédictif et le dictionnaire de conversion. Le but → un seul système de dictionnaire plus efficace et moins conflictuel.
* Optimisation possible du **TreeWalker** et de la fonction **highlight()**
* Dictionnaire prédictif imparfait (certaines règles trop globales, terminaisons en **double consonnes + e** pour le moment ignorées)

## Résumé

**LÉIA** est un script codé en langage de programmation JavaScript. Il est voué améliorer l'**accessibilité** des personnes malvoyantes, non-voyantes et dyslexiques aux sites internet qui auraient choisi de rédiger leur contenu en **écriture inclusive**.

Au stade actuel de son développement, **LÉIA** s'oriente vers une série d'add-ons pour navigateurs web et lecteurs d'écrans.

## Qu'est–ce que l'écriture inclusive ?

L'écriture inclusive, aussi appelée langage épicène ou encore langage non-sexiste, est une manière d'écrire le français afin de contrer la règle grammaticale qui veut que « le masculin l'emporte ». Le genre « neutre » en français étant exprimé exclusivement au masculin.

Peu importe le nombre de femmes qui composent un groupe, s'il compte un seul homme, on parlera de ce groupe au masculin.
Le but est donc de faire de notre langue, le français, une langue qui représente mieux les individus dont elle parle et à qui elle s'adresse. L'écriture inclusive permet également de s'exprimer à propos de personnes ne se reconnaissant ni du masculin, ni du féminin (ex : personnes non-binaires).

L'écriture inclusive telle que nous la connaissons aujourd'hui ne date pas d'hier et est expérimentée depuis, au moins, les années 70. Cependant, sa popularisation est très récente. Adoptée par la RATP, la Marie de Paris, et certains manuels scolaires, elle fut finalement recommandée par le [Haut Conseil à l'Égalité entre les Femmes et les Hommes](http://www.haut-conseil-egalite.gouv.fr/stereotypes-et-roles-sociaux/zoom-sur/article/pour-une-communication-sans-stereotype-de-sexe-le-guide-pratique-du-haut) en 2016 et est maintenant employée sur de nombreux sites d'annonces d'emploi, dans des journaux à grand tirage, etc.

### À quoi ça ressemble concrètement ? ###

Par exemple, au lieu d'écrire : 
« Les membres de la chambre haute sont désignés par le titre de **sénateur** »
On écrira :
« Les membres de la chambre haute sont **désigné·es** par le titre de **sénateur·rice** »

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

Pour palier à ce manquement, il a fallu intégrer dans un premier temps les graphies déjà utilisées par tout le monde sur internet, dans la presse ou dans des documents politiques. Difficulté de taille puisque les usages populaires, donc non codifiés, sont parfois assez différents pour un seul et même mot. Là ou certaines écrivent **amoureux·euse**, certains écrivent **amoureux·se**. J'ai du enfin créer différentes formes de néologismes pour des mots que je n'avais jamais rencontré (ex : **tier·ce·s** ou **tiers·ces**).

### Programmation ###

Le choix du JavaScript est simple : **LÉIA** doit s'appliquer sur l'ordinateur de l'utilisateur·ice et non depuis le serveur puisque cela impliquerait que chaque site internet intègre le script (ce qui a peu de chance d'arriver) et il ne serait donc pas paramétrable par l'utilisateur·ice malvoyant·e. De plus, cela signifierait faire disparaître syntaxiquement l'écriture inclusive pour toutes les personnes, y compris voyantes.

Pour le reste, je vous laisse analyser le fichier [leia.js](https://github.com/ANN-MB/LEIA/blob/master/leia.js) pour mieux comprendre son fonctionnement.

Si vous constatez le moindre bug, [n'hésitez-pas à me le signaler](mailto:a.mezurat@protonmail.com) :)

## Reccomandations sur l'usage de l'écriture inclusive

Parmi ces 6 séparateurs en usage : point médian (·), tiret (-), point (.), puce (•), opérateur puce (∙) et slash (/), il est recommandé d'utiliser le point médian.

S'il est actuellement recommandé par le Haut Conseil à l'Égalité Femme-Homme, c'est qu'il présente plusieurs intérêts :

→ Ce caractère n'est pas précédemment utilisé dans l'orthographe française. Sa seule fonction sera donc de marquer l'inclusivité et il ne pourra être confondu.

→ Contrairement aux autres séparateurs, le point médian se démarque par une typographie intéressante : il à l'avantage d'avoir une approche et une chasse faible, en plus d'être positionné au niveau de la traverse. Il ne créé donc pas une rupture visuelle ou esthétique particulièrement marquée dans le mot. Il se fait discret tout en s'employant bien à lier le genre masculin et féminin.

![Typographie du point médian](https://raw.githubusercontent.com/ANN-MB/LEIA/master/img/typo.jpg)

• Il n'y a jamais d'espace avant et après un point médian.

Exemple : **artisan · e** → **artisan·e**

CONCERNANT LES PLURIELS :

• Le **s** du pluriel, quand il est présent, peut être accolé au suffixe féminin ou séparé par un deuxième point médian

Correct : **artisan·es** ou **artisan·e·s**

**SAUF**

(1) Quand le masculin singulier finit déjà par un **s**, auquel cas on accollera le **s** du pluriel.

Correct : **chinois·es** 

Incorrect : **chinois·e·s** car **chinois** n'a pas besoin d'un deuxième **s** au pluriel

On peut aussi supprimer le **s** du masculin singulier car on le retrouvera à la fin.

Exemple : **tier·ce·s** ; **tou·te·s**

(2) Lorsque le masculin pluriel finit **-x** et le féminin pluriel en **-s**. Dans ce cas, le **s** est collé au suffixe féminin.

Correct : **faux·ausses**

Incorrect : **faux·ausse·s** car **faux** ne prend pas de **s** au pluriel

• Attention, la graphie artisan(e)s ne sera absolument pas prise en compte par **LÉIA** et n'est pas considérée inclusive

• La graphie artisanEs, parfois utilisée pour faire emphase sur le féminin n'est pas non plus interprétée par **LÉIA**

• Pour ne pas alourdir le texte oralisé, il est préconisé de ne pas abuser des mots inclusifs fusionnés et de favoriser des tournures de phrases plus neutres.

Pour plus d'information, consultez le guide du Haut Conseil à l’Égalité Femme Homme : [http://bit.ly/2fejwZ7](http://bit.ly/2fejwZ7)

### Autres exemples de graphies inclusives ###

> **Féminins en -ÈRE ou -ÈTE**

douanier·e *ou* douanièr·e *ou* douanier·ère

complèt·e *ou* complet·e *ou* complet·ète

> **Féminins en -CONSONNE+E**

chinois·e / artisan·e / lourd·e / fort·e

> **Féminins en -DOUBLE CONSONNE+E**

citoyen·ne / gentil·le / cadet·te / gros·se

> **Masculins en -EUR**

vaneur·euse

chasseur·eresse 

facteur·trice *ou* facteur·rice *ou* facteur·ice

ambassadeur·drice *ou* ambassadeur·rice *ou* ambassadeur·ice

docteur·oresse

> **Masculins en -F, féminins en -VE**

sauf·auve *ou* sauf·ve

veuf·euve *ou* veuf·ve / neuf·euve *ou* neuf·ve

bref·ève *ou* bref·ve

inventif·ive *ou* inventif·ve

> **AUTRES RÈGLES GÉNÉRALES**

**-EAU > -ELLE** chameau·elle / chameaux·elles, ...

**-AUX > -ALES** départementaux·ales, ...

> **CAS RARES**

**-OU > -OLLE** (3 cas) 

fou·olle, foufou·olle, mou·olle

**-OUS > -OUTE** (2 cas) 

dissous·oute *ou* dissous·te 

absous·oute *ou* absous·te

**Masculin en -OUX** (4 cas) 

roux·ousse *ou* roux·sse

doux·ouce *ou* doux·ce

époux·ouse *ou* époux·se / jaloux·ouse *ou* jaloux·se

**Masculins en -C, féminins en -QUE** (7 cas) turc·que / grec·que / ...

**-IN > -IGNE** (2 cas) bénin·igne, malin·igne

**+TE** (5 cas) favori·te, rigolo·te, filou·te, loulou·te, coi·te

**-G+UE** (2 cas) oblong·ue, long·ue

**+DE** (2 cas) butor·de, esquimau·de

**-C+HE** (2 cas) blanc·he, franc·he

**INCLASSABLES (uniques)**

frais·aîche *ou* frais·che *ou* frai·che·s (au pluriel)

tiers·ce *ou* tier·ce·s (au pluriel)

héros·oïne *ou* héros·oïne *ou* héro·ïne·s (au pluriel)

faux·ausse *ou* faux·sse

sec·èche *ou* sec·he

bêta·asse *ou* bêta·sse

hébreux·aïque

vieux·ieille

andalou·se

clown·esse

copain·ine

compagnon·agne

aïeux·ieule





