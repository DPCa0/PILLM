 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData() {
    await delay(1000);
    return { data: 'Sample Data' };
}

 
function* dataGenerator() {
    print('Fetching data...');
    const data = yield fetchData();
    print('Data fetched:', data);
    yield 'Process complete';
}

 
const target = { status: 'Idle' };
const handler = {
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    },
    get(target, prop) {
        print(`Getting ${prop}`);
        return target[prop];
    }
};

const proxiedTarget = new Proxy(target, handler);

 
async function run() {
    const gen = dataGenerator();
    
    proxiedTarget.status = 'Running';
    
    const firstStep = gen.next();  
    if (firstStep.value instanceof Promise) {
        const data = await firstStep.value;  
        gen.next(data);  
    }
    
    print(gen.next().value);  
    proxiedTarget.status = 'Complete';
}

run();
