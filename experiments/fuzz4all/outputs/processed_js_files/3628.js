 

 
function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: `Data from ${url}` });
        }, 1000);
    });
}

 
function* urlGenerator() {
    yield 'https://api.example.com/resource1';
    yield 'https://api.example.com/resource2';
    yield 'https://api.example.com/resource3';
}

 
async function processUrls(generator) {
    for (let url of generator) {
        const response = await fetchData(url);
        print(response.data);
    }
}

 
const dataHandler = {
    get: (target, property) => {
        print(`Getting property ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const dataProxy = new Proxy({}, dataHandler);

 
dataProxy.name = 'Example';
print(dataProxy.name);

 
const urls = urlGenerator();
processUrls(urls);
