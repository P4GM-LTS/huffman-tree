    var nodeElement = function(strOfChars, nodeWeight = 0, childNodes = 0, childDepth = 0){
        this.nodeName = strOfChars;
        this.weight = nodeWeight;
        this.childs = childNodes;
        this.huffCode = '';
        this.depth = childDepth+1;
    };
    var sortNodes = function(arr){
        return arr.sort((a, b)=>{
            return(b.weight - a.weight);
        });
    };
    module.exports.firstNodes = function(text, arrayOfActiveNodes=[]){
        arrayOfActiveNodes.push(new nodeElement(text[0] + text[1], 1));
        for(let i=2; i<text.length; i += 2){
            var inc = 0;
            for(let j=0; j<arrayOfActiveNodes.length; j++){
                if(arrayOfActiveNodes[j].nodeName === text[i]+text[i+1]){
                    arrayOfActiveNodes[j].weight += 1;
                    break;
                }
                else{
                    inc++;
                    if(inc === arrayOfActiveNodes.length){
                        arrayOfActiveNodes[arrayOfActiveNodes.length] = new nodeElement(text[i]+text[i+1]);
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
        return finalElement.reduce(
            (a, v) => {
                if (Array.isArray(v.childs)){
                    v.childs[0].huffCode = `${v.huffCode}${v.childs[0].huffCode}`;
                    v.childs[1].huffCode = `${v.huffCode}${v.childs[1].huffCode}`;
                    return a.concat(module.exports.arrayBackwards(v.childs))
                }
                else{
                    return a.concat(v)
                }
            }, [])
    };
    module.exports.textReplaceByNodes = function (text, arr) {
        text = text.split('');
        for(let i=0; i<text.length; i += 2){
            for(let j=0; j<arr.length; j++){
                if(arr[j].nodeName === text[i]+text[i+1]) {
                    text[i] = arr[j].huffCode;
                }
            }
        }
        text = text.filter((e,i)=>!(i%2));
        return text.join('');
    };

    module.exports.textPrepare = function(text){
        return Buffer.from((text + ('0'.repeat(8 - text.length%8))).match(/.{1,8}/g).map((v, i, a) => {
            return a[i] = '0x' + Number.parseInt(v, 2).toString(16);
        }))
    };
