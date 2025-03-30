 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
}

 
function* urlGenerator() {
    yield 'https://api.example.com/data1';
    yield 'https://api.example.com/data2';
    yield 'https://api.example.com/data3';
}

 
const handler = {
    get: (target, property, receiver) => {
        print(`Property "${property}" has been accessed`);
        return Reflect.get(...arguments);
    }
};

 
const targetObject = { message: 'Hello from Proxy!' };
const proxyObject = new Proxy(targetObject, handler);

 
async function processUrls() {
    const urls = urlGenerator();
    for (let url of urls) {
        const data = await fetchData(url);
        print(data);
    }
    print(proxyObject.message);  
}

 
processUrls();
