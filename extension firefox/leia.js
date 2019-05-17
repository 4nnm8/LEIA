/** LÉIA - Copyright 2018-2019 Ann Mezurat
LÉIA est un donationware sous licence Apache Version 2.0. 
Vous êtes libre de modifier et de distribuer ce code sous 
toute forme (libre, propriétaire, gratuite ou commerciale)
à condition de conserver le copyright et le texte de 
licence lors de toute modification ou distribution.
http://www.apache.org/licenses/LICENSE-2.0

Faites un don :) https://bit.ly/2vuzK7g
**/
console.log('LEIA launched')
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
var mode,pred,high,txtColor,bgColor,txtDeco,fontWeight,term,terml,termp=5,dl=dico.length,
    r3 = new RegExp("[·∙•][a-zÀ-ÖÙ-öù-üœŒ]+[·∙•]?(?!e$)([a-zÀ-ÖÙ-öù-üœŒ]+)?", "gi"),
    tree = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
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
	mode = Number(stored.leia.mode);
	pred = stored.leia.pred; 
	high = stored.leia.high;
	styl = stored.leia.styl;
	console.log('init ok and mode = '+mode+', pred = '+pred+', high = '+high+', styl = '+styl)
	skim();
	if (pred == 1) { predictif(); };
}
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(init, onError);

function highlight(node) {
  var r = r3.exec(node.nodeValue);
  if (r) {
    var nmark = document.createElement("MARK"),
        after = node.splitText(r.index);
    nmark.appendChild(document.createTextNode(r[0]));
    nmark.className = styl;
    after.nodeValue = after.nodeValue.substring(r[0].length);
    node.parentNode.insertBefore(nmark, after);
  }
}

function skim(){
console.time("SKIM");
	if (mode == 0) {
		if  (high == 1) {
			while (tree.nextNode()) {
				highlight(tree.currentNode)	
			}
		}
	} else if (mode >= 1 && mode <= 3) {
		while (tree.nextNode()) {
			for (var i = 0; i < dl; i++) {
				var r1 = new RegExp("([a-zÀ-ÖÙ-öù-üœŒ]+)?(" + dico[i][0] + ")[-/·∙.•](" + dico[i][1] + ")[-/·∙.•]?(s)?(?![a-z])", "gi");
				tree.currentNode.nodeValue = tree.currentNode.nodeValue.replace(r1, dico[i][mode+1]);
			}
		}
	} else if (mode == 4) {
		while (tree.nextNode()) {
			for (var i = 0; i < dl; i++) {
				var r1 = new RegExp("([a-zÀ-ÖÙ-öù-üœŒ]+)?(" + dico[i][0] + ")[-/·∙.•](" + dico[i][1] + ")[-/·∙.•]?(s)?(?![a-z])", "gi");
				tree.currentNode.nodeValue = tree.currentNode.nodeValue.replace(r1, dico[i][2] + ' ' + dico[i][1])
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
	if (dico[i].length > 5 && mch != -1) {
	  return dico[i];
	}
  }
}

function change(n, m, b) {
  if (n == 1) {
	if (termp == terml - 1) {
	  termp = 5;
	} else {
	  termp++;
	}
  }
  if (n == -1) {
	if (termp == 5) {
      termp = terml - 1
	} else {
	  termp--;
	}
  }
  m.value = m.value.slice(0, b[0]) + '·' + term[termp] + m.value.slice(b[1]);
  selekt(m, b[0], b[0] + term[termp].length + 1);
}

document.body.querySelectorAll('textarea,input[type=text],input[type=search]').forEach(function(elem) {
    addEvent(elem, 'keyup', function(e) {
      if (this.value.indexOf(';;') > -1) {
        var now = getCaret(this);
        this.value = this.value.replace(';;', '·');
        selekt(this, now[0] - 1, now[0] - 1);
      }
    });
});
	
function predictif() {
  document.body.querySelectorAll('textarea,input[type=text]').forEach(function(elem) {
    addEvent(elem, 'keyup', function(e) {
      let b = getCaret(this),
          c = getWord(this, b[1]),
          d = seek(c) || false;
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