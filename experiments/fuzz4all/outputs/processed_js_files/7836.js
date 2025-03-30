 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'validUrl') {
                resolve({ data: 'Important data', status: 200 });
            } else {
                reject({ error: 'Invalid URL', status: 404 });
            }
        }, 1000);
    });
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Accessing property '${property}'`);
            return target[property];
        } else {
            print(`Property '${property}' does not exist`);
            return undefined;
        }
    },
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        if (typeof value === 'string') {
            target[property] = value;
        } else {
            throw new TypeError('Value must be a string');
        }
        return true;
    }
};

let dataObject = { data: '', status: '' };
const proxyData = new Proxy(dataObject, handler);

 
function* urlGenerator() {
    yield 'validUrl';
    yield 'invalidUrl';
}

const urlGen = urlGenerator();

(async () => {
    for (const url of urlGen) {
        try {
            const response = await fetchData(url);
            proxyData.data = response.data;
            proxyData.status = response.status.toString();
            print('Data received:', proxyData.data);
        } catch (err) {
            print('Error:', err.error);
            proxyData.status = err.status.toString();
        }
    }
})();
