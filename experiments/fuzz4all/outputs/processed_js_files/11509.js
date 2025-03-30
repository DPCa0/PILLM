 

 
const fetchData = async (url) => {
    const fakeData = {
        'https://api.example.com/data1': 'Data from API 1',
        'https://api.example.com/data2': 'Data from API 2',
    };
    return new Promise((resolve) => setTimeout(() => resolve(fakeData[url]), 1000));
};

 
function* dataGenerator(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

 
const processGenerator = async (generator) => {
    for (const promise of generator) {
        print('Fetching data...');
        print('Received:', await promise);
    }
};

 
const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
];

 
const handler = {
    get: (target, prop) => {
        print(`Accessed property ${prop}`);
        return target[prop];
    }
};

const proxyUrls = new Proxy(urls, handler);

 
const gen = dataGenerator(proxyUrls);
processGenerator(gen);
