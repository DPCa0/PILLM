 

const asyncFetchData = async (url) => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Fetched data from ${url}`);
        }, 2000);
    });
};

const proxyHandler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        }
        throw new ReferenceError(`Property ${prop} does not exist`);
    },
    set(target, prop, value) {
        if (typeof value === 'string') {
            target[prop] = value;
            return true;
        } else {
            throw new TypeError('Only string values are allowed');
        }
    }
};

const secureObject = new Proxy({}, proxyHandler);

function* dataGenerator(urls) {
    for (const url of urls) {
        yield asyncFetchData(url);
    }
}

async function processData(urls) {
    try {
        const generator = dataGenerator(urls);
        let index = 0;
        
        for await (const data of generator) {
            secureObject[`data${index}`] = await data;
            print(secureObject[`data${index}`]);
            index++;
        }
    } catch (error) {
        console.error(error.message);
    }
}

const urls = [
    "https://api.example.com/data1",
    "https://api.example.com/data2",
    "https://api.example.com/data3"
];

 
processData(urls);
