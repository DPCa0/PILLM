 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
    await delay(1000);
    return { name: 'Advanced JavaScript', version: 'ES2023' };
}

const handler = {
    get(target, property) {
        if (property in target) {
            return target[property];
        } else {
            print(`Property ${String(property)} does not exist!`);
            return false;
        }
    }
};

const symbol = Symbol('unique');
let data = { [symbol]: 'private data' };
const proxyData = new Proxy(data, handler);

(async () => {
    print('Fetching data...');
    const fetchedData = await fetchData();
    print('Data fetched:', fetchedData);
    proxyData[symbol] = 'new private data';
    print(proxyData[symbol]);
    print(proxyData.nonExistentProperty);
})();
