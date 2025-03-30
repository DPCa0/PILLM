 

 
function* generatorFunc(arr) {
    for (let value of arr) {
        yield value * 2;
    }
}

 
async function processValues(generator) {
    const results = [];
    for (let value of generator) {
        results.push(await Promise.resolve(value));
    }
    return results;
}

 
const handler = {
    get: (target, property) => {
        return property in target ? target[property] : `Property '${property}' not found`;
    }
};

const target = { a: 1, b: 2 };
const proxy = new Proxy(target, handler);

(async () => {
    const myArray = [1, 2, 3, 4];
    const generator = generatorFunc(myArray);
    
    try {
        const processedValues = await processValues(generator);
        print('Processed Values:', processedValues);

        print('Proxy Access a:', proxy.a);  
        print('Proxy Access b:', proxy.b);  
        print('Proxy Access c:', proxy.c);  
    } catch (error) {
        console.error('Error:', error);
    }
})();
