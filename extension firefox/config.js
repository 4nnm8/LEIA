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
  stylipt.value = a.leia.styl;
  (1 == a.leia.high) ? (example.className = a.leia.styl, buttons.style.visibility = "visible") : buttons.style.visibility = "hidden";
}, function(a) {
  console.error(a);
});

function storeSettings() {
  var modeval = modeipt.options[modeipt.selectedIndex].value,
      predval = predipt.options[predipt.selectedIndex].value,
      highval = highipt.options[highipt.selectedIndex].value,
      stylval = stylipt.value;
  browser.storage.local.set({
    leia: {
	  mode: modeval,
      pred: predval,
      high: highval,
      styl: stylval
    }
  });
}

buttons.addEventListener("click", function(e) {
  e.preventDefault();
  if ("BUTTON" == e.target.tagName) {
	var newstyl = "emph"+e.target.name
    example.className = stylipt.value = newstyl;
	storeSettings();
  }
});

document.getElementById("form").addEventListener("change",function(e) { 
  switch (e.target.id) {
	case "mode":
	  0 !== modeipt.selectedIndex && (highipt.selectedIndex = "0", buttons.style.visibility = "hidden");
	  break;
	case "high":
      (1 == highipt.selectedIndex) ? (modeipt.selectedIndex = "0", buttons.style.visibility = "visible") : buttons.style.visibility = "hidden";
	  break;
  }
  storeSettings(); 
});