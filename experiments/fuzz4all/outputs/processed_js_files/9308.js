 

 
const fetchData = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 1000));

 
async function getProcessedData(input) {
    try {
        const data = await fetchData(input);
        const processedData = data.split('').reverse().join('');
        return processedData;
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

 
const sym = Symbol('uniqueAction');

 
const handler = {
    get: (target, prop, receiver) => {
        if (typeof target[prop] === 'function') {
            return function (...args) {
                print(`Method ${prop} called with args:`, args);
                return Reflect.apply(target[prop], receiver, args);
            }
        }
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value) => {
        print(`Property ${prop} set to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const processor = {
    async process(input) {
        const result = await getProcessedData(input);
        print('Processed Result:', result);
    },
    [sym]() {
        print('Special symbol method executed.');
    }
};

const proxiedProcessor = new Proxy(processor, handler);

 
(async () => {
    await proxiedProcessor.process('Hello, world!');
    proxiedProcessor[sym]();
    proxiedProcessor.newProp = 'Testing Proxy';
})();
