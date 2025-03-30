 
const fakeApiData = ['Data1', 'Data2', 'Data3', 'Data4'];

function* dataGenerator() {
    let index = 0;
    while (index < fakeApiData.length) {
        yield new Promise((resolve) => setTimeout(() => resolve(fakeApiData[index++]), 1000));
    }
}

async function processData(generator) {
    for await (const data of generator) {
        print(`Processed: ${data}`);
    }
}

const dataHandler = {
    get: function(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            throw new Error(`Property ${prop} doesn't exist`);
        }
    },
    set: function(target, prop, value) {
        if (typeof value === 'string') {
            target[prop] = value;
        } else {
            throw new Error('Values must be strings');
        }
        return true;
    }
};

const proxyData = new Proxy(fakeApiData, dataHandler);

proxyData.push('Data5');
proxyData.forEach((data, index) => print(`Data at ${index}: ${data}`));

try {
    print(proxyData.nonExistent);
} catch (error) {
    console.error(error.message);
}

(async () => {
    print('Starting data processing...');
    await processData(dataGenerator());
    print('Data processing complete!');
})();
