    var nodeElement = function(strOfChars, nodeWeight = 0, childNodes = 0, childDepth = 0){
        this.nodeName = strOfChars;
        this.weight = nodeWeight;
        this.childs = childNodes;
        this.huffCode = '';
        this.depth = childDepth+1;
    };

    var sortNodes = function(arr){
        return arr.sort((a, b)=>{
            return(a.weight - b.weight);
        });
    };
    module.exports.firstNodes = function(text, arrayOfActiveNodes=[]){
        arrayOfActiveNodes.push(new nodeElement(text[0], 1));
        for(let i=1; i<text.length; i++){
            var inc = 0;
            for(let j=0; j<arrayOfActiveNodes.length; j++){
                if(arrayOfActiveNodes[j].nodeName === text[i]){
                    arrayOfActiveNodes[j].weight += 1;
                    break;
                }
                else{
                    inc++;
                    if(inc === arrayOfActiveNodes.length){
                        arrayOfActiveNodes[arrayOfActiveNodes.length] = new nodeElement(text[i]);
                    }
                }
            }
        }
        return arrayOfActiveNodes;
    };
    var nodesSum = function (nodeA, nodeB) {
        let str = `${nodeA.nodeName}${nodeB.nodeName}`;
        let wt = nodeA.weight + nodeB.weight;
        let chd = Math.max(nodeA.depth, nodeB.depth);
        return(new nodeElement(str, wt, [nodeA, nodeB], chd));
    };
    module.exports.nodesIterate = function (arrayOfActiveNodes) {
        while(arrayOfActiveNodes.length !== 1) {
            arrayOfActiveNodes = sortNodes(arrayOfActiveNodes);
            arrayOfActiveNodes[arrayOfActiveNodes.length-1].huffCode = 0;
            arrayOfActiveNodes[arrayOfActiveNodes.length-2].huffCode = 1;
            arrayOfActiveNodes[arrayOfActiveNodes.length-2] = nodesSum(arrayOfActiveNodes[arrayOfActiveNodes.length-2],arrayOfActiveNodes[arrayOfActiveNodes.length-1]);
            arrayOfActiveNodes.pop();
        }
        return arrayOfActiveNodes;
    };
    module.exports.arrayBackwards = function(finalElement){
        var i = 0;
        while(1){
            finalElement.map((curr, idx, arr) => {
                if (curr.childs) {
                    curr.childs[0].huffCode = `${curr.huffCode}${curr.childs[0].huffCode}`;
                    curr.childs[1].huffCode = `${curr.huffCode}${curr.childs[1].huffCode}`;
                    console.log(curr);
                    arr.push(curr.childs);
                    arr.splice(idx, 1);
                    return arr;
                }
                else{
                    return curr;
                }
                if(finalElement.filter(el => el.depth > 1)) {
                    i = 0;
                } else {
                    i = 1;
                }
            });
           if (i == 1) break;
        }

    };
    module.exports.textReplaceByNodes = function (text, arr) {
        text = text.split('');
        for(let i=0; i<text.length; i++){
            for(let j=0; j<arr.length; j++){
                if(arr[j].nodeName === text[i]) {
                    text[i] = arr[j].huffCode;
                }
            }
        }
        return text.join('');
    };

