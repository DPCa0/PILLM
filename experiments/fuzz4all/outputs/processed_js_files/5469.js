 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function complexAsyncFlow() {
     
    const dataMap = new Map([
        ['name', 'Advanced JS'],
        ['version', 'ES2023'],
        ['features', ['Async/Await', 'Map', 'Set', 'Promise', 'Proxy', 'Generator']]
    ]);

     
    const handler = {
        get(target, property) {
            if (property === 'features') {
                return target.get(property).join(', ');
            }
            return target.get(property);
        }
    };
    const proxyData = new Proxy(dataMap, handler);

     
    print(`Starting async operations...`);
    await delay(1000);

     
    function* featureGenerator() {
        for (let feature of dataMap.get('features')) {
            yield feature;
        }
    }

     
    const featureGen = featureGenerator();
    print(`Available Features:`);
    let nextFeature = featureGen.next();
    while (!nextFeature.done) {
        print(`- ${nextFeature.value}`);
        nextFeature = featureGen.next();
    }

     
    print(`\nProxied Data:`);
    print(`Name: ${proxyData.name}`);
    print(`Version: ${proxyData.version}`);
    print(`Features: ${proxyData.features}`);
}

 
complexAsyncFlow();
