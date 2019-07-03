var modeipt = document.getElementById("mode"),
    predipt = document.getElementById("pred"),
    highipt = document.getElementById("high"),
    stylipt = document.getElementById("styl"),
    example = document.getElementById("ex"),
    buttons = document.getElementById("buttons"),
    bradios = document.getElementsByName("emph-styles");

browser.storage.local.get().then(function(a) {
  modeipt.selectedIndex = a.leia.mode;
  predipt.selectedIndex = a.leia.pred;
  highipt.selectedIndex = a.leia.high;
  stylipt.value = a.leia.styl;
  1 == a.leia.high ? (example.className = a.leia.styl, buttons.style.display = "block") : buttons.style.display = "none";
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

document.getElementById("form").addEventListener("change", function(e) {
  e.preventDefault();
  for (var i = 0; i < bradios.length; i++) {
    bradios[i].checked && (
	  example.className = bradios[i].id,
	  stylipt.value = bradios[i].id
    );
  }
  switch (e.target.id) {
    case "mode":
      0 !== modeipt.selectedIndex && (highipt.selectedIndex = "0", buttons.style.display = "none");
    break;
    case "high":
     (1 == highipt.selectedIndex) ? (modeipt.selectedIndex = "0", buttons.style.display = "block", document.getElementById("emph1").focus()) : buttons.style.display = "none";
    break;
  }
  storeSettings(); 
},false);
