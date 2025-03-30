 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Fetched data from ${url}`);
        }, 1000);
    });
}

 
function* dataGenerator(urls) {
    for (let url of urls) {
        yield fetchData(url);
    }
}

 
const handler = {
    get(target, property, receiver) {
        print(`Accessing property: ${property}`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        print(`Setting property: ${property} to ${value}`);
        return Reflect.set(target, property, value, receiver);
    }
};

const dataStore = new Proxy({}, handler);

(async () => {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const generator = dataGenerator(urls);

    for (let dataPromise of generator) {
        const data = await dataPromise;
        print(data);
        dataStore[Symbol(data)] = data;  
    }

    print('Stored data:', dataStore);
})();
