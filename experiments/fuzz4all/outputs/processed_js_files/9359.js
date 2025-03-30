 

async function* fetchData(urls) {
    for (const url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            print(`Accessed property: ${prop}`);
            return Reflect.get(target, prop, receiver);
        }
        throw new Error(`Property ${prop} doesn't exist.`);
    },
    set: (target, prop, value, receiver) => {
        if (typeof value === 'number' && value > 0) {
            print(`Setting ${prop} to ${value}`);
            return Reflect.set(target, prop, value, receiver);
        }
        throw new Error(`Invalid value for ${prop}. Must be a positive number.`);
    }
};

const dataProxy = new Proxy({ count: 0 }, handler);

(async function main() {
    const urls = [
        'https: 
        'https://jsonplaceholder.typicode.com/posts/2'
    ];

    const generator = fetchData(urls);
    for await (const data of generator) {
        dataProxy.count++;
        print(`Data fetched (#${dataProxy.count}):`, data);
    }

    try {
        print(dataProxy.nonExistentProperty);  
    } catch (error) {
        console.error(error.message);
    }

    try {
        dataProxy.count = -1;  
    } catch (error) {
        console.error(error.message);
    }
})();
