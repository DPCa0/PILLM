 

 
async function fetchData(apiEndpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (apiEndpoint === 'validEndpoint') {
                resolve({ data: 'Hello, world!', timestamp: new Date() });
            } else {
                reject('Invalid API Endpoint');
            }
        }, 1000);
    });
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing ${prop} property`);
            return target[prop];
        } else {
            return `Property ${prop} does not exist`;
        }
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
(async function main() {
    try {
        const apiEndpoint = 'validEndpoint';
        const response = await fetchData(apiEndpoint);

         
        const responseProxy = new Proxy(response, handler);

         
        print(responseProxy.data);
        print(responseProxy.timestamp);

         
        responseProxy.data = 'Hello, universe!';

         
        print(responseProxy.data);

    } catch (error) {
        console.error(`Error: ${error}`);
    }
})();
