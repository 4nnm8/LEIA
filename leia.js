/** LÉIA - Copyright 2018-2019 Ann Mezurat
LÉIA est un donationware sous licence Apache Version 2.0. 
Vous êtes libre de modifier et de distribuer ce code sous 
toute forme (libre, propriétaire, gratuite ou commerciale)
à condition de conserver le copyright et le texte de 
licence lors de toute modification ou distribution.
http://www.apache.org/licenses/LICENSE-2.0

Faites un don : https://bit.ly/2vuzK7g
**/

"use strict";


/********** RACCOURCIS FONCTIONS *********************************************/

function addEvent(obj, evt, fn) { 
  if (obj.addEventListener) {
    obj.addEventListener(evt, fn, false);
    return true;
  } else if (obj.attachEvent) {
    return obj.attachEvent("on" + evt, fn);
  } else {
    evt = "on" + evt;
    if (typeof obj[evt] === "function") {
      fn = (function(f1, f2) {
        return function() {
          f1.apply(this, arguments);
          f2.apply(this, arguments);
        }
      })(obj[evt], fn);
    }
    obj[evt] = fn;
    return true;
  }
  return false;
}

function getStyle(a) {  
  var b = a.currentStyle || getComputedStyle(a, null);
  return b;
}

/********** APPELLER LA FEUILLE DE STYLE LEIA ********************************/

var head  = document.getElementsByTagName("head")[0];
var link  = document.createElement("link");
link.id   = "leia";
link.rel  = "stylesheet";
link.type = "text/css";
link.href = "leia.css";
link.media = "all";
head.appendChild(link);
  
/********** VARIABLES ********************************************************/

const dico = [
  ["[eè]([crt])", "(èc)?(h)?e", "$1e$3$7 $1è$3$6e$7", "$1è$3$6e$7", "$1e$3$7"],
  ["(eu)(r)", "([dt]r)?ice", "$1eur$7 $1rice$7", "$1rice$7", "$1eur$7"],
  ["(eu)(r)", "se", "$1$3$4$6 $1$3$5$6", "$1$3$5$6", "$1$3$4$6"],
  ["ieux|ai[sn]|ous?|agnon|eaux?|([iï]|eu)[rnf]|e", "esse|èche|outes?|rice|(?:[eo]|iei)lles?|[ai]gne|[oe]resse|([ïi]|eu)[vs]e", "$1$2$6 $1$4$6", "$1$4$6", "$1$2$6"],
  ["[eè][rt]e?|ieilles?|aîches?|outes?|rice|[oe]lles?|[oe]resse|eu[sv]e|[aiï](v|gn)e", "agnon|i?eux|[eè][rt]e?|os|ai[sn]|eaux?|[eo]u[rsf]?|[iï][nf]", "$1$2$5 $1$4$5", "$1$2$5", "$1$4$5"],
  ["f|[aoe]ux", "ve|[ae]l{1,2}es|[eao]u[cs]{1,2}es?", "$1$2$4 $1$3$4", "$1$3$4", "$1$2$4"],
  ["[ae]l{1,2}es|[eao]u[cs]{1,2}es?", "e?[oae]ux", "$1$2 $1$3", "$1$2", "$1$3"],
  ["([aoe]u)x", "[sc]{1,2}es?", "$1$2 $1$3$4$5", "$1$3$4$5", "$1$2"],
  ["s", "e", "$1$2 $1se$4", "$1se$4", "$1$2"],
  ["s", "(s)?([tc])?e", "$1$2 $1$4$4$5e$6", "$1$4$4$5e$6", "$1$2"],
  ["c", "que", "$1$2$4", "$1$3$4", "$1$2$4"],
  ["[éfilruû]", "(?:f)?[eë]", "$1$2$4", "$1$2$3$4", "$1$2$4"],
  ["[cdegilnort]u?", "(e?ss|[nlthu])?e", "$1$2$5 $1$2$3$5", "$1$2$3$5", "$1$2$5"]
],
pron = [
  ["(c)?(eux|elui)", "elles?", "$2$3 $2$4", "$2$4", "$2$3"],
  ["(c)?(elles?)", "eux|elui", "$2$3 $2$4", "$2$3", "$2$4"],
  ["grec", "que[-/·∙.•]?(s)?", "grec$3", "grecque$3", "grec$3"],
  ["fra[iî]s?", "(aî)?che[-/·∙.•]?s?", "frais fraîches", "fraîches", "frais"],
  ["héro(ïne)?s?", "os|o?ïne·?(s)?", "héros héroïne$4", "héroïne$4", "héros"],
  ["tier|diver", "([sc])e[-/·.•]s", "$1s $1$3es", "$1$3es", "$1s"],
  ["(il|elle)s?", "(il|elle)[-/·.•]?(s)?", "$2$5 $4$5", "elle$5", "il$5"],
  ["cet?", "t?te", "$1 $1$2", "$1$2", "$1", "$1 $2"],
  ["du|au|le", "(de|à)? la", "$1 $2", "$2", "$1"],
  ["(de|à)? la", "du|au|le", "$1 $3", "$1", "$2"],
  ["l[ea]", "l?([ea])", "$1 l$3", "la", "le"]
],
t9 = [
  // 1 mot
  ["sauf","auve","ve"],	
  ["vieux","ieille"],
  ["copain","ine"],
  ["bref","ève"],
  ["compagnon","agne","ne"],
  ["tiers","ce"],
  ["doux","ouce","ce"],
  ["roux","ousse","sse"],
  ["faux","ausse"],
  ["hébreu","aïque"],
  ["frais","che","aîche"],
  ["sec","èche"],
  ["ambassadeur", "drice", "rice", "ice"],
  ["docteur","e","oresse"],
  ["héros","oïne"],
  ["aïeux","ieule"],
  ["canut","use"],
  // 2 mots
  ["(ob)?long","ue"],
  ["butor|esquimau","de"],
  ["bénin|malin","igne"],
  ["filou|loulou","te"],
  ["époux|jaloux","ouse","se"],
  ["[f|m]ou|foufou","olle"],
  ["blanc|franc", "he"],
  ["dissous|absous","oute","te"],
  ["[vn]euf","euve","ve"],
  // 7 mots
  ["(ai|ambi|bé|conti|exi|surai|subai)gu","ë"], // GU·Ë
  ["(cadu|laï|publi|micma|syndi|tur|gre)c","que"], // C·QUE
  ["las|^bas|gros|gras|épais|andalou|exprès","se"], // S·SE
  
  // + de 7 mots
  ["((in)?compl|concr|désu|(in)?discr|inqui|préf|repl|secr|qui|rondel)et","ète"], // ÈTE (12 mots)
  ["lascif|nocif|maladif|tardif|naïf|juif|vif|réflexif|([a-zàâäéèêëïîôöùûüç]+[st]if)","ive","ve"], // IF·IVE (8 exceptions + règle générale -tif ou -sif)
  ["[a-zàâäéèêëïîôöùûüç]+eux","euse"],  // EUX > EUSE règle générale. Exception précedemment gérée : vieux > vieille.
  
  // 26 mots pouvant se terminer notamment ou exclusivement par -ERESSE au féminin
  ["(pêch|acquér|chass|b[âa]ill|charm|emmerd|impost|pip|pren|sing|taill|vend|demand|veng)eur","euse","eresse","se"],
  ["(vainq|assess|gouvern|prédécess)eur","e","euse","eresse","se"],
  ["devin|quaker|(paqu|codemand|enchant|p[éè]ch)eur","eresse"],
  ["défendeur","eresse","seuse"],

  // PAS OK (incomplet ou trop général) >>>
  
  ["[a-zàâäéèêëïîôöùûüç]+[^t]eur","euse"], // Imparfait. -EUR non précédé d'un T donne généralement EUSE au féminin, mais rares exceptions.
  ["[a-zàâäéèêëïîôöùûüç]+teur","trice","teuse","rice","euse","ice"], // Imparfait. -TEUR donne généralement -TRICE au féminin mais aussi régulièrement -TEUSE. Parfois les deux.
  // ER > ÈRE + Règle générale IER > IÈRE. Imparfait : prend trop de mots en compte, (ex: argousier·ère = incorrect) >
  ["([a-zàâäéèêëïîôöùûüç]+ier)|(am|arch|berg|bocag|bouch|boulang|cach|caloy|ch|coch|conseill|écaill|écuy|étrang|fromag|gauch|horlog|khm|lég|lignag|ling|magist|maraîch|mast|ménag|mensong|métay|passag|paysag|péag|porch|potag|sup|usag|vach)er","ère"],
  ["chat|rat|favori|rigolo|coi|favori|((maigri|pâl|bosc|jeun|vieill|s)ot)","te"], // +TE
  ["(damois|cham|jum|puc|tourang|tourter|jouvenc|maquer|ois|nouv|gém|pastour|agn|b)eaux?","elle"], // EAU > ELLE (singulier et pluriel)
  ["(fin|pasc|front|département)aux","ales"], // AUX/EAUX > ALES (pluriels)
  ["([bc]|aigl|sax|bar|berrich|bis|b|bouff|bourguign|bûcher|bret|brouill|b[uû]cher|buffl|champi|coch|couill|cret|dar|drag|espi|fanfar|fél|folich|forger|frip|maç|lett|garç|gasc|glout|grogn|hériss|hur|laider|lap|lett|li|tatill|teut|champi|vigner|wall|lur|maç|maigrich|nipp|ours|pâlich|phara|piét|pige|pi|pochetr|pochtr|poliss|poltr|rejet|ronch|sauvage|sax|beaucer|bess|bich|boug|brabanç|charr|enfanç|fransquill|godich|hesbign|marmit|nazill|négrill|noblaill|patr|percher|pa|levr|louch|maquign|marr|mat|slav|so[uû]l|mign|mist|mollass|tâcher|tardill)on","ne"], // ON·NE
  ["abbé|âne|bêta|prêtre|bonze|bougre|centaure|chanoine|comte|maître|contremaître|diable|drôle|druide|faune|gonze|hôte|ivrogne|maire|maître|monstre|mulâtre|nègre|notaire|ogre|patronne|pauvre|poète|preste|prêtre|prince|prophète|sauvage|suisse|tigre|traître","sse","esse"], // +SSE
];
  
var dl = dico.length,
    pl = pron.length,
    pt = t9.length,
    leia = localStorage.getItem("leia") || 1,
    mode = Number(localStorage.getItem("mode")) + 2 ||  2,
    pred =  localStorage.getItem("pred") || 1,
    high = localStorage.getItem("high") || 0,
    font = localStorage.getItem("font") || 0,
    kolo = localStorage.getItem("kolo") ||  0,
    fontType = localStorage.getItem("fontType") || 0,
    fontRatio = localStorage.getItem("fontRatio") ||  30,
    koloRatio = localStorage.getItem("koloRatio") ||  100,
    bgColor = localStorage.getItem("bgColor") || "#ccc",
    txtColor = localStorage.getItem("txtColor") || "#000",
    fontWeight = localStorage.getItem("fontWeight") || "bold",
    txtDeco = localStorage.getItem("txtDeco") || "none",
    term, terml, termp = 1,
    ndLst = [],
    tree = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (node.parentNode.nodeName !== "SCRIPT") {
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    }, false),
    r3 = new RegExp("([·∙•][a-zàâäéèêëïîôöùûüçæœñ]+([·∙•][a-zàâäéèêëïîôöùûüçæœñ]+)?)", "gi"),
	bouton = document.createElement("input");

/********** POPUP CONFIGURATION **********************************************/

bouton.type = "button",
bouton.value = "Menu LÉIA",
bouton.className = "config";
bouton.tabIndex = "1";
bouton.onclick = function(){ popup() };
document.body.appendChild(bouton);

function popup(){
  let si = (document.documentElement.clientWidth || window.innerWidth) / 2.5,
    sr = window.innerWidth - 495;
  window.open("config.html", "_blank", "dialog=yes, titlebar=no, status=no, scrollbars=yes, menubar=no, top=75, left=" + sr + ", toolbar=no, directories=0, personalbar=0, location=no, width="+si+",height=470");
}

addEvent(document, "keydown", function(e) {
  let k = e.which || e.keyCode || e.charCode;
  if (e.altKey && e.shiftKey && k == 67) {
    popup();
    e.preventDefault();
  }
});
  
/********** MISE EN EVIDENCE ECRITURE INCLUSIVE ******************************/

function highlight(node) {
  if(/^(?:MARK|SCRIPT|STYLE|FORM)$/.test(node.nodeName)) return;

  if(node.hasChildNodes()) {
    for(var i = 0 ; i < node.childNodes.length ; i++) {
    highlight(node.childNodes[i]);
    }
  }
  if(node.nodeType == 3) { 
    var r = r3.exec(node.nodeValue);
    if(r) {
    var nmark = document.createElement("MARK"),
        after = node.splitText(r.index);
    nmark.appendChild(document.createTextNode(r[0]));
    nmark.style.backgroundColor = bgColor;
    nmark.style.color = txtColor;
    nmark.style.textDecoration = txtDeco;
    nmark.style.fontWeight = fontWeight;
    after.nodeValue = after.nodeValue.substring(r[0].length);
    node.parentNode.insertBefore(nmark, after);
    }
  }
} 
if (high == 1) highlight(document.body);
  
/********** CONTRASTES & POLICE **********************************************/

function kontrast(z) {
  var bg = window.getComputedStyle(z).backgroundColor;
  while (bg == ("rgba(0, 0, 0, 0)" || "transparent")) {
    z = z.parentElement;
    bg = window.getComputedStyle(z).backgroundColor;
  }
  var nb = bg.replace(/rgb\((.*)\)/, "$1").split(","),
    br = ((nb[0] * 299) + (nb[1] * 587) + (nb[2] * 114)) / 1000;
  return (br >= 128) ? "#000" : "#fff";
}

function whichfont(f) {
  switch (Number(f)) {
    case 1: return "Andika New Basic"; break;
    case 2: return "Open Dyslexic"; break;  
    case 3: return "Lexie Readable"; break;
    case 4: return "Sassoon Sans Std"; break;
    case 5: return "Sassoon Sans Slope Std"; break;
    case 6: return "Sassoon Infant Std"; break;
    case 7: return "Sassoon Primary Std"; break;
  }  
}

function fontSiz(u,v) {
  let aFontSize = parseFloat(v.fontSize),
  aNewSize = (aFontSize < 16) ? 16 : aFontSize;    
  u.style.fontSize = Math.round(aNewSize/16) + "em";
  u.style.lineHeight = aFontSize*1.5+"px";    
  if (v.textAlign == "justify") u.style.textAlign = "left";
  
  /*if (v.display != "inline" && (parseFloat((getStyle(u.parentNode)).height) < u.parentNode.scrollHeight)) {
    u.parentNode.className += " zoomable"
  }*/
}

if (font == 1) {
  document.body.className += "bodyadj"
  document.documentElement.className += "bodyadj"
}
  
/********** CONVERSION ÉCRITURE INCLUSIVE ************************************/

//console.time("SKIM");
while (tree.nextNode()) {
  if (tree.currentNode.nodeValue.trim().length > 0) {
    ndLst.push(tree.currentNode);
    var pnode = tree.currentNode.parentNode;
            
    if (kolo == 1) { pnode.style.color = kontrast(pnode) }
    if (font == 1)  { fontSiz(pnode,getStyle(pnode)) }
    if (fontType != 0)  { pnode.style.fontFamily = whichfont(fontType) }
    if (leia == 1) {
      for (var i = 0, j = 0; i < dl; i++, j = Math.min(j + 1, pl - 1)) {
        var r1 = new RegExp("([a-zàâäéèêëïîôöùûüçæœ]+)("+dico[i][0]+")[-/·∙.•]("+dico[i][1]+")[-/·∙.•]?(s)?(?![a-z])","gi"),
            r2 = new RegExp("(" + pron[j][0] + ")[-\/·∙.•](" + pron[j][1] + ")", "gi");
        tree.currentNode.nodeValue = tree.currentNode.nodeValue.replace(r1,dico[i][mode]).replace(r2,pron[j][mode]);
        // .replace(/læ/gi,"lahé").replace(/\biel(s)?/gi,"yel$1");
      }
    }
  }
}
//console.timeEnd("SKIM");

/********** DICO PRÉDICTIF & POINT MÉDIAN  ***********************************/

function getCaret(x) {
  if (document.selection) {
    x.focus();
    var r = document.selection.createRange(),
      rs = r.text.length;
    r.moveStart("character", -x.value.length);
    var start = r.text.length - rs;
    return [start, start + rs];
  } else if (x.selectionStart || x.selectionStart == "0") {
    return [x.selectionStart, x.selectionEnd];
  } else {
    return [0, 0]
  }
}

function selekt(elem, start, end) {
  if (elem.setSelectionRange) {
    elem.focus();
    elem.setSelectionRange(start, end);
  } else if (elem.createTextRange) {
    var range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd("character", end);
    range.moveStart("character", start);
    range.select();
  }
}

function getWord(text, caretPos) {
  var iOf = text.value.indexOf(caretPos),
    txt = text.value.substring(0, caretPos);
  if (txt.indexOf(" ") > 0) {
    var wrd = txt.split(" ");
    return wrd[wrd.length - 1];
  } else {
    return txt;
  }
}

function seek(x) {
  for (var i = 0; i < pt; i++) {
    let reg = new RegExp("^" + t9[i][0] + "s?$", "i"),
      mch = x.search(reg)
    if (mch != -1) {
      return t9[i]
    }
  }
}
  
function change(n, m, b) {
  if (n == 1) {
    if (termp == terml - 1) {
      termp = 1
    } else {
      termp++
    }
  }
  if (n == -1) {
    if (termp == 1) {
      termp = term.length - 1
    } else {
      termp--
    }
  }
  m.value = m.value.slice(0, b[0]) + "·" + term[termp] + m.value.slice(b[1])
  selekt(m, b[0], b[0] + term[termp].length + 1);
}

document.body.querySelectorAll("textarea,input[type=text],[contenteditable=true]").forEach(function(elem) {
  addEvent(elem,"keyup",function(e) {
    if (this.value.indexOf(";;") > -1) {
      var now = getCaret(this);
      this.value = this.value.replace(";;", "·");
      selekt(this, now[0] - 1, now[0] - 1);
    }
  })
  
  if (pred == 1) {
    addEvent(elem, "keyup", function(e) {
      let b = getCaret(this),
          c = getWord(this, b[1]),
          d = seek(c) || false;
      if (seek(c) && c.indexOf("·") == -1) {
        this.value = this.value.slice(0, b[0]) + "·" + d[termp] + this.value.slice(b[0])
        selekt(this, b[0], b[0] + d[termp].length + 1);
        term = seek(c);
        terml = term.length;
      }
    });
    addEvent(elem, "keydown", function(e) {
      let a = e.which || e.keyCode || e.charCode,
          b = getCaret(this);
      if (term && b[0] != b[1]) {
        switch (a) {
        // Suppr
        case 8:
		  e.preventDefault();
          this.value = this.value.slice(0, b[0] - 1) + this.value.slice(b[1]);
          selekt(this, b[0] - 1, b[0] - 1);
		  break;
        // Left arrow
        case 37:
		  e.preventDefault();
          this.value = this.value.slice(0, b[0]) + this.value.slice(b[1]);
          selekt(this, b[0] - 1, b[0] - 1);
		  break;
        // Enter
        case 13:
		  e.preventDefault();
          selekt(this, b[1], b[1]);
		  break;
        // Down arrow
        case 40:
		  e.preventDefault();
          change(1, this, b);
		  break; 
        // Up arrow
        case 38:
		  e.preventDefault();
          change(-1, this, b);
		  break;
        default: term = terml = termp = 1;
        }
      }
    });
  }
});
