const dico = [
["br[èe]f","è?ve","bref$4 brève$4","brève$4","bref$4"],
["s[èe]c","è?c?he","sec$4 sèche$4","sèche$4","sec$4"],
["fra[iî]s?","a?[iî]?che","frais fraîche$4","fraîche$4"],
["prophète","e?sse","prophète$4 prophétesse$4","prophétesse$4","prophète$4"],
["foufou","olle","foufou$4 fofolle$4","fofolle$4","foufou$4"],
["héros?","o?ïne","héros héroïne$4","héroïne$4","héros"],
["aïeux","(?:ïeu)?le","aïeux aïeule$4","aïeule$4","aïeux"],
["vieux","i?eille","vieux vieille$4","vieille$4","vieux"], 
["eur","(?:[oe]r)?esse","$1$2$4 $1$3$4","$1$3$4","$1$2$4"],
["([td])eu?r","[td]?r?ice","$1$2$5 $1$3rice$5","$1$3rice$5","$1$2$5"],
["e(u)?r","(?:eu)?se","$1e$3r$5 $1euse$5","$1euse$5","$1e$3r$5"],
["([ïuri])f","(?:au|eu|er|[iï])?ve","$1$2$5 $1$3ve$5","$1$3ve$5","$1$2$5"],
["([eoa]u)x","(?:[oea]u)?([sdc]{1,2}e)","$1$3x $1$3$5$6","$1$3$5$6","$1$3x"],
["e?aux?","elle|ale","$1$2 $1$3$4","$1$3$4","$1$2"],
["a?in|agnon|ou|ut|a","[ia]g?ne|olle|asse|use","$1$2$4 $1$3$4","$1$3$4","$1$2$4"], 
["[èe]([rnt])","(?:è[rnt])?e","$1e$3$5 $1è$3e$5","$1è$3e$5","$1e$3$5"], 
["le|au|du", "(à |de )?l?aquel[-/.\u00b7\u2219\u2022\u2027\u30fb\uff65\u0387\u22c5\u16eb]le","$2quel $4 laquelle","$4 laquelle","$2quel"],
["du|au","(?:de|à) la","$2 $3","$3","$2"],
["le","l?a","le la","la","le"],
["([mts])on","[mts]a","$3on $3a","$3a","$3a","$3on"],
["ils?","elle","il$4 elle$4","elle$4","il$4"],
["eux|e?lui|ils?","c?elle","$1$2 $1elle$4","$1elle$4","$1$2"],
["franc","que","franc$4 franque$4","franque$4","franc$4"],
["grec","que","grec$4","grecque$4","grec$4"],
["(absou|dissou|tou|tier)s?","(ou)?(te)|(ce)","$3s $3$6$7$8","$3$6$7$8","$3s"],
["clown|blanc|franc(?![-/.\u00b7\u2219\u2022\u2027\u30fb\uff65\u0387\u22c5\u16eb\u2027\u30fb\uff65\u0387\u22c5\u16eb]que)|long|butor|esquimau|andalou|devin|favori|rigolo|filou|loulou|coi|ce","(?:er)?esse|[hudst]e|tte","$2$4 $2$3$4","$2$3$4","$2$4"],
["t","te","$1$2$4 $1$2$3$4","$1$2$3$4","$1$2$4"],
["n","ne","$1$2$4 $1$2$3$4","$1$2$3$4","$1$2$4"],
["pareil|vermeil|bel|nouvel|vieil|fol|mol","le","$2","$2le","$2"],
["il","le","$1$2$4 $1$2$3$4","$1$2$3$4","$1$2$4"], 
["[aeou]l","le","$1$2$4","$1$2$3$4","$1$2$4"], 
["(e)|([^e])","e?sse","$1$3$4$6 $1$4esse","$1$4esse","$1$3$4$6"], 
["s","se","$1s $1$2$3$4","$1$2$3$4","$1s"],
["[ndt]h?","e","$1$2$4 $1$2$3$4","$1$2$3$4","$1$2$4"],
["ü","e","$1u$4","$1üe$4","$1u$4"],
["û","e","$1u$4","$1ue$4","$1u$4"],
["([féilruzhk])|(c)","(f|qu)?[ëe]","$1$3$4$7","$1$3$5$7","$1$3$4$7"], 
["s","e","$1s $1se$4","$1se$4","$1s"],
["","se","$1s $1se$4","$1se$4","$1s"]
],
t9 = [
["(ai|ambi|bé|conti|exi|surai|subai)g[uü]","ë","e"],
["(gre|cadu|laï|publi|micma|syndi|tur|fran)c","que"],
["lesquel|auxquel|desquel","les"],
["((in)?compl|concr|désu|(in)?discr|inqui|préf|repl|secr|qui|rondel)et","ète"],
["([a-z\u00e0-\u00f6\u00f9-\u00ff\u0153]+ier)|(fi|am|arch|berg|bocag|bouch|boulang|caloy|ch|coch|conseill|écaill|écuy|étrang|fromag|gauch|horlog|khm|lég|ling|maraîch|mast|ménag|mensong|métay|passag|paysag|péag|porch|potag|sup|usag|vach)er","ère"],
["([bc]|aigl|sax|bar|berrich|bis|b|bouff|bourguign|bûcher|bret|brouill|b[uû]cher|buffl|champi|coch|couill|cret|dar|drag|espi|fanfar|fél|folich|forger|frip|maç|lett|garç|gasc|glout|grogn|hériss|hur|laider|lap|lett|li|tatill|teut|champi|vigner|wall|lur|maç|maigrich|nipp|ours|pâlich|phara|piét|pige|pi|pochetr|pochtr|poliss|poltr|rejet|ronch|sauvage|sax|beaucer|bess|bich|boug|brabanç|charr|enfanç|fransquill|godich|hesbign|marmit|nazill|négrill|noblaill|patr|percher|pa|levr|louch|maquign|marr|mat|slav|so[uû]l|mign|mist|mollass|tâcher|tardill)on","ne"],
["âne|comte|bonze|bougre|buffle|chanoine|sauvage|tigre|traître|type|prêtre|prince|prophète|faune|flique|gonze|hôte|ivrogne|ladre|larronne|maire|maître|monstre|nègre|notaire|ogre|paire|pape|patronne|pauvre|drôle|druide|comte|diable|suisse|mulâtre|centaure|chanoine","sse","esse"],
["ils?|ceux|celui|(damois|cham|jum|puc|tourang|tourter|jouvenc|maquer|ois|nouv|gém|pastour|agn|b)eaux?","elle"],
["vieux","ieille"],
["aïeux","ïeule"],
["[a-z\u00e0-\u00f6\u00f9-\u00ff\u0153]+eux","euse","se"],
["(diss|abs)ous","oute","te"],
["chat|rat|filou|loulou|favori|rigolo|coi|((maigri|pâl|bosc|jeun|vieill|s)ot)|((aigrel|boul|bleu|biqu|blondin|baronn|brun|cad|c|choupin|simpl|mu|suj|tripl|tristoun|viol|coqu|douill|maigrel|mignonn|min|jeun|guiller|grassouill|flu|rondel|propr|poul|pitchoun|pauvr|n|pipel|fur|gentill|verdel|seul|croquignol|douc|foll|grandel|grand|jaun|joli|moufl)et)","te"],
["sculpteur","e","euse","rice"],
["ambassadeur","drice","rice","ice"],
["docteur","e","oresse"],
["acquéreur","euse","esse"],
["(pêch|chass|b[âa]ill|charm|emmerd|impost|pip|pren|sing|taill|vend|demand|veng)eur","eresse","euse","se"],
["(vainq|assess|gouvern|prédécess)eur","e","euse","eresse","se"],
["devin|(défend|paqu|codemand|enchant|p[éè]ch)eur","eresse"],
["auteur","e","trice","rice"],
["(abat|accep|ache|affai|affré|affron|affû|agio|airsof|ajou|ajus|alimen|appor|apprê|argumen|arpen|autopor|avor|babysit|baque|barat|barbo|basket|basso|bat|belo|bibelo|bizu|blabla|bonimen|bot|boursico|bou|boycot|bret|brocan|broche|brouet|brou|brui|buffe|bu|but|cafe|caf|caillou|calopor|caloripor|cano|caque|carot|cas|chahu|chan|chat|chichi|chipo|chucho|chuin|cigaret|coko|colpor|compac|complé|complimen|complo|comp|compu|con|contre-rappor|convoi|copi|corappor|cran|crapahu|crapo|crépi|cybersquat|da|débat|débi|déchique|décolle|décrot|déli|démon|dénoyau|dépis|dépor|désamian|désinfec|dispu|disser|doc|domp|dou|ébou|écla|écô|écou|écroû|e-marke|emberlifico|emmaillo|émot|empié|emprun|encan|enquê|entar|entê|entremet|envou|épa|épince|érein|ergo|escamo|essar|étê|étique|évi|exploi|fago|fau|fein|fis|flat|flir|flû|folio|fouet|fou|frela|fréquen|frico|fri|frot|froufrou|fure|gâ|gigo|glavio|globe-trot|glouglou|gobelot|goû|gou|gout|graffi|grat|gravipor|grigno|guet|hési|hot|impos|inquié|insul|invi|jabo|jac|je|jet-set|jou|jugeo|ko|lai|lif|lof|lut|maillo|maître-chan|marque|ma|mégo|men|met|mijo|mi|mon|navet|numéro|oedéma|œdéma|orien|pelle|pelo|pen-tes|pes|pé|photorepor|pipeau|pipo|pis|pi|plan|pla|podcas|poin|por|poursui|prê|profi|promet|prou|quê|rabat|rabo|racon|rado|raf|rago|rappor|raquet|rase|ra|rebou|récol|remet|remon|rempor|repor|repos|réseau|rewri|ribo|rio|riot|rive|roc|ronéo|ro|rouspé|rou|ru|sabo|sanglo|sapi|sau|sauve|sava|sculp|sérendipi|sies|ska|snapcha|sollici|sor|sprin|squat|sulfa|suppor|survol|tapo|tâ|téléache|tes|toilet|tourmen|tousso|trac|transplan|transpor|trico|tripo|trot|trus|twee|twit|ven|visi|vo|zes|zozo)teur","euse","teuse","se"],
["[a-z\u00e0-\u00f6\u00f9-\u00ff\u0153]+teur","rice","trice","ice"],
["[a-z\u00e0-\u00f6\u00f9-\u00ff\u0153]+[^t]eur","euse","se"], 
["(lasc|noc|malad|tard|na|ju|v|réflex|[st])([ïi])f","ive","ve"],
["[vn]euf","euve","ve"],
["sauf","auve","ve"],
["clown","e","esse"],
["br[èe]f","ève"],
["fra[iî]s?","che","aîche"],
["héros","oïne"],
["(ép|jal)oux","ouse","se"],
["roux","ousse","sse"],
["faux","ausse","sse"],
["bel|nouvel|vieil|fol|mol|nul|trol","le"],
["doux","ouce","ce"],
["long","ue"],
["([mf])ou","olle"],
["blanc|franc","he"],
["s[èe]c","he","èche"],
["copain","ine"],
["compagnon","agne"],
["(bén|mal)in","igne"],
["chef","fe","fesse"],
["las|bas|gros|gras|épais|andalou","se"]
];
var mode, pred, high, styl,
    term, terml, termp = 1,
    t9l = t9.length,
    bl = !1,
    tree = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (!node.parentNode.nodeName.match(/SCRIPT|STYLE|TEXTAREA|INPUT/i) && "true" !== node.parentNode.contentEditable && 0 < node.nodeValue.trim().length) return NodeFilter.FILTER_ACCEPT;
      }
    }, !1),
    dm = dico.map((a) => {
      return [new RegExp("([a-z\u00e0-\u00f6\u00f9-\u00ff\u0153]+?)?(" + a[0] + ")[-/.\u00b7\u2219\u2022\u2027\u30fb\uff65\u0387\u22c5\u16eb\u0028](" + a[1] + ")(?:[-/.\u00b7\u2219\u2022\u2027\u30fb\uff65\u0387\u22c5\u16eb\u0029](?!$|\\s))?(s)?(?![a-z\u00e0-\u00f6\u00f9-\u00ff\u0153])", "gi"), a[2], a[3], a[4]];
    });
const 
r3 = new RegExp("[\u00b7\u2219\u2022\u2027\u30fb\uff65\u0387\u22c5\u16eb][a-z\u00e0-\u00f6\u00f9-\u00ff\u0153]+[\u00b7\u2219\u2022\u2027\u30fb\uff65\u0387\u22c5\u16eb]?([a-z\u00e0-\u00f6\u00f9-\u00ff\u0153]+)?", "gi"),
Chk = (a) => {
  dm.map(function(b) {
    a.nodeValue = a.nodeValue.replace(b[0], b[mode]);
  });
},
Seek = (z) => {
  for (let j = t9l; j--;) {
    if (-1 != z.search(new RegExp("(^|[\\s\u0028\u005b\u0027\u00ab\u201c\u0022\u002d])(" + t9[j][0] + ")$", "i"))) return t9[j];
  }
},
Mid = (a) => {
  let b = Car(a);
  -1 < a.value.indexOf(";;") && (a.value = a.value.replace(";;", "\u00b7"), Sel(a, b[0] - 1, b[0] - 1));
},
MidCE = () => {
  let a = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode, 
    b = CarCE(a);
  -1 < a.innerText.indexOf(";;") && (a.innerText = a.innerText.replace(";;", "\u00b7"), SelCE(a, b[0] - 1, b[0] - 1));  
},
High = (a) => {
  let b = r3.exec(a.nodeValue);
  if (b) {
    let c = document.createElement("SPAN"), d = a.splitText(b.index);
    c.appendChild(document.createTextNode(b[0])),
    c.className = styl,
    d.nodeValue = d.nodeValue.substring(b[0].length),
    a.parentNode.insertBefore(c, d);
  }
},
Car = (a) => {
  if (document.selection) {
    a.focus();
    let b = document.selection.createRange(), 
    c = b.text.length;
    b.moveStart("character", -a.value.length),
    a = b.text.length - c;
    return [a, a + c];
  }
  return a.selectionStart || "0" == a.selectionStart ? [a.selectionStart, a.selectionEnd] : [0, 0];
},
CarCE = (a) => {
  let b = 0;
  if ("undefined" !== typeof window.getSelection) {
    let c = window.getSelection().getRangeAt(0), 
    d = c.toString().length, 
    e = c.cloneRange();
    e.selectNodeContents(a),
    e.setEnd(c.endContainer, c.endOffset),
    b = e.toString().length - d;
    if (d != 0) return [b, b + d];
  }
  return [b,b]
},
Sel = (a,b,c) => {
  a.setSelectionRange ? (a.focus(), a.setSelectionRange(b, c)) : a.createTextRange && (d = a.createTextRange(), d.collapse(true), d.moveEnd("character", c), d.moveStart("character", b), d.select());
},
SelCE = (a,b,c) => {
  let d = document.createRange(), 
    e = window.getSelection();
  d.setStart(a.firstChild, b),
  d.setEnd(a.firstChild, c),
  e.removeAllRanges(),
  e.addRange(d);
},
Fem = (a,ev) => {
  let b = Car(a), 
    c = a.value.substring(0, b[1]), 
    d = c.match(/\s/gm), 
    e = d ? (w = c.split(d[d.length - 1]), w[w.length - 1]) : c, 
    f = Seek(e);
  f && -1 == e.indexOf("\u00b7") && !bl && (
    a.value = a.value.slice(0, b[0]) + "\u00b7" + f[termp] + a.value.slice(b[0]),
    Sel(a, b[0], b[0] + f[termp].length + 1),
    term = f,
    terml = term.length);
  46 != ev.keyCode && (bl = !1);
},
FemCE = (ev) => {
  function G(p) {
    let u = a.innerText.substring(0, p);
    return u.indexOf(" ") ? (w = u.split(" "), w[w.length - 1]) : u;
  }
  let a = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode, 
    b = CarCE(a), 
    c = G(b[0]), 
    d = Seek(c);
  d && G(b[0] + 1).indexOf("\u00b7") == -1 && !bl && (
    a.innerText = a.innerText.slice(0, b[0]) + "\u00b7" + d[termp] + a.innerText.slice(b[0]),
    SelCE(a, b[0], b[0] + d[termp].length + 1),
    term = d,
    terml = term.length
  );
  46 != ev.keyCode && (bl = !1);
},
Nxt = (e,h) => {
  var a = Car(h),
      F = (n, m, b) => {
        1 == n && (termp == terml - 1 ? termp = 1 : termp++);
        -1 == n && (1 == termp ? termp = terml - 1 : termp--);
        m.value = m.value.slice(0, b[0]) + "\u00b7" + term[termp] + m.value.slice(b[1]),
        Sel(m, b[0], b[0] + term[termp].length + 1);
     };
  if (term && a[0] != a[1]) {
    switch (e.keyCode) {
      case 8: case 46:
        bl = !0,
        termp = 1;
        break;
      case 37:
        e.preventDefault(),
        h.value = h.value.slice(0, a[0]) + h.value.slice(a[1]),
        Sel(h, a[0] - 1, a[0] - 1);
        break;
      case 13:
        e.preventDefault(),
        Sel(h, a[1], a[1]);
        break;
      case 40:
        e.preventDefault(),
        !h.type.match(/SEARCH/i) && F(1, h, a);
        break;
      case 38:
        e.preventDefault(),
        !h.type.match(/SEARCH/i) && F(-1, h, a);
        break;
      default:
        term = [],
        terml = void 0,
        termp = 1;
    }
  }
},
NxtCE = (e) => {
  var a = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode, 
    b = CarCE(a),
      F = (c, d) => {
        1 == c && (termp == terml - 1 ? termp = 1 : termp++);
        -1 == c && (1 == termp ? termp = terml - 1 : termp--);
        a.innerText = a.innerText.slice(0, d[0]) + "\u00b7" + term[termp] + a.innerText.slice(d[1]),
        SelCE(a, d[0], d[0] + term[termp].length + 1);
      };
  if (term && b[0] != b[1]) {
    switch (e.keyCode) {
      case 8: case 46:
        bl = !0,
        termp = 1;
        break;
      case 37:
        e.preventDefault(),
        a.innerText = a.innerText.slice(0, b[0]) + a.innerText.slice(b[1]),
        SelCE(a, b[0] - 1, b[0] - 1);
        break;
      case 13:
        e.preventDefault(),
        SelCE(a, b[1], b[1]);
        break;
      case 40:
        e.preventDefault(),
        F(1, b);
        break;
      case 38:
        e.preventDefault(),
        F(-1, b);
        break;
      default:
        term = [],
        terml = void 0,
        termp = 1;
    }
  }
},
Init = () => {
 if (0 < mode) {
  4 == mode && (mode = 1, dm.length = 22);
    for (; tree.nextNode();) {
      setTimeout((function(currentNode) {
        Chk(currentNode);
      }(tree.currentNode)), 0);
    }
  } else if (1 == high) {
    for (; tree.nextNode();) {
      setTimeout((function(currentNode) {
        High(currentNode);
      }(tree.currentNode)), 0);
    }
  }
  document.addEventListener("keyup", function(e) {
    let t = e.target;
    if (e.shiftKey) {bl = !0 ; return false}
    t.tagName.match(/INPUT|TEXTAREA/i) && t.type.match(/SEARCH|TEXT(AREA)?/i) ? (Mid(t), 1 == pred && Fem(t,e)) : "true" == t.contentEditable && (MidCE(), 1 == pred && FemCE(e));
  });
  
  1 == pred && document.addEventListener("keydown", function(e) {
    let t = e.target;
    e.shiftKey && (term = void 0, bl = !0)
    t.tagName.match(/INPUT|TEXTAREA/i) && t.type.match(/SEARCH|TEXT(AREA)?/i) ? Nxt(e, t) : "true" == t.contentEditable && NxtCE(e, t);
  });
}

browser.storage.local.get().then(function(a) {
  mode = a.leia.mode;
  pred = a.leia.pred;
  high = a.leia.high;
  styl = a.leia.styl;
  Init();
}, function(a) {
  console.error(a);
  mode = 1;
  pred = high = 0;
  styl = "emph4";
  Init();
});
