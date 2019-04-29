# LÉIA

[Soutenez LÉIA, faites un don !](https://bit.ly/2vuzK7g)

## Préambule
  
L'écriture inclusive telle que nous la connaissons aujourd'hui ne date pas d'hier et est expérimentée depuis, au moins, les années 70. Cependant, sa popularisation est très récente, suite à de nombreuses luttes visant à faire de notre langue, le français, une langue qui représente mieux les individus dont elle parle et à qui elle s'adresse, tout en combattant la règle sexiste veut que « le masculin l'emporte ».

Adoptée par la RATP et la Marie de Paris, elle fut finalement recommandée par le Haut Conseil à l'Égalité entre les Femmes et les Hommes en 2016 et est maintenant employée sur de nombreux sites d'annonces d'emploi, dans des journaux à grand tirage, etc.

Même si nous devons nous réjouir de cette réforme de la langue française, celle-ci amène avec elle quelques complications. Bien que l'orthographe grammaticale ne soit pas fondamentalement bouleversée, elle l'est suffisamment pour poser des problèmes d'interprétation par les **lecteurs d'écran** et les **plages braille**, dispositifs destinés à l'appréhension du langage écrit par les personnes malvoyantes sur les interfaces informatiques.

L'accessibilité web a toujours été une surcouche informatique pénible pour les développeur·euse·s qui ne s'en préoccupent que rarement pour de diverses raisons : manque de temps ou d'information à ce sujet, difficultés à trouver des normes universelles acceptées par tous les navigateurs et systèmes d’exploitation, ou encore parce que les personnes malvoyantes sont parfois considérées comme une minorité pour laquelle il est peut intéressant d'accorder de l'énergie.

Partant de ce constat, et après avoir constaté sur internet que de nombreuses personnes malvoyantes regrettaient de ces nouvelles normes, il m'a semblé intéressant de chercher une solution la plus universelle possible pour rendre l'écriture inclusive réellement inclusive ! C'est à dire qu'elle soit accessible également pour les personnes malvoyantes.

## Problématique

Le problème de l'écriture inclusive est qu'elle amène avec elle de nouvelles graphies (de nouvelles façons d'écrire les mots) inconnues des lecteurs d'écran. De plus, celles-ci utilisent soit des caractères spéciaux (·) ou (•), incompris par ces lecteurs, soit le point (.) ou le tiret (-) qui sont déjà voués à d'autres usages syntaxiques. De plus, tous les lecteurs d'écran n'interprêtent pas ces **séparateurs** de la même façon.

## Que fait LÉIA ?

Au stade actuel de son développement, **LÉIA** est un script rédigé en *JavaScript* et s'oriente vers une série d'add-ons pour navigateurs web. Le script parcours le code source d'une page web à la recherche de motifs propres à l'écriture inclusive. En fonction du motif identifié, le script applique alors une règle spécifique et modifie la page avec une nouvelle écriture qui sera intelligible via la synthèse vocale des lecteurs d'écrans.

Après réflexion, la solution adoptée fût de supprimer les séparateurs et de rendre audible l'inclusivité. En l'occurence, en lisant le mot écrit à l'inclusif (ex : **artisan·e·s**) à la fois au genre masculin et au genre féminin. On peut penser que cela alourdira le texte vocalisé, cependant l'utilisation de ce type de mots fusionnés ne devrait pas composer la majeure parti d'un texte rédigé en écriture inclusive.

**Exemple :**

* Le script détecte **artisan·e·s**

* Il détecte le motif **racine – séparateur – e – s**

* La dernière lettre de la racine étant un **n**, le script appelle une règle concernant les mots dont le féminin et le masculin sont différents à l'oral.

* La règle de sortie suivante est utilisée : **racine – suffixe masculin – s [espace] racine – suffixe féminin – s**

* Le script replace l'expression originale par **artisans artisanes** qui sera parfaitement compris par un lecteur d'écran.

Il est également possible de demander les mots uniquement au genre masculin ou uniquement au genre féminin.

## Développement

L'élaborations de ce programme, qui a commencé environ il y a trois mois, fût particulièrement complète pour plusieurs raisons :

###### Recherche sur l'orthographe française ###### 

Les guide de rédaction en écriture inclusive, et notamment celui du HCE qui tente de la populariser, proposent seulement une poignée de graphies possibles pour seulement 17 terminaisons et 5 pronoms, adverbes etc. Or, d'après de longues recherches, j'ai identifié 47 terminaisons différentes et 11 pronoms, adverbes, ..., différenciant le masculin et le féminin.

Guide du HCE : http://bit.ly/2fejwZ7

###### Recherche sur les usages populaires de l'écriture inclusive ###### 

Pour palier à ce manquement, il a fallu intégrer dans un premier temps les graphies déjà utilisées par les individus sur internet, dans la presse ou dans des documents politiques. Difficulté de taille puisque les usages populaires, donc non codifiés, sont parfois assez différents pour un seul et même mot. Là ou certaines écrivent **amoureux·euse**, certains écrivent **amoureux·se**. J'ai du enfin créer différentes formes de néologismes pour des mots que je n'avais jamais rencontré (ex : **tier·ce·s** ou **tiers·ces**).

###### Programmation ###### 

Le choix du JavaScript est simple : **LÉIA** doit s'appliquer sur l'ordinateur de l'utilisateur·ice et non depuis le serveur puisque cela impliquerait que chaque site internet intègre le script qui ne serait donc pas paramétrable par l'utilisateur·ice malvoyant·e, et qui ferait disparaître syntaxiquement l'écriture inclusive pour les personnes voyantes.

En plus de proposer de rendre l'écriture inclusive accesible, le développement s'oriente également vers une synthèse vocale intégrée à **LÉIA** qui permettrait donc aux personnes malvoyantes d'avoir une simulation de lecteur d'écran sur n'importe quel ordinateur qui n'en serait pas équipé (ordinateur public, bibliothèque, etc.).

Pour le reste, je vous laisse analyser le fichier **leia.js** pour mieux comprendre son fonctionnement. 

Si vous constatez le moindre bug, n'hésitez-pas à me le signaler :)

