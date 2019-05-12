/** LÉIA - Copyright 2018-2019 Ann Mezurat
LÉIA est un donationware sous licence Apache Version 2.0. 
Vous êtes libre de modifier et de distribuer ce code sous 
toute forme (libre, propriétaire, gratuite ou commerciale)
à condition de conserver le copyright et le texte de 
licence lors de toute modification ou distribution.
http://www.apache.org/licenses/LICENSE-2.0

Faites un don :) https://bit.ly/2vuzK7g
**/
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
		};
	  })(obj[evt], fn);
	}
	obj[evt] = fn;
	return true;
  }
  return false;
}
const dico = [
//PRE MASC			 PRE FEM			EXT MASC		EXT FEM				PROP 1			PROP 2			PROP 3			PROP 4
  ["sauf"			,"(au)?ve"			,"sauf$5"		,"sauve$5"			,"auve"			,"ve"],
  ["([vn])euf"		,"(eu)?ve"			,"$2$6"			,"$3euve$6"			,"euve"			,"ve"],
  ["serf"			,"(er)?ve"			,"serf$5"		,"serve$5"			,"erve"			,"ve"],
  ["roux"			,"(ou)?sse"			,"roux"			,"rousse$5"			,"ousse"		,"sse"],
  ["faux"			,"(au)?sse"			,"faux"			,"fausse$5"			,"ausse"		,"sse"],
  ["vieux"			,"i?eille"			,"vieux"		,"vieille$4"		,"ieille"],
  ["copain"			,"ine"				,"copain$4"		,"copine$4"			,"ine"],
  ["br[èe]f"		,"è?ve"				,"bref$4"		,"brève$4"			,"ève"],
  ["compagnon"		,"agne"				,"compagnon$4"	,"compagne$4"		,"agne"			,"ne"],
  ["tiers?"			,"ce"				,"tiers"		,"tierce$4"			,"ce"],
  ["doux"			,"(?:ou)?ce"		,"doux"			,"douce$4"			,"ouce",		"ce"],
  ["hébreux?"		,"aïque"			,"hébreux"		,"hébraïque$4"		,"aïque"],
  ["fra[iî]s?"		,"(aî)?che"			,"frais"		,"fraîche$5"		,"che"			,"aîche"],
  ["s[èe]c"			,"è?c?he"			,"sec$4"		,"sèche$4"			,"èche"			,"he"],
  ["ambassadeur"	,"d?r?ice"			,"ambassadeur$4","ambassadrice$4"	,"drice"		,"rice"			,"ice"],
  ["docteur"		,"oresse"			,"docteur$4"	,"doctoresse$4"		,"e"			,"oresse"],
  ["héros?"			,"o?ïne"			,"héros"		,"héroïne$4"		,"oïne"],
  ["aïeux"			,"(?:ieu)?le"		,"aïeux"		,"aïeule$4"			,"ïeule"],
  ["canut"			,"u?se"				,"canut$4"		,"canuse$4"			,"use"],
  ["bêta"			,"a?sse"			,"bêta$4"		,"bêtasse$4"		,"sse"			,"asse"],
  ["clown"			,"esse"				,"clown$4"		,"clownesse$4"		,"e",			"esse"],
  ["(bén|mal)in"	,"igne"				,"$3in$5"		,"$3igne$5"			,"igne"],
  ["(diss|abs)ous?"	,"(ou)?te"			,"$3ous"		,"$3oute$6"			,"oute"			,"te"],
  ["(ép|jal)oux"	,"(ou)?se"			,"$3oux"		,"$3ouse$6"			,"ouse"			,"se"],
  ["blanc|franc"	,"he"				,"$2$4"			,"$2he$4"			,"he"],
  ["prophète"		,"e?sse"			,"prophète$4"	,"prophétesse$4"	,"sse"			,"esse"],
  ["long"			,"ue"				,"$1long$4"		,"$1longue$4"		,"ue"],
  ["butor|esquimau"	,"de"				,"$2$4"			,"$2de$4"			,"de"],
  ["esquimaux"		,"des?"				,"esquimaux"	,"esquimaudes"		,"des"],
  ["andalou"		,"se"				,"$2$4"			,"$2se$4"			,"se"],
  ["foufou"			,"olle"				,"foufou$4"		,"fofolle$4"		,"olle"],
  ["([mf])ou"		,"olle"				,"$3ou$5"		,"$3olle$5"			,"olle"],
  ["acquéreur"		,"esse|euse"		,"acquéreur$4"	,"acquér$3$4"		,"esse"],
  ["devin"			,"eresse"			,"devin$4"		,"devineresse$4"	,"eresse"],
  ["eaux"			,"elles?"		 	,"$1$2" 		,"$1$3$4"],
  ["eau"			,"elle" 			,"$1$2" 		,"$1$3"],
  ["aux"			,"ales?"			,"$1$2" 		,"$1$3$4"],
  ["eux"			,"euse" 			,"$1$2$4" 		,"$1$3$4"			,"euse"			,"se"],// exceptions n'ayant pas de fém
  ["(pêch|chass|b[âa]ill|charm|emmerd|impost|pip|pren|sing|taill|vend|demand|veng)eur"					,"(eu)?se"			,"$3eur$6"		,"$3euse$6"			,"eresse"		,"euse"		,"se"],
  ["(vainq|assess|gouvern|prédécess)eur"					,"(eu)?se"			,"$3eur$6"		,"$3euse$6"			,"e"			,"euse"		,"eresse"	,"se"],
  ["(défend|paqu|codemand|enchant|p[éè]ch)eur"					,"eresse"			,"$3eur$6"		,"$3eresse$6"		,"eresse"],
  ["eu?r"			,"euse" 	,"$1$2$4"	,"$1$3$4"],
  ["eu?r"			,"se" 		,"$1eur$4"	,"$1euse$4"],
  ["eur"			,"eresse" 	,"$1$2$4" 	,"$1$3$4"],
  ["teu?r"			,"trice" 	,"$1$2$4" 	,"$1$3$4"		,"trice"		,"euse"		,"rice"			,"se"],
  ["eu?r"			,"rice" 	,"$1$2$4" 	,"$1$3$4"],
  ["eu?r"			,"ice" 		,"$1$2$4" 	,"$1r$3$4"],
  ["(lasc|noc|malad|tard|na|ju|v|réflex|[st])([ïi])f"					,"[iï]?ve"	,"$1$2$6"	,"$1$3$4ve$6"	,"ive"			,"ve"],
  ["[^e]"			,"esse" 	,"$1$2$4"	,"$1$2$3$4"],
  ["e"				,"esse" 	,"$1$2$4" 	,"$1$3$4"],
  ["e"				,"sse" 		,"$1$2$4" 	,"$1$2$3$4"],
  ["favori|rigolo|filou|loulou|coi"
					,"te" 		,"$1$2$4" 	,"$1$2$3$4"		,"te"],
  ["er"				,"ère"		,"$1$2$4"	,"$1ère$4"],
  ["èr"				,"e" 		,"$1er$4"	,"$1ère$4"],
  ["((in)?compl|concr|désu|(in)?discr|inqui|préf|repl|secr|qui|rondel)et"					,"ète"		,"$3et$7"	,"$3ète$7"	,"ète"],
  ["[eè]t"		,"(èt)?e" 	,"$1et$5"	,"$1ète$5"],
  ["t"			,"te" 		,"$1$2$4"	,"$1$2$3$4"],
  ["n"			,"ne" 		,"$1$2$4"	,"$1$2$3$4"],
  ["l"			,"le" 		,"$1$2$4"	,"$1$2$3$4"],
  ["exprès"		,"se" 		,"exprès"	,"expresse$4"],
  ["las|bas|gros|gras|épais"				,"se"		,"$2"		,"$2se$4"		,"se"],
  ["s"			,"ses?" 	,"$1s"		,"$1$2$3$4"], // !
  [""			,"se" 		,"$1s"		,"$1$2$3$4"], // !
  [""			,"ss" 		,"$1sse"	,"$1sse$4"],  // !
  ["s"			,"e" 		,"$1s"		,"$1se$4"],   // !
  ["n"			,"e" 		,"$1$2$4"	,"$1$2$3$4"],
  ["d"			,"e" 		,"$1$2$4"	,"$1$2$3$4"],
  ["t"			,"e" 		,"$1$2$4"	,"$1$2$3$4"],
],
muet = [
  ["chef"		,"fe"		,"chef$4"	,"cheffe$4"			,"fe"			,"fesse"],
  ["grec"		,"que" 		,"grec$4" 	,"grecque$4"		,"que"],
  ["(cadu|laï|publi|micma|syndi|tur|gre|fran)c"	
				,"que"		,"$1$2$4"	,"$1$3$4"			,"que"],
  ["é"			,"e" 		,"$1$2$4"	,"$1$2$3$4"],
  ["i"			,"e" 		,"$1$2$4"	,"$1$2$3$4"],
  ["l"			,"e" 		,"$1$2$4"	,"$1$2$3$4"],
  ["r"			,"e" 		,"$1$2$4"	,"$1$2$3$4"],
  ["(ai|ambi|bé|conti|exi|surai|subai)g[uü]"				,"[eë]" 	,"$3gu$5"	,"$3guë$5"			,"ë"			,"e"],
  ["u"			,"e" 		,"$1$2$4"	,"$1$2$3$4"],
  ["û"			,"e" 		,"$1$2$4"	,"$1u$3$4"],
];
var mode,pred,high,txtColor,bgColor,txtDeco,fontWeight,term,terml,termp=4,dl=dico.length,ml=muet.length;
var tree = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (node.parentNode.nodeName !== "SCRIPT" && node.nodeValue.trim().length > 0) {
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    }, false);
function onError(e) {
  console.error(e);
}
function init(stored) {
	mode = stored.leia.mode;
	pred = stored.leia.pred; 
	//high = stored.leia.high;
	//txtColor = stored.leia.txtColor;
	//bgColor = stored.leia.bgColor;
	//txtDeco = stored.leia.txtDeco;
	//fontWeight = stored.leia.fontWeight;
	//if (high == 1) { 	(document.body); }
	if (mode !== 0) { skim(); }	
}
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(init, onError);
/*	
function highlight(node) {
  if (/^(?:SCRIPT|STYLE|INPUT|TEXTAREA)$/.test(node.nodeName)) return;
  var r = /([·∙•][a-zÀ-ÖÙ-öù-üœŒ]+[·∙•]?([a-zÀ-ÖÙ-öù-üœŒ]+)?)/gi.exec(node.nodeValue);
  if (node.hasChildNodes()) {
	for (var i = 0; i < node.childNodes.length; i++) {
	  highlight(node.childNodes[i]);
	}
  }
  if (node.nodeType == 3 && r) {
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
*/
function skim() {
  console.time("SKIM");
  if (mode == 1) {
    while (tree.nextNode()) {
        for (var i = 0; i < dl; i++) {
          var r1 = new RegExp("([a-zÀ-ÖÙ-öù-üœŒ]+)?(" + dico[i][0] + ")[-/·∙.•](" + dico[i][1] + ")[-/·∙.•]?(s)?(?![a-z])", "gi");
          tree.currentNode.nodeValue = tree.currentNode.nodeValue.replace(r1, dico[i][2] + ' ' + dico[i][3]);
        }
        for (var j = 0; j < ml; j++) {
          var r1 = new RegExp("([a-zÀ-ÖÙ-öù-üœŒ]+)?(" + muet[j][0] + ")[-/·∙.•](" + muet[j][1] + ")[-/·∙.•]?(s)?(?![a-z])", "gi");
          tree.currentNode.nodeValue = tree.currentNode.nodeValue.replace(r1, muet[j][2]);
        }
    }
  }
  if (mode > 1) {
    while (tree.nextNode()) {
        for (var i = 0; i < dl; i++) {
          var r1 = new RegExp("([a-zÀ-ÖÙ-öù-üœŒ]+)?(" + dico[i][0] + ")[-/·∙.•](" + dico[i][1] + ")[-/·∙.•]?(s)?(?![a-z])", "gi");
          tree.currentNode.nodeValue = tree.currentNode.nodeValue.replace(r1, dico[i][mode]);
        }
        for (var j = 0; j < ml; j++) {
          var r1 = new RegExp("([a-zÀ-ÖÙ-öù-üœŒ]+)?(" + muet[j][0] + ")[-/·∙.•](" + muet[j][1] + ")[-/·∙.•]?(s)?(?![a-z])", "gi");
          tree.currentNode.nodeValue = tree.currentNode.nodeValue.replace(r1, muet[j][mode]);
        }
    }
  }
  console.timeEnd("SKIM");
}

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
	return [0, 0];
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
  let txt = text.value.substring(0, caretPos);
  if (txt.indexOf(" ") > 0) {
	var wrd = txt.split(" ");
	return wrd[wrd.length - 1];
  } else {
	return txt;
  }
}

function seek(x) {
  for (var i = 0; i < dl; i++) {
	let reg = new RegExp(dico[i][0] + "s?$", "i"),
	  mch = x.search(reg);
	if (dico[i].length > 4 && mch != -1) {
	  return dico[i];
	}
  }
}

function change(n, m, b) {
  if (n == 1) {
	if (termp == terml - 1) {
	  termp = 4;
	} else {
	  termp++;
	}
  }
  if (n == -1) {
	if (termp == 4) {

	} else {
	  termp--;
	}
  }
  m.value = m.value.slice(0, b[0]) + '·' + term[termp] + m.value.slice(b[1]);
  selekt(m, b[0], b[0] + term[termp].length + 1);
}
if (pred == 1) {
  document.body.querySelectorAll('textarea,input[type=text],[contenteditable=true]').forEach(function(elem) {
    addEvent(elem, 'keyup', function(e) {
      let b = getCaret(this),
        c = getWord(this, b[1]),
        d = seek(c) || false;
      if (this.value.indexOf(';;') > -1) {
        var now = getCaret(this);
        this.value = this.value.replace(';;', '·');
        selekt(this, now[0] - 1, now[0] - 1);
      }
      if (d && c.indexOf('·') == -1) {
        this.value = this.value.slice(0, b[0]) + '·' + d[termp] + this.value.slice(b[0]);
        selekt(this, b[0], b[0] + d[termp].length + 1);
        term = d;
        terml = term.length;
      }
    });

    addEvent(elem, 'keydown', function(e) {
      let a = e.which || e.keyCode || e.charCode,
        b = getCaret(this);
      if (term && b[0] != b[1]) {
        switch (a) {
          // Backspace
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
            // Suppr  
            // case 46:
          default:
            term = [];
            terml = undefined;
            termp = 4;
        }
      }
    });
  });
}