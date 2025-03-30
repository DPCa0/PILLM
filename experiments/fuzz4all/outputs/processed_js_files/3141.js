 
(async function advancedFeaturesDemo() {
     
    const delayedPromise = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));

     
    async function getAsyncData() {
        const data1 = await delayedPromise(500, { id: 1, value: 'Hello' });
        const data2 = await delayedPromise(500, { id: 2, value: 'World' });
        return [data1, data2];
    }

     
    const uniqueSymbol = Symbol('uniqueProperty');

     
    const handler = {
        get: (target, prop) => {
            if (prop === 'secret') {
                return `This is a secret value: ${target[uniqueSymbol]}`;
            }
            return target[prop];
        }
    };

    const data = await getAsyncData();

     
    const [firstData, secondData] = data;

     
    const dataProxy = new Proxy({ ...firstData, ...secondData, [uniqueSymbol]: 'Secret123' }, handler);

     
    print(`ID 1 Value: ${dataProxy.value}`);
    print(`ID 2 Value: ${secondData.value}`);
    print(dataProxy.secret);
})();
