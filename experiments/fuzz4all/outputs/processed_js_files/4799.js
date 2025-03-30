 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* dataStream() {
    for (let i = 0; i < 5; i++) {
        await delay(1000);
        yield `Data chunk ${i + 1}`;
    }
}

async function processData() {
    const dataGenerator = dataStream();

    for await (const data of dataGenerator) {
        print(`Processing: ${data}`);
    }

    return "All data processed!";
}

const handler = {
    get: function(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property '${prop}' does not exist. Defaulting to proxy value.`);
            return 'Proxy Value';
        }
    }
};

const proxyData = new Proxy({ prop1: 'Value1' }, handler);

async function main() {
    const result = await processData();
    print(result);

    print('Proxy access: ', proxyData.prop1);
    print('Proxy access: ', proxyData.prop2);
}

main();
