 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const fakeData = { data: 'Sample data from ' + url };
            resolve(fakeData);
        }, 1000);
    });
}

 
function* urlGenerator() {
    yield 'https://api.example.com/data1';
    yield 'https://api.example.com/data2';
    yield 'https://api.example.com/data3';
}

 
async function processUrls(generator) {
    const results = [];
    for (const url of generator()) {
        const data = await fetchData(url);
        print(`Fetched from ${url}:`, data);
        results.push(data);
    }
    return results;
}

 
const uniqueKey = Symbol('uniqueProperty');

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property: ${String(prop)}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property: ${String(prop)} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const obj = new Proxy({ [uniqueKey]: 'uniqueValue' }, handler);

 
obj.someProp = 'Hello';
print(obj.someProp);
print(obj[uniqueKey]);

 
(async () => {
    const fetchedData = await processUrls(urlGenerator);
    print('Final fetched data:', fetchedData);
})();
