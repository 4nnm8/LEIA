"use strict";

function addEvent(a, b, c) {
  if (a.addEventListener) {
    return a.addEventListener(b, c, !1), !0;
  }
  if (a.attachEvent) {
    return a.attachEvent("on" + b, c);
  }
  b = "on" + b;
  "function" === typeof a[b] && (c = function(a, b) {
    return function() {
      a.apply(this, arguments);
      b.apply(this, arguments);
    };
  }(a[b], c));
  a[b] = c;
  return !0;
}
var mode,pred,high,styl,term,terml,termp=5,dl=dico.length,
    list = document.body.querySelectorAll("textarea,input"),
    ll = list.length,pm = [],pr = [],
    r3 = new RegExp("[·∙•][a-zÀ-ÖÙ-öù-üœŒ]+[·∙•]?(?!e$)([a-zÀ-ÖÙ-öù-üœŒ]+)?", "gi"),
    tree = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        if (!node.parentNode.nodeName.match(/SCRIPT|TEXTAREA|STYLE|INPUT/i) && node.nodeValue.trim().length > 0) {
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    }, false),
	dicomap = dico.map((entry)=>{
      return [
        new RegExp("([a-zÀ-ÖÙ-öù-üœŒ]+)?("+entry[0]+")[-/·∙.•]("+entry[1]+")[-/·∙.•]?(s)?(?![a-z])","gi"),
        entry[2],entry[3],entry[4]
      ];
    });
	
for (var i = 0; i < ll ; i++) {
  var thisone = list[i];
  if (thisone.type == "text" || thisone.type == "textarea") {
    pm.push(thisone);
	pr.push(thisone);
  }
  if (thisone.type == "search") {
	pm.push(thisone);
  }
}

browser.storage.local.get().then(function(a) {
  mode = a.leia.mode;
  pred = a.leia.pred;
  high = a.leia.high;
  styl = a.leia.styl;
  if (0 < mode) {
    for (; tree.nextNode();) {
      setTimeout((function(currentNode){
		check(currentNode);
	  }(tree.currentNode)), 0);
    }
  }
  1 == pred && predictif();
  if (1 == high) {
    while (tree.nextNode()) {
      highlight(tree.currentNode)
    }
  }
}, function(a) {
  console.error(a);
});

function check() {
  var a = tree.currentNode;
  dicomap.map(function(b) {
    a.nodeValue = a.nodeValue.replace(b[0], b[mode]);
  });
}

function highlight(h) {
  var r = r3.exec(h.nodeValue);
  if (r) {
	var fragm = document.createDocumentFragment(),
        nmark = document.createElement("MARK"),
        after = h.splitText(r.index);
    nmark.appendChild(document.createTextNode(r[0]));
    nmark.className = styl;
    after.nodeValue = after.nodeValue.substring(r[0].length);
    h.parentNode.insertBefore(nmark, after);
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

function seek(x) {
  for (var i = 0; i < dl; i++) {
	let reg = new RegExp(dico[i][0] + "s?$", "i"),
	    mch = x.search(reg);
	if (5 < dico[i].length && -1 != mch) {
	  return dico[i];
	}
  }
}

function change(n, m, b) {
  1 == n && (termp == terml - 1 ? termp = 5 : termp++);
  -1 == n && (5 == termp ? termp = terml - 1 : termp--);
  m.value = m.value.slice(0, b[0]) + "·" + term[termp] + m.value.slice(b[1]);
  selekt(m, b[0], b[0] + term[termp].length + 1);
}

pm.forEach(function(elem) {
    addEvent(elem, "keyup", function(e) {
      if (-1 < this.value.indexOf(";;")) {
        var now = getCaret(this);
        this.value = this.value.replace(";;","·");
        selekt(this, now[0] - 1, now[0] - 1);
      }
    });
});
	
function predictif() {
  pr.forEach(function(elem) {
    addEvent(elem, "keyup", function(e) {
      let b = getCaret(this),
          c = getWord(this, b[1]),
          d = seek(c) || false;
      if (d && c.indexOf("·") == -1) {
        this.value = this.value.slice(0, b[0]) + "·" + d[termp] + this.value.slice(b[0]);
        selekt(this, b[0], b[0] + d[termp].length + 1);
        term = d;
        terml = term.length;
      }
    });

    addEvent(elem, "keydown", function(e) {
      let a = e.which || e.keyCode || e.charCode,
          b = getCaret(this);
      if (term && b[0] != b[1]) {
        switch (a) {
          case 8: // Backspace
            e.preventDefault();
            this.value = this.value.slice(0, b[0] - 1) + this.value.slice(b[1]);
            selekt(this, b[0] - 1, b[0] - 1);
            break;
          case 37: // Left arrow
            e.preventDefault();
            this.value = this.value.slice(0, b[0]) + this.value.slice(b[1]);
            selekt(this, b[0] - 1, b[0] - 1);
            break;
          case 13: // Enter
            e.preventDefault();
            selekt(this, b[1], b[1]);
            break;
          case 40: // Down arrow
            e.preventDefault();
            change(1, this, b);
            break;
          case 38: // Up arrow
            e.preventDefault();
            change(-1, this, b);
            break;
            // Suppr  
            // case 46:
          default:
            term = [];
            terml = undefined;
            termp = 5;
        }
      }
    });
  });
}