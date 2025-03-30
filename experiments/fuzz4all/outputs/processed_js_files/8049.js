 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Advanced JS',
                features: ['Promises', 'Async/Await', 'Proxy', 'Generators']
            });
        }, 1000);
    });
};

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Getting property: ${property}`);
            return target[property];
        } else {
            return `Property ${property} does not exist.`;
        }
    }
};

 
function* featureGenerator(features) {
    for (let feature of features) {
        yield feature;
    }
}

(async () => {
    try {
         
        const data = await fetchData();
        const proxiedData = new Proxy(data, handler);

        print(proxiedData.name);  

         
        const generator = featureGenerator(proxiedData.features);
        for (let feature of generator) {
            print(`Feature: ${feature}`);
        }

         
        print(proxiedData.nonExistentProperty);  

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
