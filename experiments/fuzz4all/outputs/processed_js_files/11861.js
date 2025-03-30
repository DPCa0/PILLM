 
const apiSimulator = (ms, result) => new Promise(resolve => setTimeout(() => resolve(result), ms));

async function* fetchDataSequentially(endpoints) {
    for (let endpoint of endpoints) {
        const data = await apiSimulator(1000, endpoint);
        yield data;
    }
}

(async function handleData() {
    const endpoints = ['endpoint1', 'endpoint2', 'endpoint3'];
    const results = [];

    for await (let data of fetchDataSequentially(endpoints)) {
        results.push(data);
        print(`Fetched: ${data}`);
    }

    const finalData = results.reduce((acc, curr) => {
        acc[curr] = `${curr}_processed`;
        return acc;
    }, {});

    print('Final Data:', finalData);
})();
