 

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ data: 'Sample Data' });
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });
};

 
const handler = {
    get(target, property) {
        print(`Property '${property}' accessed`);
        return target[property];
    },
    set(target, property, value) {
        print(`Property '${property}' set to ${value}`);
        target[property] = value;
        return true;
    },
};

const proxyData = new Proxy({ name: 'John Doe', age: 30 }, handler);

 
const loadData = async () => {
    try {
        proxyData.status = 'Fetching data...';
        const result = await fetchData('https://api.example.com/data');
        proxyData.status = 'Data fetched';
        proxyData.data = result.data;
        print(`Fetched data: ${proxyData.data}`);
    } catch (error) {
        proxyData.status = 'Error fetching data';
        console.error(error.message);
    }
};

 
loadData();

 
const callbacks = new Set();
callbacks.add(() => print('Callback 1 executed'));
callbacks.add(() => print('Callback 2 executed'));

 
callbacks.forEach((cb) => cb());

 
const config = new Map();
config.set('apiEndpoint', 'https://api.example.com/data');
config.set('retryCount', 3);

 
print(`API Endpoint: ${config.get('apiEndpoint')}`);
print(`Retry Count: ${config.get('retryCount')}`);
