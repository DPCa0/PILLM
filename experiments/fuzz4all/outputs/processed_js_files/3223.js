 

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject("Invalid URL");
            }
        }, 1000);
    });
};

 
function* dataGenerator(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

 
const operationSymbol = Symbol('fetchOperation');

 
const dataHandler = {
    get: (target, property) => {
        if (property === operationSymbol) {
            print('Executing fetch operation');
            return async function () {
                for await (let dataPromise of target.generator) {
                    print(await dataPromise);
                }
            };
        }
        return target[property];
    }
};

 
const urls = [
    "https://api.example.com/data1",
    "https://api.example.com/data2",
    "https://api.example.com/data3"
];

 
const generator = dataGenerator(urls);

 
const dataProxy = new Proxy({ generator }, dataHandler);

 
dataProxy[operationSymbol]();
