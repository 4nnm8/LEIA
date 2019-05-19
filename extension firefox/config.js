var $ = function(a) {
	var b = [];

	function Reach(e) {
		if ("string" == typeof a) {
			b.length = e.length;
			for (var i = 0 ; i < b.length; i++) {
				b[i] = e[i];
			}
		} else {
			b.push(e);
		}
	}
	Reach.prototype.on = function(evt, fn) {
		for (var i = 0; i < b.length; i++) {
			if (b[i].addEventListener) {
				b[i].addEventListener(evt, fn, false);
			} else if (b[i].attachEvent) {
				b[i].attachEvent('on' + evt, fn);
			} else {
				return false;
			}
		}
	};
	return (typeof a == "string") ? new Reach(document.querySelectorAll(a)) : new Reach(a);
    };

var modeipt = document.getElementById("mode"),
    predipt = document.getElementById("pred"),
	highipt = document.getElementById("high"),
	stylipt = document.getElementById("styl"),
	example = document.getElementById("ex");
	
browser.storage.local.get().then(function(a) {
  modeipt.selectedIndex = a.leia.mode;
  predipt.selectedIndex = a.leia.pred;
  highipt.selectedIndex = a.leia.high;
  example.className = a.leia.styl;
}, function(a) {
  console.error(a);
});

function storeSettings() {
  var modeval = modeipt.options[modeipt.selectedIndex].value,
      predval = predipt.options[predipt.selectedIndex].value,
      highval = highipt.options[highipt.selectedIndex].value,
      stylval = example.className;
  browser.storage.local.set({
    leia: {
	  mode: modeval,
      pred: predval,
      high: highval,
      styl: stylval
    }
  });
}

$("#mode").on("change", function(e) {
	0 !== this.selectedIndex && (highipt.selectedIndex = "0", example.className = '');
});

$("#high").on("change", function(e) {
	1 == this.selectedIndex && (modeipt.selectedIndex = "0");
});

$(".leiahl").on("click", function(e) {
  e.preventDefault();
  example.className = "emph"+this.name;
  storeSettings();
});
$("form").on("change", function(e) { storeSettings(); });