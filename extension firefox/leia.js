var mode, pred, high, styl,
    term, terml, termp = 1,
    t9l = t9.length,
    bl = false,
    r3 = new RegExp("[\u00b7\u2219\u2022][a-z\u00e0-\u00f6\u00f9-\u00ff\u0153]+[\u00b7\u2219\u2022]?(?!e$)([a-z\u00e0-\u00f6\u00f9-\u00ff\u0153]+)?", "gi"),
    tree = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (!node.parentNode.nodeName.match(/SCRIPT|STYLE|TEXTAREA|INPUT/i) && "true" !== node.parentNode.contentEditable && 0 < node.nodeValue.trim().length) return NodeFilter.FILTER_ACCEPT;
      }
    }, false),
    dm = dico.map((entry) => {
      return [
        new RegExp("([a-z\u00e0-\u00f6\u00f9-\u00ff\u0153]+?)?(" + entry[0] + ")[-/.\u00b7\u2219\u2022\u0028](" + entry[1] + ")(?:[-/.\u00b7\u2219\u2022\u0029](?!$|\\s))?(s)?(?![a-z\u00e0-\u00f6\u00f9-\u00ff\u0153])", "gi"),
        entry[2], entry[3], entry[4]
      ];
    });

function check(a) {
  dm.map(function(b) {
    a.nodeValue = a.nodeValue.replace(b[0], b[mode]);
  });
}

function seek(z) {
  for (let j = 0; j < t9l; j++) {
    if (-1 != z.search(new RegExp("(^|[\\s\u0028\u005b\u0027\u00ab\u201c\u0022\u002d])(" + t9[j][0] + ")$", "i"))) return t9[j]
  }
}

function middot(a) {
  let b = getCaret(a);
  -1 < a.value.indexOf(";;") && (a.value = a.value.replace(";;", "\u00b7"), selekt(a, b[0] - 1, b[0] - 1));
}

function middotCE() {
  let a = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode, b = getCaretCE(a);
  -1 < a.innerText.indexOf(";;") && (a.innerText = a.innerText.replace(";;", "\u00b7"), selektCE(a, b[0] - 1, b[0] - 1));  
}

function Hi(a) {
  let b = r3.exec(a.nodeValue);
  if (b) {
    let c = document.createElement("SPAN"), d = a.splitText(b.index);
    c.appendChild(document.createTextNode(b[0]));
    c.className = styl;
    d.nodeValue = d.nodeValue.substring(b[0].length);
    a.parentNode.insertBefore(c, d);
  }
}

function getCaret(a) {
  if (document.selection) {
    a.focus();
    let b = document.selection.createRange(), c = b.text.length;
    b.moveStart("character", -a.value.length);
    a = b.text.length - c;
    return [a, a + c];
  }
  return a.selectionStart || "0" == a.selectionStart ? [a.selectionStart, a.selectionEnd] : [0, 0];
}

function getCaretCE(a) {
  let b = 0;
  if ("undefined" !== typeof window.getSelection) {
    let c = window.getSelection().getRangeAt(0), d = c.toString().length, e = c.cloneRange();
    e.selectNodeContents(a);
    e.setEnd(c.endContainer, c.endOffset);
    b = e.toString().length - d;
    if (d != 0) return [b, b + d];
  }
  return [b,b]
}

function selekt(a, b, c) {
  if (a.setSelectionRange) {
    a.focus();
    a.setSelectionRange(b, c);
  } else if (a.createTextRange) {
    let d = a.createTextRange();
    d.collapse(true);
    d.moveEnd("character", c);
    d.moveStart("character", b);
    d.select();
  }
}

function selektCE(a, b, c) {
  let d = document.createRange(), e = window.getSelection();
  d.setStart(a.firstChild, b);
  d.setEnd(a.firstChild, c);
  e.removeAllRanges();
  e.addRange(d);
}

function feminize(a) {
  let b = getCaret(a),
      c = a.value.substring(0, b[1]),
      d = c.match(/\s/gm),
	  e = d ? (w = c.split(d[d.length - 1]), w[w.length - 1]) : c,
      f = seek(e);
  f && e.indexOf("\u00b7") == -1 && !bl && (
    a.value = a.value.slice(0, b[0]) + "\u00b7" + f[termp] + a.value.slice(b[0]),
    selekt(a, b[0], b[0] + f[termp].length + 1),
    term = f,
    terml = term.length);
  bl = false;
}

function feminizeCE() {
  function gWc(t, caretPos) {
    let u = t.innerText.substring(0, caretPos);
    if (u.indexOf(" ")) {
      let w = u.split(" ");
      return w[w.length - 1];
    } else {
      return u;
    }
  }
  let a = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode,
      b = getCaretCE(a),
      c = gWc(a, b[0]),
      d = seek(c);

  if (d && gWc(a, b[0] + 1).indexOf("\u00b7") == -1 && !bl) {
    a.innerText = a.innerText.slice(0, b[0]) + "\u00b7" + d[termp] + a.innerText.slice(b[0]);
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
    m.value = m.value.slice(0, b[0]) + "\u00b7" + term[termp] + m.value.slice(b[1]);
    selekt(m, b[0], b[0] + term[termp].length + 1);
  }
  let a = e.keyCode, b = getCaret(h);
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
        termp = 1;
        break;
      default:
        term = [];
        terml = void 0;
        termp = 1;
    }
  }
}

function switcherCE(e) {
  var h = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode;

  function changeCE(n, b) {
    1 == n && (termp == terml - 1 ? termp = 1 : termp++);
	-1 == n && (1 == termp ? termp = terml - 1 : termp--);
    h.innerText = h.innerText.slice(0, b[0]) + "\u00b7" + term[termp] + h.innerText.slice(b[1]);
    selektCE(h, b[0], b[0] + term[termp].length + 1);
  }
  let a = e.keyCode,
      b = getCaretCE(h);
  if (term && b[0] != b[1]) {
    switch (a) {
      case 8:
        e.preventDefault();
        h.innerText = h.innerText.slice(0, b[0] - 1) + h.innerText.slice(b[1]);
        selektCE(h, b[0] - 1, b[0] - 1);
        break;
      case 37:
        e.preventDefault();
        h.innerText = h.innerText.slice(0, b[0]) + h.innerText.slice(b[1]);
        selektCE(h, b[0] - 1, b[0] - 1);
        break;
      case 13:
        e.preventDefault();
        selektCE(h, b[1], b[1]);
        break;
      case 40:
        e.preventDefault();
        changeCE(1, b);
        break;
      case 38:
        e.preventDefault();
        changeCE(-1, b);
        break;
      case 46:
        bl = true;
        termp = 1;
        break;
      default:
        term = [];
        terml = void 0;
        termp = 1;
    }
  }
}

function init() {
 if (0 < mode) {
    for (; tree.nextNode();) {
      setTimeout((function(currentNode) {
        check(currentNode);
      }(tree.currentNode)), 0);
    }
  } else {
    if (1 == high) {
      for (; tree.nextNode();) {
        setTimeout((function(currentNode) {
          Hi(currentNode);
        }(tree.currentNode)), 0);
      }
    }
  }
  document.addEventListener("keyup", function(e) {
    let t = e.target;
    t.tagName.match(/INPUT|TEXTAREA/i) && t.type.match(/SEARCH|TEXT(AREA)?/i) ? (middot(t), 1 == pred && feminize(t)) : "true" == t.contentEditable && (middotCE(), 1 == pred && feminizeCE(t));
  });
  
  1 == pred && document.addEventListener("keydown", function(e) {
    let t = e.target;
    t.tagName.match(/INPUT|TEXTAREA/i) && t.type.match(/TEXT(AREA)?/i) ? switcher(e, t) : "true" == t.contentEditable && switcherCE(e, t);
  });
}

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
