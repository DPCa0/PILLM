 
(async () => {
    const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js');

     
    const handler = {
        get(target, prop, receiver) {
            print(`Getting property '${prop}'`);
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
            print(`Setting property '${prop}' to '${value}'`);
            return Reflect.set(target, prop, value, receiver);
        }
    };

    const data = new Proxy({ name: 'JavaScript', features: [] }, handler);

     
    const featureSet = new Set(['Proxies', 'Modules', 'Top-level await']);

     
    function* addFeatures(features) {
        for (const feature of features) {
            yield data.features.push(feature);
        }
    }

     
    async function addFeaturesAsync() {
        for await (const feature of addFeatures(featureSet)) {
            print(`Added feature: ${data.features[feature - 1]}`);
        }
    }

    await addFeaturesAsync();

     
    const chunkedFeatures = _.chunk(data.features, 2);
    print('Chunked Features:', chunkedFeatures);
})();
