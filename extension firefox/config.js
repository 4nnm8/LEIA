var $ = function(a) {
	var b = [];

	function Reach(elements) {
		if (typeof a == "string") {
			b.length = elements.length;
			for (var i = 0; i < b.length; i++) {
				b[i] = elements[i];
			}
		} else {
			b.push(elements);
		}
	}
	Reach.prototype.css = function(prop, val) {
		for (var i = 0; i < b.length; i++) {
			b[i].style[prop] = val;
		}
	};
	Reach.prototype.setIndex = function(idx) {
		b[0].selectedIndex = idx;
	};
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
function $$(id) {
  var n = id.replace("#","")
  return document.getElementById(n)
};

function storeSettings() {
  var modeval = $$("mode").options[$$("mode").selectedIndex].value,
      predval = $$("pred").options[$$("pred").selectedIndex].value,
      highval = $$("high").options[$$("high").selectedIndex].value,
      stylval = $$("#ex").className;

  browser.storage.local.set({
    leia: {
	  mode: modeval,
      pred: predval,
      high: highval,
      styl: stylval
    }
  });
}

function updateUI(stored) {
  $("#mode").setIndex(stored.leia.mode);
  $("#pred").setIndex(stored.leia.pred); 
  $("#high").setIndex(stored.leia.high);
  $$("#ex").className = stored.leia.styl;
}
function onError(e) {
  console.error(e);
}

$("#mode").on("change", function(e) {
	if (this.selectedIndex !== 0) {
		$("#high").setIndex("0");
		$$("#ex").className = '';
	}
});

$("#high").on("change", function(e) {
	if (this.selectedIndex == 1) $("#mode").setIndex("0");
});

function styling(prop){
  $$("#ex").className = "emph"+prop.name;
  storeSettings();
}
$(".leiahl").on("click", function(e) { e.preventDefault();styling(this); });
$("form").on("change", function(e) { storeSettings(); });

var gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);