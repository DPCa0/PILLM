 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('No URL provided');
            }
        }, 1000);
    });
}

async function process() {
    try {
        const data = await fetchData('https://api.example.com/data');
        print('Fetched:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

const handler = {
    get: (target, property) => {
        print(`Accessed property "${property}"`);
        return target[property];
    }
};

const proxy = new Proxy({ start: process }, handler);

proxy.start();
