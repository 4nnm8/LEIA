var mode, pred, high, styl,
    term, terml, termp = 1,
    list = document.body.querySelectorAll("textarea,input"), ll = list.length, pm = [], pr = [],
    t9l = t9.length, 
    r3 = new RegExp("[·∙•][a-zÀ-ÖÙ-öù-üœŒ]+[·∙•]?(?!e$)([a-zÀ-ÖÙ-öù-üœŒ]+)?", "gi"),
    walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (!node.parentNode.nodeName.match(/SCRIPT|STYLE|TEXTAREA|INPUT/i) && node.parentNode.contentEditable !== "true" && node.nodeValue.trim().length > 0) {
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    }, false),
	dicomap = dico.map((entry)=>{
      return [
        new RegExp("([a-zÀ-ÖÙ-öù-üœŒ]+?)?("+entry[0]+")[-/·∙.•]("+entry[1]+")[-/·∙.•]?(s)?(?![a-z])","gi"),
        entry[2],entry[3],entry[4]
      ];
    });
for (var i = 0; i < ll ; i++) {
  var a = list[i];
  (a.type == "text" || a.type == "textarea") && (pm.push(a), pr.push(a));
  ("search" == a.term) && pm.push(a);
}
pm.forEach(function(x) {
  x.addEventListener("keyup", function(e) { addMiddot(e,this) }, false);
});
browser.storage.local.get().then(function(a) {
  mode = a.leia.mode;
  pred = a.leia.pred;
  high = a.leia.high;
  styl = a.leia.styl;
  if (0 < mode) {
    while (walker.nextNode()) {
      setTimeout((function(currentNode){
		check(currentNode);
	  }(walker.currentNode)), 0);
    }
  }
  if (1 == high) {
    while (walker.nextNode()) {
      highlight(walker.currentNode)
    }
  }
  if (1 == pred) {
      pr.forEach(function(x) {
      x.addEventListener("keyup", function(e) { feminize(this); },false);
      x.addEventListener("keydown", function(e) { switcher(e,this) },false);
    }); 
  }
}, function(a) {
  console.error(a);
});
function check(n) {
  dicomap.map(function(b) {
    n.nodeValue = n.nodeValue.replace(b[0], b[mode]);
  });
}
function highlight(k) {
  var r = r3.exec(k.nodeValue);
  if (r) {
    var nmark = document.createElement("MARK"),
        after = k.splitText(r.index);
    nmark.appendChild(document.createTextNode(r[0]));
    nmark.className = styl;
    after.nodeValue = after.nodeValue.substring(r[0].length);
    k.parentNode.insertBefore(nmark, after);
  }
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
function seek(z) {
  for (var j = 0; j < t9l; j++) {
    let reg = new RegExp(t9[j][0] + "s?$", "i"),
        mch = z.search(reg);
    if (-1 != mch) {
      return t9[j];
    }
  }
}
function change(n, m, b) {
  1 == n && (termp == terml - 1 ? termp = 1 : termp++);
  -1 == n && (5 == termp ? termp = terml - 1 : termp--);
  m.value = m.value.slice(0, b[0]) + "·" + term[termp] + m.value.slice(b[1]);
  selekt(m, b[0], b[0] + term[termp].length + 1);
}
function feminize(g) {
  let b = getCaret(g),
      c = getWord(g, b[1]),
      d = seek(c) || false;
  if (d && c.indexOf("·") == -1) {
    g.value = g.value.slice(0, b[0]) + "·" + d[termp] + g.value.slice(b[0]);
    selekt(g, b[0], b[0] + d[termp].length + 1);
    term = d;
    terml = term.length;
  }
}
function addMiddot(e,f) {
  if (f.value.indexOf("·") > -1) {
    var now = getCaret(f);
    f.value = f.value.replace("·","·");
    selekt(f, now[0] - 1, now[0] - 1);
  }
}
function switcher(e,h) {
  let a = e.keyCode,
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
      default:
		term = [];
		terml = undefined;
		termp = 1;
	}
  }  
}
