 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* fetchDataSim() {
    const data = [
        { id: 1, value: 'Alpha' },
        { id: 2, value: 'Beta' },
        { id: 3, value: 'Gamma' }
    ];
    for (let item of data) {
        await delay(500);  
        yield item;
    }
}

async function processData() {
    const dataProxyHandler = {
        get: (target, prop) => {
            if (prop in target) {
                return target[prop];
            } else {
                console.warn(`Property ${prop} does not exist.`);
                return 'N/A';
            }
        }
    };

    let result = [];
    const generator = fetchDataSim();
    for await (let data of generator) {
        const proxyData = new Proxy(data, dataProxyHandler);
        print(`Processing: ${proxyData.value}`);
        result.push(proxyData.value);
    }
    return result;
}

(async () => {
    try {
        const result = await processData();
        print('Final Result:', result);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
