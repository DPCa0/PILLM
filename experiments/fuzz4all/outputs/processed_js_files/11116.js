 
const logger = message => print(`[${new Date().toISOString()}] ${message}`);

 
const target = {
    name: 'AdvancedJS',
    version: '1.0'
};

const handler = {
    get: (obj, prop) => {
        logger(`Getting ${prop}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        logger(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

 
const fetchData = async () => {
    try {
        logger('Fetching data...');
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => resolve({ data: 'Hello, Proxy World!' }), 1000);
        });
        logger(`Data received: ${response.data}`);
    } catch (error) {
        logger(`Error: ${error}`);
    }
};

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();

 
const processObject = (obj) => {
    const processed = obj?.details?.info ?? 'No information';
    logger(`Processed info: ${processed}`);
};

 
(async () => {
    logger('Starting program');
    proxy.name = 'Advanced Features';
    print(proxy.name);

    await fetchData();

    logger(`Generated ID: ${gen.next().value}`);
    logger(`Generated ID: ${gen.next().value}`);

    processObject({ details: { info: 'Complex JS Object' } });
    processObject(null);
})();
