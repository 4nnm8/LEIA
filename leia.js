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
	
////////// VARIABLES ///////////////////////////////////////////////////////////////////////////
  const dico = [
    ['[eè]([crt])','(èc)?(h)?e','$1e$3$7 $1è$3$6e$7','$1è$3$6e$7','$1e$3$7'],
	['(eu)(r)','ice','$1$3$4$6 $1$4$5$6','$1$3$4$6','$1$3$4$6'],
	['(eu)(r)','se','$1$3$4$6 $1$3$5$6','$1$3$5$6','$1$3$4$6'],
    ['ieux|ais|ous?|agnon|eaux?|(i|eu)[rnf]|e','esse|èche|outes?|rice|(?:[eo]|iei)lles?|[ai]gne|[oe]resse|(i|eu)[vs]e','$1$2$6 $1$4$6','$1$4$6','$1$2$6'],
    ['[eè][rt]e?|ieilles?|aîches?|agne|outes?|rice|[oe]lles?|[oe]resse|eu[sv]e|i(v|gn)e','agnon|ieux|[eè][rt]e?|os|ais|eau|[eo]u[rsf]?|i[nf]','$1$2$5 $1$4$5','$1$2$5','$1$4$5'],
    ['[aoe]ux','[ae]l{1,2}es|[eao]u[cs]{1,2}es?','$1$2 $1$3','$1$3','$1$2'],
    ['f|[ae]l{1,2}es|[eao]u[cs]{1,2}es?','ve|e?[oae]ux','$1$2 $1$3','$1$2','$1$3'],
    ['([aoe]u)x','[sc]{1,2}es?','$1$2 $1$3$4$5','$1$3$4$5','$1$2'],
    ['o?s','[stc]h?e','$1$2 $1$3$4','$1$3$4','$1$2'],
    ['[écfilruû]','(?:f|qu)?[eë]','$1$2$4','$1$2$3$4','$1$2$4'],
	['[cdegilnort]u?','(e?ss|[nlthu])?e','$1$2$5 $1$2$3$5','$1$2$3$5','$1$2$5'],
    ['s','e','$1$2 $1$2es','$1$2es','$1$2'],
  ], dl = dico.length,
  pron = [
    ['tier','ce[-·.•]s','tiers tierces','tierces','tiers'],
    ['(c)?(eux|elui)','elles?','$2$3 $2$4','$2$4','$2$3'],
    ['(c)?(elles?)','eux|elui','$2$3 $2$4','$2$3','$2$4'],
    ['(il|elle)s?','(il|elle)[-·.•]?(s)?','$2$5 $4$5','elle$5','il$5'],
	['grec','que[-·∙.•]?(s)?','grec$3','grecque$3','grec$3'],
    ['fra[iî]s?','(aî)?che[-·∙.•]?s?','frais fraîches','fraîches','frais'],
	['héro(ïne)?s?','os|o?ïne·?(s)?','héros héroïne$4','héroïne$4','héros'],
    ['cet?','t?te','$1 $1$2','$1$2','$1','$1 $2'],
    ['du|au|le','(de|à)? la','$1 $2','$2','$1'],
    ['(de|à)? la','du|au|le','$1 $3','$1','$2'],
    ['l[ea]','l?([ea])','$1 l$3','la','le']
  ], pl = pron.length;
  var rt = 1.2,
      ps = 0,
      altgr = false,
      leia,
      imode,
      voice,
      nb,
      nodeList = [],
      tree = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT,
	    { 
          acceptNode: function(node) { 
	        return NodeFilter.FILTER_ACCEPT; 
          } 
        },
	  false);

////////// FONCTIONS GÉNÉRALES /////////////////////////////////////////////////////////////////

/** Vérification de la disponibilité du stockage des variables  **/
  function storageAvailable(type) {
    try {
      var storage = window[type], x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return false;
    }
  }
/** Génère des écouteurs d'évènements **/

  function addEvent(obj,evt,fn) {
	  if (obj.addEventListener){
		obj.addEventListener(evt, fn, false);
		return true;
	  } else if (obj.attachEvent) {
		return obj.attachEvent('on' + evt, fn);
	  } else {
		console.log('Incompatibilité système. Certaines fonctions ne seront pas disponibles.')
	  }
  }
  
/** Chargement de scripts en différé **/

  function loadScript(url,callback){
    if(!url || !(typeof url === 'string')){
	  return
	}
    var script = document.createElement('script');
    if(typeof document.attachEvent === 'object'){
      script.onreadystatechange = function(){
        if (script.readyState === 'loaded'){
          if (callback){
		    callback(script)
		  }
        }
      }  
    } else {
      script.onload = function(){
        if (callback){
		  callback(script)
		}
      }
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script)
  }
  
////////// DÉBUT LÉIA //////////////////////////////////////////////////////////////////////////

  if (storageAvailable('localStorage')) {
    leia = localStorage.getItem("leia") || 1;
    imode = localStorage.getItem("imode") || 2;
    voice = localStorage.getItem("voice") || 0;
  }
  else {
    leia = 1;
	imode = 2;
	voice = 0;
  }
  if (leia == 1) { 
    skim(document.body);	
  }
  if (voice == 1) {
    loadScript('responsivevoice.js',function(){
	  console.log('La synthèse vocale est prête !')
    });
  }

/** Ajoute un bouton MENU sur toutes les pages **/
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '#leiaconf{position:fixed;top:5px;right:5px;border:0px;background-color:#eee;border-radius:5px;padding:5px;cursor:pointer;font-size:0.8em}.lgh{visibility:hidden}'; 
  document.getElementsByTagName('head')[0].appendChild(style);
  document.body.innerHTML += '<button id="leiaconf" tabindex="1">&#128065; Menu LÉIA</button>';
  addEvent(document,'click',function(e){
    if(e.target && e.target.id == 'leiaconf'){
      leiaconf()
    }
  });
  addEvent(document.getElementById('leiaconf'),'focus',function(){
    speak('Menu LÉIA')
  });  
  
/** Définit la popup **/
  function leiaconf() {
    let si = (document.documentElement.clientWidth || window.innerWidth)/2.5;
    window.open('config.html','','menubar=no, status=no, scrollbars=yes, menubar=no, width='+si+', height='+si);
  }
  
/** Fonction d'ajout d'un point médian à la zone de texte active **/ 
  function middot(text){
    var input = document.activeElement;
    text = text || '·';
    if (document.selection) {
      input.focus();
      var sel = document.selection.createRange();
      sel.text = text; 
    } 
	else if (input.selectionStart || input.selectionStart === 0) {
      var startPos = input.selectionStart;
      input.value = input.value.substring(0, startPos) + text + input.value.substring(input.selectionEnd, input.value.length);
      input.selectionStart = startPos + text.length;
      input.selectionEnd = startPos + text.length; 
	} 
	else {
      input.value += text;
    }
  } 
  
/** Fonction de convertion récursive des mots **/
  function skim(){
    while(tree.nextNode()){
	  if (tree.currentNode.nodeValue.trim().length > 0){
		nodeList.push(tree.currentNode);
		leiait(tree.currentNode);
	  }
	}
	nb = nodeList.length;
  }
  function leiait(a){
	for (var i=0 , j=0; i<dl; i++ , j = Math.min(j+1,pl-1)){
      let r1 = new RegExp('([a-zâäàçéèêëïîôöùûü]+)('+dico[i][0]+')[-/·∙.•]('+dico[i][1]+')[-/·∙.•]?(s)?','gi'),//^\f\n\r\t\v​\.\' -
          r2 = new RegExp('('+pron[j][0]+')[-/·∙.•]('+pron[j][1]+')','gi');
      a.nodeValue = a.nodeValue.replace(r1,dico[i][imode]); 
      a.nodeValue = a.nodeValue.replace(r2,pron[j][imode]);
      a.nodeValue = a.nodeValue.replace(/læ/gi,'lahé').replace(/\biel(s)?/gi,'yel$1') 
	} 
  }
/** Fonction de lecture à travers la page (en cours d'élaboration) **/
  
  function read(w) {
	  let ph = nodeList[ps].nodeValue
	  speak(ph)
	  if (w == 'u') {
		if (ps == 0) {  
		  ps = nb;
		} else {
		  ps--;
		}
	  }
	  if (w == 'd') {
		if (ps == nb) {
		  ps = 0;
		} else {
		  ps++;
		}
	  }
  }
  
  function EndCallback(){
	if (!nodeList[ps-1].nodeValue.match(/\./gim)){
	  read('d')
	}
  }
	 
/***************************************************************************/
  addEvent(document,'keyup',function(e){
    if ((e.which || e.keyCode || e.charCode) == 225){
      altgr=false;
    }
  });
   // On ajoute la prise en charge des raccourcis clavier (Alt + Shift + ...) vers les différentes fonctions
  addEvent(document,'keydown',function(e){
    let k = e.which || e.keyCode || e.charCode;
    if (e.altKey && e.shiftKey){
	    switch (k) {
          case 38: read('u'); break;  // [up arrow]
		  case 40: read('d'); break;  // [down arrow]	   
	      case 67: leiaconf(); break; // [C]
	      case 107: rt = Math.round((rt+0.2)*10)/10; speak('Débit augmentée à '+rt);break;
		  case 109: rt = Math.round((rt-0.2)*10)/10; speak('Débit diminuée à '+rt);break;
        }
        e.preventDefault();
      }
    });
  document.querySelectorAll('textarea,input[type=text],input[type=password],input[type=date],input[type=number]').forEach(function(elem){
    addEvent(elem,'keydown',function(e){
      let k = e.which || e.keyCode || e.charCode,
          kp = [59,190,186,110];
      if (k==225) {
        altgr=true;
      }
      if (altgr === true && (kp.includes(k))) {
        middot();
        e.preventDefault();
      }
	    if (((e.altKey && e.ctrlKey) || e.altLeft)&&(kp.includes(k))){
	      middot();
	      e.preventDefault();
	    }
    });
    if (voice) {
      addEvent(elem,'keypress',function(e){
        speak(String.fromCharCode(e.which || e.keyCode || e.charCode));
	      setTimeout(function(){
	        if (elem.value.match(/([-∙'".•,\s\]\)\/]$)/)){
              var y = (elem.value.match(/\b([a-zâäàçéèêëïîôöùûü·∙•.'-]+[-·∙"'•.,\s\]\)\/])$/gi));
              for (var i = 0; i < dl; i++) {
	              var x = new RegExp('([^\f\n\r\t\v​\. -]+)('+dico[i][0]+')[-·.•∙]('+dico[i][1]+')[-·.•∙]?(s)?','gi');
			          y = y.replace(x,dico[i][imode])
              } 
			  console.log(y)
		      speak(y);
	        }
	      },800);
        });
	  }
  });
  function speak(s){
    if ((typeof responsiveVoice != 'undefined') && (responsiveVoice.voiceSupport()) && (!!s)) {
      responsiveVoice.speak(s,'French Female',{rate:rt}) // onend: EndCallback
    } else {
	    console.log('ResponsiveVoice n\'est pas activé.')
	  }
  }

  
})(); /** FIN DU SCRIPT */

