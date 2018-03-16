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
  ['(eu)(r)','ice','$1$3$4$6 $1$4$5$6','$1$3$4$6','$1$3$4$6'],
  ['(eu)(r)','se','$1$3$4$6 $1$3$5$6','$1$3$5$6','$1$3$4$6'],
  ['ieux|ais|ous?|agnon|eaux?|([iï]|eu)[rnf]|e','esse|èche|outes?|rice|(?:[eo]|iei)lles?|[ai]gne|[oe]resse|([ïi]|eu)[vs]e','$1$2$6 $1$4$6','$1$4$6','$1$2$6'],
  ['[eè][rt]e?|ieilles?|aîches?|agne|outes?|rice|[oe]lles?|[oe]resse|eu[sv]e|[iï](v|gn)e','agnon|i?eux|[eè][rt]e?|os|ais|eaux?|[eo]u[rsf]?|[iï][nf]','$1$2$5 $1$4$5','$1$2$5','$1$4$5'],
  ['f|[aoe]ux','ve|[ae]l{1,2}es|[eao]u[cs]{1,2}es?','$1$2$4 $1$3$4','$1$3$4','$1$2$4'],
  ['[ae]l{1,2}es|[eao]u[cs]{1,2}es?','e?[oae]ux','$1$2 $1$3','$1$2','$1$3'],
  ['([aoe]u)x','[sc]{1,2}es?','$1$2 $1$3$4$5','$1$3$4$5','$1$2'],
  ['o?s','[stc]h?e','$1$2 $1$3$4','$1$3$4','$1$2'],
  ['c','que','$1$2$4','$1$3$4','$1$2$4'],
  ['[éfilruû]','(?:f)?[eë]','$1$2$4','$1$2$3$4','$1$2$4'],
  ['[cdegilnort]u?(?:(?!-))','(e?ss|[nlthu])?e','$1$2$5 $1$2$3$5','$1$2$3$5','$1$2$5'],
  ['s','e','$1$2 $1$2es','$1$2es','$1$2']
], pron = [
  ['(c)?(eux|elui)','elles?','$2$3 $2$4','$2$4','$2$3'],
  ['(c)?(elles?)','eux|elui','$2$3 $2$4','$2$3','$2$4'],
  ['grec','que[-/·∙.•]?(s)?','grec$3','grecque$3','grec$3'],
  ['fra[iî]s?','(aî)?che[-/·∙.•]?s?','frais fraîches','fraîches','frais'],
  ['héro(ïne)?s?','os|o?ïne·?(s)?','héros héroïne$4','héroïne$4','héros'],
  ['tier|diver','([sc])e[-/·.•]s','$1s $1$3es','$1$3es','$1s'],
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
        let r1 = new RegExp('([a-zàâäéèêëïîôöùûüçæœ]+)('+dico[i][0]+')[-\/·∙.•]('+dico[i][1]+')[-\/·∙.•]?(s)?(?![a-z])','gi'),
            r2 = new RegExp('('+pron[j][0]+')[-\/·∙.•]('+pron[j][1]+')','gi');
        tree.currentNode.nodeValue = tree.currentNode.nodeValue.replace(r1,dico[i][imode]).replace(r2,pron[j][imode]).replace(/læ/gi,'lahé').replace(/\biel(s)?/gi,'yel$1'); 
      }
	}
  }
  console.timeEnd('SKIM');
}

/** Définit le MENU et sa POPUP **/
function leiaconf() {
  let si = (document.documentElement.clientWidth || window.innerWidth)/2.5;
  window.open('config.html','','menubar=no, status=no, scrollbars=yes, menubar=no, width='+si+',height='+si);
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
});
addEvent(document,'keydown',function(e){
  let k = e.which || e.keyCode || e.charCode;
  if (e.altKey && e.shiftKey && k == 67){
    leiaconf();e.preventDefault();
  }
});

/** Fonction d'ajout d'un point médian à la zone de texte active **/ 
function middot(text){
  var input = document.activeElement;
  text = text || '·';
  if (document.selection){
    input.focus();
    var sel = document.selection.createRange();
    sel.text = text; 
  } else if (input.selectionStart || input.selectionStart === 0){
    var startPos = input.selectionStart;
    input.value = input.value.substring(0, startPos) + text + input.value.substring(input.selectionEnd, input.value.length);
    input.selectionStart = startPos + text.length;
    input.selectionEnd = startPos + text.length;
  }	else {
    input.value += text;
  }
} 
addEvent(document,'keyup',function(e){
  if ((e.which || e.keyCode || e.charCode) == 225){
    altgr=false;
  }
});
document.querySelectorAll('textarea,input[type=text],input[type=password],input[type=date],input[type=number]').forEach(function(elem){
  addEvent(elem,'keydown',function(e){
    let k = e.which || e.keyCode || e.charCode,
        kp = [59,190,186,110];
    if (k==225) {
      altgr=true;
    }
    if ((altgr === true && kp.includes(k)) || ((e.altLeft || e.altKey && e.ctrlKey) && kp.includes(k))) {
      middot();
      e.preventDefault();
    }
  });
});



})(); /** FIN DU SCRIPT */

