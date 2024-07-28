function ctkidLmpnkMwIhbb2672024(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        node.nodeValue = node.nodeValue.replace(/r/g, "R");
    } else {
        for (let child of node.childNodes) {
            ctkidLmpnkMwIhbb2672024(child);
        }
    }
}
ctkidLmpnkMwIhbb2672024(document.body);
