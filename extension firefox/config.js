function listen(a, b, c) {
  if (a.addEventListener) {
    a.addEventListener(b, c, false);
  } else if (a.attachEvent) {
    return a.attachEvent("on" + b, c);
  } else {
    b = "on" + b;
    if ("function" === typeof a[b]) {
      c = (function(f1, f2) {
        return function() {
          f1.apply(this, arguments);
          f2.apply(this, arguments);
        }
      })(a[b], c);
    }
    a[b] = c;
  }
}
var modeipt = document.getElementById("mode"),
    predipt = document.getElementById("pred"),
	highipt = document.getElementById("high"),
	stylipt = document.getElementById("styl"),
	example = document.getElementById("ex"),
	buttons = document.getElementById("buttons");

browser.storage.local.get().then(function(a) {
  modeipt.selectedIndex = a.leia.mode;
  predipt.selectedIndex = a.leia.pred;
  highipt.selectedIndex = a.leia.high;
  example.className = a.leia.styl;
  if (1 == a.leia.high) {
	buttons.style.visibility = "visible";
  } else {
	buttons.style.visibility = "hidden";
  }
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
listen(buttons,"click",function(e) {
  e.preventDefault();
  if (e.target.tagName == "BUTTON") {
    example.className = "emph"+e.target.name;
	storeSettings();
  }
});	
listen(document.getElementById("form"),"change",function(e) { 
  var a = e.target.id;
  switch (a) {
	case "mode":
	  0 !== modeipt.selectedIndex && (highipt.selectedIndex = "0", example.className = "", buttons.style.visibility = "hidden");
	  break;
	case "high":
      (1 == highipt.selectedIndex) ? (modeipt.selectedIndex = "0", buttons.style.visibility = "visible") : buttons.style.visibility = "hidden";
	  break;
  }
  storeSettings(); 
});