var mode, pred, high, styl,
    term, terml, termp = 1,
    t9l = t9.length,
    bl = false,
    r3 = new RegExp("[·∙•][a-zÀ-ÖÙ-öù-üœŒ]+[·∙•]?(?!e$)([a-zÀ-ÖÙ-öù-üœŒ]+)?", "gi"),
    walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (!node.parentNode.nodeName.match(/SCRIPT|STYLE|TEXTAREA|INPUT/i) && "true" !== node.parentNode.contentEditable && 0 < node.nodeValue.trim().length) return NodeFilter.FILTER_ACCEPT;
      }
    }, false),
    dicomap = dico.map((entry) => {
      return [
        new RegExp("([a-zÀ-ÖÙ-öù-üœŒ]+?)?(" + entry[0] + ")[-/·∙.•](" + entry[1] + ")(?:[-/·∙.•](?!$))?(s)?(?![a-z])", "gi"),
        entry[2], entry[3], entry[4]
      ];
    });

function check(n) {
  dicomap.map(function(b) {
    n.nodeValue = n.nodeValue.replace(b[0], b[mode]);
  });
}

function highlight(k) {
  let r = r3.exec(k.nodeValue);
  if (r) {
    let nmark = document.createElement("SPAN"),
      after = k.splitText(r.index);
    nmark.appendChild(document.createTextNode(r[0]));
    nmark.className = styl;
    after.nodeValue = after.nodeValue.substring(r[0].length);
    k.parentNode.insertBefore(nmark, after);
  }
}

function seek(z) {
  for (let j = 0; j < t9l; j++) {
    let reg = new RegExp("(" + t9[j][0] + ")$", "i"),
      mch = z.search(reg);
    if (-1 != mch) {
      return t9[j];
    }
  }
}

function getCaret(x) {
  if (document.selection) {
    x.focus();
    let r = document.selection.createRange(),
      rs = r.text.length;
    r.moveStart("character", -x.value.length);
    let start = r.text.length - rs;
    return [start, start + rs];
  } else if (x.selectionStart || x.selectionStart == "0") {
    return [x.selectionStart, x.selectionEnd];
  } else {
    return [0, 0];
  }
}

function getCaretCE(x) {
  let start = 0;
  if (typeof window.getSelection !== "undefined") {
    let range = window.getSelection().getRangeAt(0),
      sel = range.toString().length,
      preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(x);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    start = preCaretRange.toString().length - sel;
    if (sel == 0) {
      return [start, start];
    } else {
      return [start, start + sel]
    }
  }
  return [start, start]
}

function selekt(elem, start, end) {
  if (elem.setSelectionRange) {
    elem.focus();
    elem.setSelectionRange(start, end);
  } else if (elem.createTextRange) {
    let range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd("character", end);
    range.moveStart("character", start);
    range.select();
  }
}

function selektCE(elem, start, end) {
  let range = document.createRange(),
    sel = window.getSelection();
  range.setStart(elem.firstChild, start);
  range.setEnd(elem.firstChild, end);
  sel.removeAllRanges();
  sel.addRange(range);
}

function middot(e, f) {
  if (f.value.indexOf(";;") > -1) {
    let now = getCaret(f);
    f.value = f.value.replace(";;", "·");
    selekt(f, now[0] - 1, now[0] - 1);
  }
}

function middotCE() {
  var a = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode;
  if (a.innerText.indexOf(";;") > -1) {
    let now = getCaretCE(a);
    a.innerText = a.innerText.replace(";;", "·");
    selektCE(a, now[0] - 1, now[0] - 1);
  }
}

function feminize(g) {
  function getWord(text, caretPos) {
    let txt = text.value.substring(0, caretPos);
    if (txt.indexOf(" ") > 0) {
      let wrd = txt.split(" ");
      return wrd[wrd.length - 1];
    } else {
      return txt;
    }
  }
  let b = getCaret(g),
      c = getWord(g, b[1]),
      d = seek(c) || false;
  if (d && c.indexOf("·") == -1 && !bl) {
    g.value = g.value.slice(0, b[0]) + "·" + d[termp] + g.value.slice(b[0]);
    selekt(g, b[0], b[0] + d[termp].length + 1);
    term = d;
    terml = term.length;
  }
  bl = false;
}

function feminizeCE() {
  function getWordCE(text, caretPos) {
    let txt = text.innerText.substring(0, caretPos);
    if (txt.indexOf(" ")) {
      let wrd = txt.split(" ");
      return wrd[wrd.length - 1];
    } else {
      return txt;
    }
  }
  let a = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode,
      b = getCaretCE(a),
      c = getWordCE(a, b[0]),
      d = seek(c) || false;

  if (d && getWordCE(a, b[0] + 1).indexOf("·") == -1 && !bl) {
    a.innerText = a.innerText.slice(0, b[0]) + "·" + d[termp] + a.innerText.slice(b[0]);
    selektCE(a, b[0], b[0] + d[termp].length + 1);
    term = d;
    terml = term.length;
  }
  bl = false;
}

function switcher(e, h) {
  function change(n, m, b) {
    1 == n && (termp == terml - 1 ? termp = 1 : termp++); 
	-1 == n && (1 == termp ? termp = terml - 1 : termp--);
    m.value = m.value.slice(0, b[0]) + "·" + term[termp] + m.value.slice(b[1]);
    selekt(m, b[0], b[0] + term[termp].length + 1);
  }
  var a = e.keyCode,
      b = getCaret(h);
  if (term && b[0] != b[1]) {
    switch (a) {
      case 8:
        e.preventDefault();
        h.value = h.value.slice(0, b[0] - 1) + h.value.slice(b[1]);
        selekt(h, b[0] - 1, b[0] - 1);
        break;
      case 37:
        e.preventDefault();
        h.value = h.value.slice(0, b[0]) + h.value.slice(b[1]);
        selekt(h, b[0] - 1, b[0] - 1);
        break;
      case 13:
        e.preventDefault();
        selekt(h, b[1], b[1]);
        break;
      case 40:
        e.preventDefault();
        change(1, h, b);
        break;
      case 38:
        e.preventDefault();
        change(-1, h, b);
        break;
      case 46:
        bl = true;
        break;
      default:
        term = [];
        terml = undefined;
        termp = 1;
    }
  }
}

function switcherCE(e) {
  var h = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode;

  function changeCE(n, b) {
    1 == n && (termp == terml - 1 ? termp = 1 : termp++); 
	-1 == n && (1 == termp ? termp = terml - 1 : termp--);
    h.innerText = h.innerText.slice(0, b[0]) + "·" + term[termp] + h.innerText.slice(b[1]);
    selektCE(h, b[0], b[0] + term[termp].length + 1);
  }
  let a = e.keyCode,
      b = getCaretCE(h);
  if (term && b[0] != b[1]) {
    switch (a) {
      case 8: // backspace
        e.preventDefault();
        h.innerText = h.innerText.slice(0, b[0] - 1) + h.innerText.slice(b[1]);
        selektCE(h, b[0] - 1, b[0] - 1);
        break;
      case 37: // gauche
        e.preventDefault();
        h.innerText = h.innerText.slice(0, b[0]) + h.innerText.slice(b[1]);
        selektCE(h, b[0] - 1, b[0] - 1);
        break;
      case 13: // entrée
        e.preventDefault();
        selektCE(h, b[1], b[1]);
        break;
      case 40: // bas
        e.preventDefault();
        changeCE(1, b);
        break;
      case 38: // haut
        e.preventDefault();
        changeCE(-1, b);
        break;
      case 46:
        bl = true;
        break;
      default:
        term = [];
        terml = undefined;
        termp = 1;
    }
  }
}

function init() {
  if (0 < mode) {
    while (walker.nextNode()) {
      setTimeout((function(currentNode) {
        check(currentNode);
      }(walker.currentNode)), 0);
    }
  }
  if (1 == high) {
    while (walker.nextNode()) {
      setTimeout((function(currentNode) {
        highlight(currentNode);
      }(walker.currentNode)), 0);
    }
  }
  if (1 == pred) {

    document.querySelectorAll("input,textarea").forEach(function(x) {
      if (x.type.match(/TEXT|TEXTAREA/i)) {
        x.addEventListener("keyup", function(e) {
          feminize(this);
        }, false);
        x.addEventListener("keydown", function(e) {
          switcher(e, this)
        }, false);
      }
    });
    document.querySelectorAll('[contenteditable=true],[contenteditable]').forEach(function(y) {
      y.addEventListener('keyup', function(e) {
        feminizeCE(this);
      }, false);
      y.addEventListener('keydown', function(e) {
        switcherCE(e);
      }, false);
    });

  }
}

document.querySelectorAll("input,textarea").forEach(function(x) {
  if (x.type.match(/SEARCH|TEXT|TEXTAREA/i)) {
    x.addEventListener("keyup", function(e) {
      middot(e, this)
    }, false);
  }
});

document.querySelectorAll("[contenteditable],[contenteditable=true]").forEach(function(x) {
  x.addEventListener("keyup", function(e) {
    middotCE(e, this)
  }, false);
});

browser.storage.local.get().then(function(a) {
  mode = a.leia.mode;
  pred = a.leia.pred;
  high = a.leia.high;
  styl = a.leia.styl;
  init();
}, function(a) {
  console.error(a);
  mode = 1;
  pred = high = 0;
  styl = "emph4";
  init();
});

/*
document.addEventListener("keyup",function(e){
	let targ = e.target;
	if (targ.tagName.match(/INPUT|TEXTAREA/i) && targ.type.match(/SEARCH|TEXT|TEXTAREA/i)) {
		middot(e,targ);
		!targ.type.match(/SEARCH/i) && feminize(targ);	
	} else if ("true" == targ.contentEditable) {	
		middotCE(e,targ);
		feminizeCE(targ);
	}	
});
document.addEventListener("keydown",function(e){
	let targ = e.target;
	if (targ.tagName.match(/INPUT|TEXTAREA/i) && targ.type.match(/TEXT|TEXTAREA/i)) {
		switcher(e,targ)	
	} else if ("true" == targ.contentEditable) {	
		switcherCE(e,targ)
	}	
});
*/