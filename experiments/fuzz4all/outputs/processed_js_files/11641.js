 
const fs = require('fs').promises;

 
(async function main() {
     
    const uniqueNumbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

     
    const numberSquareMap = new Map();
    
     
    for (const num of uniqueNumbers) {
        numberSquareMap.set(num, num * num);
    }
    
     
    print(`Number-Square Map: ${JSON.stringify(Array.from(numberSquareMap.entries()))}`);

     
    const squaredEvens = [...uniqueNumbers].filter(num => num % 2 === 0).map(num => num * num);

    print(`Squared Even Numbers: ${squaredEvens}`);

     
    try {
        await fs.writeFile('output.txt', `Squared Even Numbers: ${squaredEvens.join(', ')}`);
        print('Data written to output.txt successfully.');
    } catch (err) {
        console.error('Error writing to file', err);
    }

     
    const handler = {
        get(target, prop) {
            print(`Getting property ${prop}`);
            return target[prop];
        },
        set(target, prop, value) {
            print(`Setting property ${prop} to ${value}`);
            target[prop] = value;
            return true;
        }
    };

    const proxyObj = new Proxy({ a: 1, b: 2 }, handler);
    proxyObj.a;   
    proxyObj.b = 42;   
})();
