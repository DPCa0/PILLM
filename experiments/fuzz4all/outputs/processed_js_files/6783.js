 

 
function* createDataStream() {
    yield 'Data packet 1';
    yield 'Data packet 2';
    yield 'Data packet 3';
}

 
async function asyncOperation(packet) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`Processed: ${packet}`), 1000);
    });
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property: ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const systemState = new Proxy({ status: 'idle', packetsProcessed: 0 }, handler);

 
async function main() {
    systemState.status = 'running';
    const dataStream = createDataStream();

    for (const packet of dataStream) {
        print(`Received: ${packet}`);
        const result = await asyncOperation(packet);
        print(result);
        systemState.packetsProcessed++;
    }

    systemState.status = 'completed';
}

 
main().then(() => print('All packets processed:', systemState.packetsProcessed));
