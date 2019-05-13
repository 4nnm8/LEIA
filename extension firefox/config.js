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
function $(id) {
  return document.getElementById(id);
}
function storeSettings() {
  var modeval = $("mode").options[$("mode").selectedIndex].value,
      predval = $("pred").options[$("pred").selectedIndex].value,
      highval = $("high").options[$("high").selectedIndex].value,
      bgcolorval = $("bgColor").value,
      txtcolorval = $("txtColor").value,
      fontweightval = ($("fontWeight").checked == true) ? 'bold' : 'normal',
      txtdecoval = ($("txtDeco").checked == true) ? 'underline' : 'none';

  browser.storage.local.set({
    leia: {
	  mode: modeval,
      pred: predval,
      high: highval,
      bgColor: bgcolorval,
      txtColor: txtcolorval,
      fontWeight: fontweightval,
      txtDeco: txtdecoval
    }
  });
}
function updateUI(stored) {
  $("mode").selectedIndex = stored.leia.mode;
  $("pred").selectedIndex = stored.leia.pred; 
  $("high").selectedIndex = stored.leia.high;
  $("txtColor").value = stored.leia.txtColor;
  $("bgColor").value = stored.leia.bgColor;
  $("ex").style.textDecoration = stored.leia.txtDeco;
  $("ex").style.fontWeight = stored.leia.fontWeight;
  $("ex").style.backgroundColor = stored.leia.bgColor;
  $("ex").style.color = stored.leia.txtColor;
  (stored.leia.fontWeight == "bold" ) ? $("fontWeight").checked = true : $("fontWeight").checked = false; 
  (stored.leia.txtDeco == "underline" ) ? $("txtDeco").checked = true : $("txtDeco").checked = false;
}
function onError(e) {
  console.error(e);
}
addEvent($("mode"), "change", function(e) {
	if (this.selectedIndex !== 0) {
	  $("high").selectedIndex = 0;
	}
});
addEvent($("high"), "change", function(e) {
	if (this.selectedIndex == 1) {
	  $("mode").selectedIndex = 0;
	}
});
addEvent($("bgColor"), "change", function(e) {
	$("ex").style.backgroundColor = this.value;
});
addEvent($("txtColor"), "change", function(e) {
	$("ex").style.color = this.value;
});
addEvent($("fontWeight"), "change", function(e) {
	(this.checked == true) ? $("ex").style.fontWeight = "bold" : $("ex").style.fontWeight = "normal";
});
addEvent($("txtDeco"), "change", function(e) {
	(this.checked == true) ? $("ex").style.textDecoration = "underline" : $("ex").style.textDecoration = "none";
});
addEvent($("form"), "change", function(e) {
  storeSettings();
});
var gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);