 

 
function asyncOperation(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.1 ? resolve(`Processed: ${data}`) : reject('Error processing data');
        }, 500);
    });
}

 
async function processData(inputs) {
    const results = [];
    for (const input of inputs) {
        try {
            const result = await asyncOperation(input);
            results.push(result);
        } catch (error) {
            console.error(error);
        }
    }
    return results;
}

 
const handler = {
    get(target, property) {
        print(`Accessing property: ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const targetObject = { a: 1, b: 2, c: 3 };

 
const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.a);  
proxyObject.b = 42;  

 
(async () => {
    const inputs = ['data1', 'data2', 'data3'];
    const results = await processData(inputs);
    print(results);  
})();
