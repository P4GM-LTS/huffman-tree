
const              regexp = /\|(.*?)?-([0-1]*)?/g;

var                     i = 0,
                  newFile = [];


module.exports = function (binFile, fileNameB64) {

    let          fileName = (Buffer.from(fileNameB64, 'base64')).toString('utf8').split('""'),

            amountOfZeros = fileName[0], tree = fileName[1], originalName = fileName[2],

             preparedFile = binFile.toString('hex').split('').map( v => v = (parseInt(v, 16).toString(2)).padStart(4, '0')).join('').slice(0, -parseInt(amountOfZeros));
    console.log(binFile);
    let            result = Array.from(tree.matchAll(regexp));

    result.sort((a,b)=>{
        return a[2].length - b[2].length;
    });
    i = 0;
    newFile = [];
    while(preparedFile.length > 0) {
        for(let j = 0; j<result.length; j++) {
            // noinspection EqualityComparisonWithCoercionJS
            if (result[j][2] == preparedFile.substring(0, i)) {
                newFile.push(result[j][1]);
                preparedFile = preparedFile.slice(i);
                i = 0;
            }
        }
        i++;
    }
    console.log(newFile);
    return [newFile.join(''), originalName];
};