var bgcolor = "#ee0",
    color = "",
    fontWeight = "bold";
			
function highlight(node) {
  if(/^(?:MARK|SCRIPT|STYLE|FORM)$/.test(node.nodeName)) return;
	if(node.hasChildNodes()) {
		for(var i = 0 ; i < node.childNodes.length ; i++) {
			this.highlight(node.childNodes[i]);
		}
	}
	if(node.nodeType == 3) {
		if((nv = node.nodeValue) && (regs = /([·∙•][a-zàâäéèêëïîôöùûüçæœñ]+([·∙•][a-zàâäéèêëïîôöùûüçæœñ]+)?)/gi.exec(nv))) {
			var match = document.createElement("MARK");
			match.appendChild(document.createTextNode(regs[0]));
			(bgcolor) ? match.style.backgroundColor = bgcolor : match.style.backgroundColor = 'transparent';
			(color) ? match.style.color = color : match.style.color = '';
			match.style.fontWeight = fontWeight;
			var after = node.splitText(regs.index);
			after.nodeValue = after.nodeValue.substring(regs[0].length);
			node.parentNode.insertBefore(match, after);
		}
	}
}
