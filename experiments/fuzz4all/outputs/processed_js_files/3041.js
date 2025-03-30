 

 
function* dataProducer() {
    yield* [1, 2, 3, 4, 5];
}

 
async function processData(generator) {
    const results = [];
    for (const value of generator) {
        results.push(await delayedPromise(value));
    }
    return results;
}

 
const delayedPromise = (value) =>
    new Promise((resolve) => setTimeout(() => resolve(value * 2), 1000));

 
(async function main() {
    const generator = dataProducer();
    try {
        const processedData = await processData(generator);
        print('Processed Data:', processedData);
    } catch (error) {
        console.error('Error processing data:', error);
    }

     
    const target = {
        language: 'JavaScript'
    };

    const handler = {
        get: (obj, prop) => {
            if (prop in obj) {
                return `Property ${prop} found with value ${obj[prop]}`;
            } else {
                return `Property ${prop} not found`;
            }
        }
    };

    const proxy = new Proxy(target, handler);
    print(proxy.language);  
    print(proxy.framework);  
})();
