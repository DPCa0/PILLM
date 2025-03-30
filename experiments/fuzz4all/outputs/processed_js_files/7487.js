 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property "${prop}": ${target[prop]}`);
            return target[prop];
        } else {
            print(`Property "${prop}" not found.`);
            return undefined;
        }
    },
    set(target, prop, value) {
        print(`Setting property "${prop}" to ${value}`);
        target[prop] = value * 2;  
        return true;
    }
};

const complexObject = {
    a: 1,
    b: 2
};

const proxy = new Proxy(complexObject, handler);

 
async function demoAsyncFunction() {
     
    const { calculateSum } = await import('./math-utils.js');
    
     
    proxy.a = 10;   
    print(proxy.a);   
    
     
    const iterableObject = {
        values: [1, 2, 3],
        [Symbol.iterator]: function* () {
            for (const value of this.values) {
                yield value;
            }
        }
    };

    print([...iterableObject]);   

     
    const sum = await Promise.resolve(calculateSum(proxy.a, proxy.b));   
    print(`Calculated sum: ${sum}`);
}

demoAsyncFunction();
Note: The above code snippet assumes the existence of a `math-utils.js` module containing a `calculateSum` function. Make sure to have this file with the corresponding function for the dynamic import to work correctly.