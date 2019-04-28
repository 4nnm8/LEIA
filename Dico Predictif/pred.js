t9 = [
    ['frais', 'che', 'aîche'], // ok
    ['chien|rouan|((pay|valai|vevey)san)', 'ne'], //NNE
    ['(cadu|laï|publi|micma|syndi|tur|gre)c', 'que'], //CQUE
    ['blanc|franc', 'he'], //CHE
    ['sec', 'èche'],
    ['ambassadeur', 'drice', 'rice', 'ice'],
    ['larron|abbé|âne|bêta|épais|gras|gros|prêtre|bonze|bougre|centaure|chanoine|comte|maître|contremaître|diable|drôle|druide|faune|gonze|hôte|ivrogne|maire|maître|monstre|mulâtre|nègre|notaire|ogre|patronne|pauvre|poète|preste|prêtre|prince|prophète|sauvage|suisse|tigre|traître|vicomte', 'esse', 'sse'], // ok
    // +LE
    ['trol|nul|pareil|vermeil|vieil|accidentel|actuel|additionnel|annuel|artificiel|bel|bimensuel|conditionnel|criminel|cruel|industriel|nouvel|officiel|réel|sexuel', 'le'],
    ['pareil|vermeil|((gradu|désinenti|ponctu|compulsionn|circonstanci|sacrifici|compassionn|optionn|sensori|potenti|manu|asexu|inessenti|casu)el)', 'le'],
    ['(fin|pasc|univers|département)aux', 'ales'],
    ['(damois|cham|jum|puc|tourang|tourter|jouvenc|maquer|ois|nouv|bourr|gém|pastour|agn|b)eau', 'elle'],
    ['tiers', 'ce'],
    ['doux', 'ouce', 'ce'], // ok
    ['andalou|époux|jaloux', 'ouse', 'se'], // ok
    ['roux', 'ousse', 'sse'], // ok
    ['[f|m]ou|foufou', 'olle'], // ok
    ['faux', 'ausse'], // ok
    ['las|bas', 'se'],
    ['chat|rat|favori|dissous|absous', 'te'], // ?
    ['docteur', 'oresse'], // ok
    ['hébreu', 'aïque'], // ok
    ['devin', 'eresse'],
    ['grec', 'que'],
    ['favori', 'te'],
    // EUSE >
    ['(sculpt|transmett|accrédit|sécrét|enquêt|débit)eur', 'euse', 'trice', 'ice'], // euse ou ice
    ['défendeur', 'euse', 'seuse', 'eresse'], // euse ou seuse ou eresse
    ['(rapport|gouvern)eur', 'euse'], // euse
    ['(b[âa]ill|chass|command|demand|vend|défend|demand|devin|enchant|p[éèê]ch|veng)eur', 'euse', 'eresse'],
    ['vieux', 'ieille'], //ok
    ['copain', 'ine'], //ok
    ['[vn]euf', 'euve', 've'], // ok ?
    ['bref', 'ève'], // ok ?
    ['compagnon', 'agne'], // ok
    ['fier|cher','ère'],
    // ON - ONNE 
    ['([bc]|aigl|sax|bar|berrich|bis|b|bouff|bourguign|bret|brouill|b[uû]cher|buffl|champi|coch|compagn|couill|cret|dar|drag|espi|fanfar|fél|folich|forger|frip|maç|lett|garç|gasc|glout|grogn|hériss|hur|laider|lap|lett|li|tatill|teut|champi|vigner|wall|lur|maç|maigrich|nipp|ours|pâlich|phara|piét|pige|pi|pochetr|pochtr|poliss|poltr|rejet|ronch|sauvage|sax|beaucer|bess|bich|boug|brabanç|charr|enfanç|fransquill|godich|hesbign|marmit|nazill|négrill|noblaill|patr|percher|pa|levr|louch|maquign|marr|mat|slav|so[uû]l|mign|mist|mollass|tâcher|tardill)on', 'ne'],
    // OT - OTTE
    ['(bosc|jeun|vieill|s)ot', 'te'],
    // EN - ENNE
    ['(chatouill|terr|fauch|querell|rebout|gue|cr|cornemus|harengu|lamin|mercur|pr|séléni)eux', 'euse'], // EUR - EUSE
	['([a-zàâäéèêëïîôöùûüç]+[st]if)|naïf|juif|vif|réflexif', 'ive', 've'], // ok
    ['sauf', 'auve', 've'], // ok 
    ['(ob)?long', 'ue'], // ok
    ['bénin|malin', 'igne'],
    ['(ai|ambi|bé|conti|exi|surai|subai)gu', 'ë'], // ok
    ['(bis|quadris|tris)?aïeux', 'ieule'],
    ['i?ceux', 'elles'],
    ['(compl|concr|désu|discr|incompl|indiscr|inqui|préf|repl|secr|qui)et', 'ète'],
    ['filou|loulou', 'te', 'tte']	
];

var pt = t9.length,
    term,
    terml,
    termp = 1;

function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
        return true;
    } else if (obj.attachEvent) {
        return obj.attachEvent('on' + evt, fn);
    } else {
        evt = 'on' + evt;
        if (typeof obj[evt] === 'function') {
            fn = (function(f1, f2) {
                return function() {
                    f1.apply(this, arguments);
                    f2.apply(this, arguments);
                }
            })(obj[evt], fn);
        }
        obj[evt] = fn;
        return true;
    }
    return false;
}

function getCaret(x) {
    if (document.selection) {
        x.focus();
        var r = document.selection.createRange(),
            rs = r.text.length;
        r.moveStart('character', -x.value.length);
        var start = r.text.length - rs;
        return [start, start + rs];
    } else if (x.selectionStart || x.selectionStart == '0') {
        return [x.selectionStart, x.selectionEnd];
    } else {
        return [0, 0]
    }
}

function selekt(elem, start, end) {
    if (elem.setSelectionRange) {
        elem.focus();
        elem.setSelectionRange(start, end);
    } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
    }
}

function getWord(text, caretPos) {
    var iOf = text.value.indexOf(caretPos),
        txt = text.value.substring(0, caretPos);
    if (txt.indexOf(" ") > 0) {
        var wrd = txt.split(" ");
        return wrd[wrd.length - 1];
    } else {
        return txt;
    }
}

function seek(x) {
    for (var i = 0; i < pt; i++) {
        let reg = new RegExp(t9[i][0] + 's?$', 'i'),
            mch = x.search(reg)
        if (mch != -1) {
            return t9[i]
        }
    }
}

function change(n, m, b) {
    console.log('change called')
    if (n == 1) {
        if (termp == terml - 1) {
            termp = 1
        } else {
            termp++
        }
    }
    if (n == -1) {
        if (termp == 1) {
            termp = term.length - 1
        } else {
            termp--
        }
    }
    m.value = m.value.slice(0, b[0]) + '·' + term[termp] + m.value.slice(b[1])
    selekt(m, b[0], b[0] + term[termp].length + 1);
}

document.body.querySelectorAll('textarea,input[type=text],[contenteditable=true]').forEach(function(elem) {
    addEvent(elem, 'keyup', function(e) {
        if (this.value.indexOf(';;') > -1) {
            var now = getCaret(this);
            this.value = this.value.replace(';;', '·');
            selekt(this, now[0] - 1, now[0] - 1)
        }
        let b = getCaret(this),
            c = getWord(this, b[1]),
            d = seek(c) || false;
        if (seek(c) && c.indexOf('·') == -1) {
            this.value = this.value.slice(0, b[0]) + '·' + d[termp] + this.value.slice(b[0])
            selekt(this, b[0], b[0] + d[termp].length + 1);
            term = seek(c);
            terml = term.length;
        }
    })

    addEvent(elem, 'keydown', function(e) {
        let a = e.which || e.keyCode || e.charCode,
            b = getCaret(this);
        if (term && b[0] != b[1]) {
            switch (a) {
                // Suppr
                case 8:
                    e.preventDefault();
                    this.value = this.value.slice(0, b[0] - 1) + this.value.slice(b[1]);
                    selekt(this, b[0] - 1, b[0] - 1);
                    break;
                    // Left arrow
                case 37:
                    e.preventDefault();
                    this.value = this.value.slice(0, b[0]) + this.value.slice(b[1]);
                    selekt(this, b[0] - 1, b[0] - 1);
                    break;
                    // Enter
                case 13:
                    e.preventDefault();
                    selekt(this, b[1], b[1]);
                    break;
                    // Down arrow
                case 40:
                    e.preventDefault();
                    change(1, this, b);
                    break;
                    // Up arrow
                case 38:
                    e.preventDefault();
                    change(-1, this, b);
                    break;

                default:
                    term = terml = termp = 1;
            }
        }
    });
});