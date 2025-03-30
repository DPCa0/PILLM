 
async function complexComputation(input) {
     
    const compute = (val) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof val === 'number') {
                resolve(val * 2);   
            } else {
                reject('Invalid input');
            }
        }, 1000);
    });

    try {
         
        const result = await compute(input);
        print(`Result: ${result}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

 
function advancedCollections() {
    const myMap = new Map([
        ['key1', 'value1'],
        ['key2', 'value2']
    ]);

    const mySet = new Set([1, 2, 3, 4]);

     
    myMap.forEach((value, key) => {
        print(`Map - Key: ${key}, Value: ${value}`);
    });

     
    const newArrayFromSet = [...mySet].map(x => x * 2);
    print('New Array from Set:', newArrayFromSet);
}

 
(async () => {
    print('Starting complex computation:');
    await complexComputation(5);

    print('\nDemonstrating advanced collections:');
    advancedCollections();
})();
