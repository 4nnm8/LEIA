/** LÉIA - Copyright 2018 Ann Mezurat
LÉIA est un donationware sous licence Apache Version 2.0. 
Vous êtes libre de modifier et de distribuer ce code sous 
toute forme (libre, propriétaire, gratuite ou commerciale)
à condition de conserver le copyright et le texte de 
licence lors de toute modification ou distribution.
http://www.apache.org/licenses/LICENSE-2.0

LÉIA a demandé des mois de recherche en linguistique et
en programmation alors n'hésitez pas à faire un don :) 
DONS : https://www.okpal.com/leia
**/

"use strict"; 
(function(){
	
const dico = [
  ['[eè]([crt])','(èc)?(h)?e','$1e$3$7 $1è$3$6e$7','$1è$3$6e$7','$1e$3$7'],
  ['([dt])eu?r','[dt]?r?ice','$1$2$5 $1$3rice$5','$1$3rice$5','$1$2$5'], 
  ['([dt])rice','[dt]?eu?r','$1$2$5 $1$3eur$5','$1$2$5','$1$3eur$5'],
  ['eu?r','e?u?se','$1$2$4 $1euse$4','$1euse$4','$1eur$4'],
  ['boy|ieux|eaux?|ous?|agnon|a?in|([iï]|eu)[rf]|e','girl|esse|èche|outes?|(?:[eo]|iei)lles?|[ai]g?ne|[oe]resse|([ïi]|eu)[vs]e|se','$1$2$6 $1$4$6','$1$4$6','$1$2$6'],
  ['girl|(?:ieill|aîch|out|[oe]ll)es?|[eèi][nrt]e?|[oe]resse|[aiïe]u?[vsg]n?e','boy|agnon|[it]?eu[xr]|[eè][rt]e?|os|ai[sn]|eaux?|[eo]u[rsf]?|[iï][nf]','$1$2$4 $1$3$4','$1$2$4','$1$3$4'],
  ['f|[aoe]ux','ve|[ae]l{1,2}es|[eao]u[cs]{1,2}es?','$1$2$4 $1$3$4','$1$3$4','$1$2$4'],
  ['[ae]l{1,2}es|[eao]u[cs]{1,2}es?','e?[oae]ux','$1$2 $1$3','$1$2','$1$3'],
  ['([aoe]u)x','[sc]{1,2}es?','$1$2 $1$3$4$5','$1$3$4$5','$1$2'],
  ['s','e','$1$2 $1se$4','$1se$4','$1$2'],
  ['s','(s)?([tc])?e','$1$2 $1$4$4$5e$6','$1$4$4$5e$6','$1$2'],
  ['[céfilruû]','(?:f|qu)?[eë]','$1$2$4','$1$2$3$4','$1$2$4'],
  ['[cdegilnort]u?','(ss|[nthsu])?e|[lc]e(?=[-/·∙.•])','$1$2$5 $1$2$3$5','$1$2$3$5','$1$2$5'] 
], pron = [
  ['fra[iî]s?','(aî)?che[-/·∙.•]?s?','frais fraîches','fraîches','frais'],
  ['héro(ïne)?s?','os|o?ïne[-/·∙.•]?(s)?','héros héroïne$4','héroïne$4','héros'],
  ['(c)?(eux|elui)','elles?','$2$3 $2$4','$2$4','$2$3'],
  ['(c)?(elles?)','eux|elui','$2$3 $2$4','$2$3','$2$4'],
  ['(il|elle)s?','(il|elle)[-/·.•]?(s)?','$2$5 $4$5','elle$5','il$5'],
  ['cet?','t?te','$1 $1$2','$1$2','$1','$1 $2'],
  ['du|au|le','(de|à)? la','$1 $2','$2','$1'],
  ['(de|à)? la','du|au|le','$1 $3','$1','$2'],
  ['l[ea]','l?([ea])','$1 l$3','la','le']
];
var dl = dico.length, 
    pl = pron.length,
    altgr = false,
    leia,imode,ndLst=[],
    tree = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT,{ 
      acceptNode: function(node) { 
        return NodeFilter.FILTER_ACCEPT; 
      } 
    }, false);

function addEvent(obj,evt,fn){
  if (obj.addEventListener){
	obj.addEventListener(evt,fn,false);
	return true;
  } else if (obj.attachEvent){
    return obj.attachEvent('on'+evt,fn);
  } else {
    evt = 'on'+evt;
    if(typeof obj[evt] === 'function'){
      fn = (function(f1,f2){
	    return function(){
          f1.apply(this,arguments);
          f2.apply(this,arguments);
        }
	  })(obj[evt],fn);
	}
	obj[evt] = fn;
	return true;
  }
  return false;
}

/* Vérif orthographique en direct A SUPPRIMER A TERME */
//document.body.contentEditable='true';
//document.designMode='on';


/** Disponibilité, récupération et définition des variables  **/
try{
  leia = localStorage.getItem("leia") || 1;
  imode = Number(localStorage.getItem("imode"))+2 || 2;
}
catch(e){
  leia = 1;
  imode = 2;
}

/** Fonction de convertion récursive des mots **/
if (leia == 1){ 
  console.time('SKIM');
  while(tree.nextNode()){
    if (tree.currentNode.nodeValue.trim().length > 0){
	  ndLst.push(tree.currentNode);
	  for (var i=0 , j=0; i<dl; i++ , j = Math.min(j+1,pl-1)){ 
        let r1 = new RegExp('([a-zàâäéèêëïîôöùûüçæœñ]+?)[-\/·∙.•]?('+dico[i][0]+')[-\/·∙.•]('+dico[i][1]+')[-\/·∙.•]?(s)?(?![a-z])','gi'),
            r2 = new RegExp('('+pron[j][0]+')[-\/·∙.•]('+pron[j][1]+')','gi');
        tree.currentNode.nodeValue = tree.currentNode.nodeValue
		//.replace(/([a-zñ]+?)[@x](s?)(?![-\/·∙.•])/gi,'$1o$2 $1a$2')
		.replace(r1,dico[i][imode])
		.replace(r2,pron[j][imode])
		.replace(/læ/gi,'lahé')
		.replace(/\biel(s)?/gi,'yel$1'); 
      }
	}
  }
  console.timeEnd('SKIM');
}

/** Définit le MENU et sa POPUP **/
function leiaconf() {
  let si = (document.documentElement.clientWidth || window.innerWidth)/2.5,
      sr = window.innerWidth - 495;
  
  window.open('config.html','','dialog=yes, menubar=no, status=no, scrollbars=no, menubar=no, top=75, left='+sr+', toolbar=no, directories=0, personalbar=0, location=no, width=470,height=470');
}
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#leiaconf{position:fixed;top:5px;right:5px;border:0px;background-color:#eee;border-radius:5px;padding:5px;cursor:pointer;font-size:0.8em}.lgh{visibility:hidden}'; 
document.getElementsByTagName('head')[0].appendChild(style);
document.body.innerHTML += '<button id="leiaconf" tabindex="1">&#128065; Menu LÉIA</button>';
addEvent(document,'click',function(e){
  if(e.target && e.target.id == 'leiaconf'){
    leiaconf();
  }
});/*
addEvent(document,'keydown',function(e){
  let k = e.which || e.keyCode || e.charCode;
  if (e.altKey && e.shiftKey && k == 67){
    leiaconf();
	e.preventDefault();
  }
});*/

document.querySelectorAll('textarea,input[type=text],[contenteditable=true]').forEach(function(elem){
  addEvent(elem,'keyup',function(e){
	elem.value = elem.value.replace(';;','·')
  });
});

})(); /** FIN DU SCRIPT */

/*
addEvent(document,'keyup',function(e){
  if ((e.which || e.keyCode || e.charCode) == 225){
    altgr=false;
  }
});*/
/*
  let k = e.which || e.keyCode || e.charCode,
        kp = [59,190,186,110];
    if (k==225) {
      altgr=true;
    }
    if ((altgr === true && kp.includes(k)) || ((e.altLeft || e.altKey && e.ctrlKey) && kp.includes(k))) {
      middot();
      e.preventDefault();
    }
	*/
