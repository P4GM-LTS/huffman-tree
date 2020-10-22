var fs = require('fs');
var lol = require('./tree');

var text = fs.readFileSync('12345');
/*
console.log(text);
var textEnc = lol.textReplaceByNodes(text, lol.arrayBackwards(lol.nodesIterate(lol.firstNodes(text))));
console.log(lol.textReplaceByNodes(text, lol.arrayBackwards(lol.nodesIterate(lol.firstNodes(text)))));
console.log(textEnc);
*/

console.log(lol.arrayBackwards(lol.nodesIterate(lol.firstNodes(text))));