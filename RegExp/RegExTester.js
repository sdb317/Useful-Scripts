
function getTargetElement(evt) {
    return (evt.target) ? ((evt.target.nodeType == 3) ? evt.target.parentNode : evt.target) : evt.srcElement;
}

String.prototype.trim = function () {
    return this.replace(/^\s*|\s*$/g, "");
}

function toolbarEvent(evt) {
    evt = (evt) ? evt : ((window.event) ? window.event : "")

    if (evt) {
        var elem = getTargetElement(evt);
        if (evt.type == "click") {

            if (elem.id == "bkh") {
                if (n == 1) {
                    elem.className = "tbno";
                }
                backhistory();
            }
            else if (elem.id == "fwh") {
                if (n == hsreg.length - 1) {
                    elem.className = "tbno";
                }
                forwordhistory();
            }

        }
        else if (evt.type == "mouseover") {
            if (elem.className == "tbnm") {
                elem.className = "tbhv";
            }
        }
        else if (evt.type == "mouseout") {
            if (elem.className == "tbhv") {
                elem.className = "tbnm";
            }
        }
    }
}

var hsreg = new Array;
var hsflg = new Array;
var hstring = new Array;
var hsact = new Array;
var hsreptxt = new Array;
var hsregex = new Array;
var hsjsex = new Array;
var hstype = new Array;
var hsresult = new Array;
var hslastindex = new Array;
var hsource = new Array;

var n = null;

function addhistory() {
    var i = hsreg.length;
    hsreg[i] = $("regex").value.replace(/\s+$/, "");
    hsflg[i] = $("flags").value;
    hstring[i] = $("scrstr").value;
    hsact[i] = $("select").value;
    hsregex[i] = $("vis").innerHTML;
    hsjsex[i] = $("expression").innerHTML;
    hstype[i] = $("returntype").innerHTML;
    hsresult[i] = $("matchresult").innerHTML;
    hslastindex[i] = $("lastindex").innerHTML;
    hsource[i] = $("group").value;

    if (document.getElementById("intxt")) {
        hsreptxt[i] = $("intxt").value;
    }

    var tst = hsreg[0];
    n = i;
    if (n > 0) {
        // document.getElementById("bkh").className = "tbnm";
    }
}

function replacetext() {
    if (hsreptxt[n] == undefined) {
        removeElement()
    }
    else {
        createInput();
        document.getElementById("intxt").value = hsreptxt[n];
    }

}

function backhistory() {
    if (n == null) return;
    if (n == 0) {
        n = 0;
    } else {
        n = n - 1;
    }

    replacetext();
    $("regex").value = hsreg[n];
    $("flags").value = hsflg[n];
    $("scrstr").value = hstring[n];
    $("select").value = hsact[n];
    $("vis").innerHTML = hsregex[n];
    $("expression").innerHTML = hsjsex[n];
    $("returntype").innerHTML = hstype[n];
    $("matchresult").innerHTML = hsresult[n];
    $("lastindex").innerHTML = hslastindex[n];
    $("group").innerHTML = hsource[n];

    if (n < hsreg.length - 1) {
        $("fwh").className = "tbnm";
    }

}

function forwordhistory() {
    if (n < hsreg.length - 1) {

        $("regex").value = hsreg[n + 1];
        $("flags").value = hsflg[n + 1];
        $("scrstr").value = hstring[n + 1];
        $("select").value = hsact[n + 1];
        $("vis").innerHTML = hsregex[n + 1];
        $("expression").innerHTML = hsjsex[n + 1];
        $("returntype").innerHTML = hstype[n + 1];
        $("matchresult").innerHTML = hsresult[n + 1];
        $("lastindex").innerHTML = hslastindex[n + 1];
        $("group").innerHTML = hsource[n + 1];
        $("bkh").className = "tbnm";
        n = n + 1;
        replacetext();

    }

    if (n == hsreg.length - 1) {
        $("fwh").className = "tbno";

    }
}

function clear() {
    $("regex").value = "";
    $("flags").value = "g";
    $("scrstr").value = "";
    $("select").value = "";
    clearhf();

}

function clearhf() {
    $("alertfg").innerHTML = "";
    $("vis").innerHTML = "";
    $("expression").innerHTML = "";
    $("returntype").innerHTML = "";
    $("matchresult").innerHTML = "";
    $("lastindex").innerHTML = "";
    $("group").innerHTML = "";
}

function removeElement() {
    if ($("intxt")) {
        var d = $("intxt");
        d.parentNode.removeChild(d);
    }
}

function createInput() {
    if ($("intxt")) return;
    var temp = document.createElement("input");
    temp.type = "text";
    temp.value = "";
    temp.id = "intxt";
    temp.size = 10;
    $("rplctxt").appendChild(temp);
}

function geturlpara() {
    if (location.href) { var url = location.href; } else return;
    var url = decodeURIComponent(url);
    var reg = new RegExp("rp=(.+)\&rf=(.*)\&me=([0-6])\&ts=(.+)", "");
    var mypa = reg.exec(url);
    if (mypa != null) {

        $("regex").value = mypa[1].replace(/amp\;/g, "").replace(/\&lt\;/g, "<").replace(/\&gt\;/g, ">");
        $("flags").value = mypa[2];
        $("select").value = mypa[3];
        $("scrstr").value = mypa[4].replace(/amp;/g, "").replace(/\&lt\;/g, "<").replace(/\&gt\;/g, ">");
    }
}

function buildlink() {
    var url0 = 'http://www.pagecolumn.com/tool/regtest.htm';
    var rp = $("regex").value.replace(/\s+$/, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var rf = $("flags").value;
    var me = $("select").value;
    var ts = $("scrstr").value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    url = url0 + '?rp=' + encodeURIComponent(rp) + '&rf=' + encodeURIComponent(rf) + '&me=' + encodeURIComponent(me) + '&ts=' + encodeURIComponent(ts);
    $("link").innerHTML = url;
}


function jsmakeup() {
    var syn = ["var", "new", "return", "this", "functoin", "do", "null", "while", "if"];
    var codeblock = $("expression");

    var str = codeblock.innerHTML;
    for (j = 0; j < syn.length; j++) {
        var re = new RegExp("(" + syn[j] + ")", "g");
        str = str.replace(re, '<span style="color:#6699cc">$1</span>')
    }

    codeblock.innerHTML = str.replace(/\n/g, "</br>");
    codeblock.style.paddingLeft = "30px";

}

function check() {

    var vflag = $("flags").value.toLowerCase();

    if (vflag.search(/[^g|i|m]/g) != -1) {
        $("alertfg").innerHTML = ("Flags can only contain g, i, m");
        return;
    }

    $("alertfg").innerHTML = "";
    var vregex = ($("trim").checked == true) ? $("regex").value.trim() : $("regex").value;

    try {
        var re = new RegExp(vregex, vflag);
        var re0 = re;
    }

    catch (e) {

        if (e) {
            clearhf();
            $("vis").innerHTML = '<br>' + 'new RegExp("' + vregex + '", "' + vflag + '") returned a ' + e
            $("vis").style.color = "#ff0000";
            return
        }

    }

    $("vis").style.color = "#000";

    var myArray;

    var vregext = vregex.hash();

    ex = 'new RegExp("' + vregext + '", "' + vflag + '");';

    var method = $("select").value;

    var srcstring = $("scrstr").value;
    var vr = 'var';
    var e0, e1, e2, e3, e4, e5;
    var srcstringt;
    var e7 = 'if ( myArray != null) {';
    var e8 = 'for ( i = 0; i < myArray.length; i++ )   { ';
    var e9 = vr + ' result = "myArray[" + i + "] = " + myArray[i];';

    srcstringt = srcstring.hash();

    e0 = '<h4>Using RegExp object:</h4>';
    e1 = vr + ' str = "' + srcstringt + '";';
    e2 = vr + ' re = ' + ex;
    e4 = '<h4>Using literal:</h4>';

    crr = srcstring.match(re);
    var output0 = srcstring;

    if (crr != null) {

        var output = srcstring.replace(re, function ($0) {
            return '<span class ="cssb0">' + $0.hash() + '</span>';
        });

        var output = '<h4>match</h4>' + output;
    }

    else {
        output = "no match";

    }

    $("istextarea").parentNode.style.display = "none";

    switch (method) {

        case '0':
            removeElement();
            myArray = re.exec(srcstring);
            e3 = vr + ' myArray = re.exec(str);';
            ex = e1 + "<br>" + e2 + "<br>" + e3 + "<br>" + "<br>" + e7 + "<br>" + e8 + "<br>" + e9 + "<br>" + '}' + "<br>" + '}' + "<br>";

            var vf = vflag.replace(/g/, "")
            var reec = new RegExp(vregex, vf);
            output0 = srcstring;
            var cvv = reec.exec(output0);

            if (cvv != null) {
                var output0 = output0.replace(cvv[0], function ($0) {
                    return '<span class ="cssb0">' + $0.hash() + '</span>';
                });
                output = output + '<br> <h4>exec</h4>' + output0;

            }

            if ((cvv != null) && (cvv.length > 1)) {
                output0 = srcstring;
                outexec2 = output0.cssit(1, cvv);
                output = output + '<br> <h4>exec group</h4>' + outexec2;
            }

            break;

        case '1':
            removeElement();
            myArray = re.test(srcstring);
            e3 = vr + ' myArray = re.test(str);';
            ex = e1 + "<br>" + e2 + "<br>" + e3 + "<br>";

            break;

        case '2':
            removeElement();
            var myArray = srcstring.match(re);
            e3 = vr + ' myArray = str.match(re);';
            e5 = vr + ' myArray = str.match(' + re0.toString().hash() + ')';
            ex = e0 + e1 + "<br>" + e2 + "<br>" + e3 + "<br>" + e4 + e5 + "<br>" + "<br>" + e7 + "<br>" + e8 + "<br>" + e9 + "<br>" + '}' + "<br>" + '}' + "<br>";

            break;

        case '3':
            removeElement();
            myArray = srcstring.search(re);
            e3 = vr + ' myArray = str.search(re);';
            e5 = vr + ' myArray = str.search(' + re.toString().hash() + ')';
            ex = e0 + e1 + "<br>" + e2 + "<br>" + e3 + "<br>" + e4 + e5;

            break;

        case '4':

            createInput();
            $("istextarea").parentNode.style.display = "block";
            if ($("intxt")) {
                var retxt = $("intxt").value;
                myArray = srcstring.replace(re, retxt);

                var et = '<span class="js1">"' + retxt.hash() + '"</span>';
                e3 = vr + ' myArray = str.replace(re,' + et + ' );';
                e5 = vr + ' myArray = str.replace(' + re.toString().hash() + ',' + et + ')';
                ex = e0 + e1 + "<br>" + e2 + "<br>" + e3 + "<br>" + e4 + e5;

                if (myArray != null) {
                    if ($("istextarea").checked) {
                        myArray = myArray.replace(/\&lt;/g, "&amp;lt;").replace(/\&gt;/g, "&amp;gt;");
                        myArray = myArray.replace(/\\n/g, "\n");
                        myArray = myArray.hash();

                    }
                    var outreplace = $("istextarea").checked ? "<textarea class='rplstextarea'>" + myArray + "</textarea>" : output0.replace(re, '<span class ="cssb0">' + retxt.hash() + '</span>');

                }
                output = output + '<br> <h4>replace</h4>' + outreplace;
            }

            break;

        case '5':
            removeElement();
            myArray = srcstring.split(re);
            e3 = vr + ' myArray = str.split(re);';
            e5 = vr + ' myArray = str.split(' + re.toString().hash() + ')';
            ex = e0 + e1 + "<br>" + e2 + "<br>" + e3 + "<br>" + e4 + e5 + "<br>" + "<br>" + e7 + "<br>" + e8 + "<br>" + e9 + "<br>" + '}' + "<br>" + '}' + "<br>";

            output0 = srcstring;
            crr = srcstring.match(re);

            if (crr != null) {
                var vb = [];
                var j = 0;
                var outsplit = "";

                for (i = 0; i < crr.length; i++) {
                    var inm = output0.indexOf(crr[i]);
                    if (inm == 0) {
                        output0 = output0.substr(crr[i].length, output0.length - crr[i].length);
                        outsplit = outsplit + crr[i].hash();
                    }
                    else {
                        vb[j] = output0.substr(0, inm);
                        outsplit = outsplit + '<span class ="cssb0">' + vb[j].hash() + '</span>' + crr[i].hash();
                        output0 = output0.substr(vb[j].length + crr[i].length, output0.length - vb[j].length - crr[i].length);
                        j = j + 1;
                    }
                }

                if (output0.length > 0) {
                    vb[j] = output0;
                    outsplit = outsplit + '<span class ="cssb0">' + vb[j].hash() + '</span>';
                }

                output = output + '<br> <h4>split</h4>' + outsplit;
            }

            break;
        case '6':

            removeElement();
            myArray = srcstring.$1elements(vregex);

            if (myArray != null) {
                output0 = srcstring;
                out$1 = output0.cssit(0, myArray);
                output = output + '<br> <h4>$1 elements</h4>' + out$1;
            }
            break;

    }

    var grp;

    if (RegExp.$1) grp = 'RegExp.$1 = ' + RegExp.$1.hash() + '<br>';
    if (RegExp.$2) grp += 'RegExp.$2 = ' + RegExp.$2.hash() + '<br>';
    if (RegExp.$3) grp += 'RegExp.$3 = ' + RegExp.$3.hash() + '<br>';
    if (RegExp.$4) grp += 'RegExp.$4 = ' + RegExp.$4.hash() + '<br>';
    if (RegExp.$5) grp += 'RegExp.$5 = ' + RegExp.$5.hash() + '<br>';
    if (RegExp.$6) grp += 'RegExp.$6 = ' + RegExp.$6.hash() + '<br>';
    if (RegExp.$7) grp += 'RegExp.$7 = ' + RegExp.$7.hash() + '<br>';
    if (RegExp.$8) grp += 'RegExp.$8 = ' + RegExp.$8.hash() + '<br>';
    if (RegExp.$9) grp += 'RegExp.$9 = ' + RegExp.$9.hash() + '<br>';

    if (grp) {

        $("group").innerHTML = '<h4>Using RegExp property:</h4>' + grp + '<h4>Using exec method:</h4>' + 'See the returns using <strong>exec</strong> method. The number of possible parenthesized substrings is unlimited.';
    } else { $("group").innerHTML = 'no parenthesized substring matched'; }
    var result = '';

    $("expression").innerHTML = ex;
    jsmakeup();
    $("returntype").innerHTML = '<h4>Type</h4>' + typeof (myArray);

    if (myArray != null && typeof (myArray) == 'object' && myArray.length != null) {

        for (i = 0; i < myArray.length; i++) {
            myArray[i] = myArray[i].hash();
            result += 'myArray[' + i + '] = "' + myArray[i] + '"' + '<br>';

        }

    }

    else if (myArray == null) {
        result = null;

    }

    $("vis").innerHTML = "";
    $("vis").innerHTML = ($("istextarea").checked) ? output : output.replace(/\n/g, "<br>");
    $("matchresult").innerHTML = '<h4>Value</h4>' + result;
    $("lastindex").innerHTML = '<h4>lastIndex</h4>' + re.lastIndex;

    addhistory();
    buildlink();
    re = null;
    reec = null;

}

String.prototype.$1elements = function (vregex) {
    var elm = []; var str = this; if ((vregex == "") || (this == "")) return null;
    var re = new RegExp(vregex, "");
    var vmm = re.exec(str);
    //alert( re.lastIndex)
    if ((vmm == null) || (vmm.length < 2)) return null;
    //alert(vregex+"\n"+str+"\n"+vmm)
    do {
        var vmm = re.exec(str);

        //var lstin = re.lastIndex;
        var lstin = (vmm != null) ? str.indexOf(vmm[0]) + vmm[0].length : 0;
        //alert(lstin+"/"+ind+"\n"+str+"\n"+vmm);
        str = str.substring(lstin, str.length);
        if (vmm != null) elm.push(vmm[1]);
    } while (vmm != null);
    return elm;
}

String.prototype.cssit = function (n, cv) {

    var vvc = [];
    var str = this;
    for (i = n; i < cv.length; i++) {
        var lstind = str.indexOf(cv[i]) + cv[i].length;
        var mm = str.substring(0, lstind).replace(cv[i], "][[").hash();
        vvc[i] = mm.replace(/\]\[\[/, '<span class ="cssv">' + cv[i].hash() + '</span>')
        str = str.substring(lstind, str.length);
    }

    return vvc.join("") + str.hash();

}

String.prototype.hash = function () {
    return this.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function tabEvent(evt) {
    evt = (evt) ? evt : ((window.event) ? window.event : "");
    if (evt) {
        var elem = getTargetElement(evt);
        var actContainer = (elem.tagName == 'A') ? elem.parentNode.parentNode.parentNode.id : elem.parentNode.parentNode.id;
        var tp = gettab(actContainer).position;
        var hvelem = (elem.tagName == 'A') ? elem.parentNode : elem;
        var lielem = (elem.tagName == 'A') ? elem.parentNode.parentNode.getElementsByTagName('li') : elem.parentNode.getElementsByTagName('li');

        if ((evt.type == "mouseover") || (evt.type == "click")) {
            actIndex = getIndex(lielem, hvelem);
            if (actIndex == undefined) return;

            showContent(actContainer, actIndex);
        }
    }
}

function getIndex(arry, elem) {
    for (var i = 0; i < arry.length; i++) {
        if (arry[i] == elem) {
            return i;
        }
    }
}

function showContent(container, act) {
    var contDiv = new Array;
    var j = 0;
    var tab = gettab(container);
    var tp = tab.position;
    var vborder = tab.border;
    var vboxwidth = tab.width;
    var vtabcolor = tab.tabcolor;
    var contDiv0 = $$($(container), ('div'));


    for (var i = 0; i < contDiv0.length; i++) {
        if (contDiv0[i].parentNode.id == container) {
            contDiv[j] = contDiv0[i];
            j = j + 1;
        }
    }

    contDiv[act].className = (container == "tabco1") ? "content" : "content2";

    var vbkcolor = getCssProperty(contDiv[act], "background-color")
    var tagul = getUL(container, tp);
    var tagula = $$(tagul, ('a'));
    var tagulli = $$(tagul, ('li'));

    for (var i = 0; i < tagula.length; i++) {
        tagula[i].className = "ula";
    }

    for (var i = 0; i < tagulli.length; i++) {
        tagulli[i].className = "ullifloat";
    }
    tagul.className = "ulnofloat";

    if (ie6() == true) {
        $(container).style.borderRight = containercolor + " 0px solid";
    }

    contDiv[act].style.display = "block";

    for (var i = 0; i < contDiv.length; i++) {
        if (i != act) {
            contDiv[i].style.display = "none";
        }
    }

    var actitem = tagulli[act];

    var actitema = $$(actitem, ('a'))[0];

    actitema.style.top = "1px";

    actitem.style.borderTop = vborder;

    actitema.style.backgroundColor = vbkcolor;
    var marginRight_li = getCssProperty(actitem, "margin-right");
    var marginBottom_li = getCssProperty(actitem, "margin-bottom");

    for (var i = 0; i < tagulli.length; i++) {

        if (marginRight_li == "0px") {

            tagulli[i].style.borderLeft = (i == 0) ? vborder : "#fff 0px";

        }


        if (i != act) {

            var a = $$(tagulli[i], 'a')[0];

            a.style.top = "0px";
            a.style.left = "0px";

            a.style.backgroundColor = vtabcolor;

            tagulli[i].style.borderTop = vborder;

        }

    }
}

function bindEvent(container, e) {

    var tp = gettab(container).position;
    var ele = $$(getUL(container, tp), 'li');

    for (var i = 0; i < ele.length; i++) {
        if (e == "click") {
            ele[i].onmouseover = "";
            ele[i].onclick = tabEvent;
        }
        if (e == "mouseover") {
            ele[i].onmouseover = tabEvent;
        }
    }
}


function Bindtabs(id, activetab1, eventType, position, border, tabcolor, bkcolor, width) {
    this.id = id;
    this.activetab1 = activetab1;
    this.eventType = eventType;
    this.position = position;
    this.border = border;
    this.tabcolor = tabcolor;
    this.bkcolor = bkcolor;
    this.width = width;

    this.c = function () {

        showContent(this.id, this.activetab1);

        bindEvent(this.id, this.eventType);

    }
}

function getUL(id, ttp) {

    if ((ttp == "t") || (ttp == "l") || (ttp == "p")) {
        var ul = $$($(id), ('ul'))[0];
    }
    else {
        var n = $$($(id), ('ul')).length;
        var ul = $$($(id), ('ul'))[n - 1];

    }
    return ul;
}

function gettab(id) {

    return (id == "tabco1") ? t1 : t2;
}

function ie6() {
    var appVer = navigator.appVersion.toLowerCase();
    var iePos = appVer.indexOf('msie');
    if (iePos != -1) {
        is_minor = parseFloat(appVer.substring(iePos + 5, appVer.indexOf(';', iePos)))
        is_major = parseInt(is_minor);
    }

    var is_ie = ((iePos != -1));
    var is_ie6 = (is_ie && is_major == 6);
    return is_ie6;
}


function getCssProperty(elem, prop) {
    if (document.defaultView) {
        return document.defaultView.getComputedStyle(elem, null).getPropertyValue(prop);
    }
    else if (elem.currentStyle) {
        var prop = prop.replace(/-(\w)/gi, function ($0, $1) {
            //return $0.charAt($0.length - 1).toUpperCase();
            return $1.toUpperCase()
        });
        return elem.currentStyle[prop];
    }
    else return null;
}

function $(id) { return (document.getElementById(id)); }
function $$(e, tag) { return e.getElementsByTagName(tag); }

var containercolor = "#6699cc";

function initt() {

    var border = "#cfcfcf 1px solid";
    var conbkcolor = "#eee9e9";
    var tabbk = "#cfcfcf";

    t1 = new Bindtabs("tabco1", 0, "click", "t", border, tabbk, conbkcolor, "520px");
    t1.c();

}

function init() {
    var ele = document.getElementsByTagName("span");
    for (var i = 0; i < ele.length; i++) {
        if (ele[i].className.indexOf("tb") != -1) {
            ele[i].onclick = toolbarEvent;
            ele[i].onmouseover = toolbarEvent;
            ele[i].onmouseout = toolbarEvent;
            ele[i].onselectstart = function () { return false };

        }
    }

}

window.onload = function () {
    initt();
    init();
    geturlpara();

}

function socialbkmk() {
    var u = location.href;
    var t = document.title;
    location.href = 'http://www.pagecolumn.com/social_bookmark2.htm?pgcoluu=' + u + '&pgcoltt=' + t;
}

