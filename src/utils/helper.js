export function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
        let myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        
        //myObject[index] = myChunk
        tempArray.push(myChunk);
    }

    return tempArray;
}

export function splitArray(arr, numOfParts = 10){
    const splitedArray = []
    for (let i = 0; i < numOfParts;i++) {
        const numOfItemsToSplice = arr.length / 10;
        splitedArray.push(arr.splice(0, numOfItemsToSplice))
    }
    return splitedArray;
}

export function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};


export function groupweek(array)
{
    let byweek={};
    array.forEach(element => {
        let d = new Date(element);
        d = Math.floor(d.getTime()/(1000*60*60*24*7));
        byweek[d]=byweek[d]||[];
        byweek[d].push(element);
    });
    
    return byweek;
}