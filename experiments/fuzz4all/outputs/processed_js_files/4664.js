 
const asyncOperation = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
(async function() {
    try {
        const [data1, data2] = await Promise.all([
            asyncOperation(1000).then(() => ({ id: 1, value: 'Hello' })),
            asyncOperation(500).then(() => ({ id: 2, value: 'World' }))
        ]);

         
        const dataMap = new Map();
        const uniqueValues = new Set();

        [data1, data2].forEach(item => {
            dataMap.set(item.id, item.value);
            uniqueValues.add(item.value);
        });

         
        print(`Data 1 Value: ${dataMap.get(data1.id)?.toUpperCase() ?? 'No Value'}`);
        print(`Data 2 Value: ${dataMap.get(data2.id)?.toUpperCase() ?? 'No Value'}`);

         
        const logValues = (...values) => print(...values);
        logValues('Unique Values:', ...uniqueValues);

         
        const handler = {
            get: (obj, prop) => prop in obj ? obj[prop] : `Property ${prop} not found!`
        };
        const proxyData = new Proxy(data1, handler);
        print(proxyData.value);
        print(proxyData.nonExistentProp);
    } catch (error) {
        console.error('Error:', error);
    }
})();
