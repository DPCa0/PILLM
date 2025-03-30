 

 
const fetchData = () => new Promise(resolve => {
    setTimeout(() => resolve({ id: 1, name: 'Sample Data', nested: { moreData: 'Interesting!' } }), 1000);
});

 
function* dataGenerator() {
    yield fetchData();
    yield fetchData();
}

 
async function processData() {
    const gen = dataGenerator();

    for (let promise of gen) {
        try {
            const data = await promise;
            const { id, name, nested: { moreData } } = data;  
            print(`ID: ${id}, Name: ${name}, More Data: ${moreData}`);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

 
const config = { debug: true, version: '1.0', settings: { theme: 'dark' } };

const configProxy = new Proxy(config, {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property "${prop}" with value: ${target[prop]}`);
            return target[prop];
        } else {
            console.warn(`Property "${prop}" does not exist.`);
            return undefined;
        }
    },
    set(target, prop, value) {
        print(`Setting property "${prop}" to value: ${value}`);
        target[prop] = value;
        return true;
    }
});

 
print('Debug Mode:', configProxy.debug);
configProxy.version = '1.1';
print('Updated Version:', configProxy.version);
print('Non-existent Property:', configProxy.nonExistent);

processData();  
