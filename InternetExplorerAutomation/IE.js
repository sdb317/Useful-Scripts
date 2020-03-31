NodeFilter = {}; // In global namespace

NodeFilter.FILTER_ACCEPT = 1;
NodeFilter.FILTER_REJECT = 2;
NodeFilter.FILTER_SKIP = 3;

NodeFilter.SHOW_ALL = 0xFFFFFFFF;
NodeFilter.SHOW_ELEMENT = 0x00000001;
NodeFilter.SHOW_ATTRIBUTE = 0x00000002;
NodeFilter.SHOW_TEXT = 0x00000004;
NodeFilter.SHOW_CDATA_SECTION = 0x00000008;
NodeFilter.SHOW_ENTITY_REFERENCE = 0x00000010;
NodeFilter.SHOW_ENTITY = 0x00000020;
NodeFilter.SHOW_PROCESSING_INSTRUCTION = 0x00000040;
NodeFilter.SHOW_COMMENT = 0x00000080;
NodeFilter.SHOW_DOCUMENT = 0x00000100;
NodeFilter.SHOW_DOCUMENT_TYPE = 0x00000200;
NodeFilter.SHOW_DOCUMENT_FRAGMENT = 0x00000400;
NodeFilter.SHOW_NOTATION = 0x00000800;

function FindIE(URL) {
    try {
        var shell = new ActiveXObject('Shell.Application');
        var windows = shell.windows();
        for (var i = 0; i < windows.Count; i++) {
            try {
                if (windows.Item(i).Type == 'HTML Document')
                    if (windows.Item(i).LocationURL.indexOf(URL) != -1) {
                        return windows.Item(i);
                    }
            }
            catch (e) {
            }
        }
    }
    catch (e) {
        WScript.Echo('FindIE: ' + e.description());
    }
}

function WaitForIE(IE) {
    try {
        for (var i = 0; i < 10; i++) {
            if (IE.busy)
                WScript.Sleep(1000);
            else
                return;
        }
    }
    catch (e) {
        WScript.Echo('WaitForIE: ' + e.description());
    }
}

function FindElement(document, root, match) {
    try {
        return FindElements(document, root, match).nextNode();
    }
    catch (e) {
        WScript.Echo('FindElement: ' + e.description());
    }
}

function FindElements(document, root, match, action) {
    try {
        if (document.createNodeIterator) {
            var Iterator =
                document.createNodeIterator
                    (
                    root, // Node to use as root
                    NodeFilter.SHOW_ELEMENT,
                    function (node) {
                        if (match(node)) {
                            if (action) // Optionally perform the action on each node that matches
                                action(node);
                            return NodeFilter.FILTER_ACCEPT;
                        }
                    },
                    false
                    );
            return Iterator;
        }
        else {
            WScript.Echo('Browser does not support createNodeIterator()');
        }
    }
    catch (e) {
        WScript.Echo('FindElements: ' + e.description());
    }
}

