 
(async function() {
    function fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ data: [1, 2, 3, 4, 5], meta: { status: 'success' } }), 1000);
        });
    }

    try {
        const { data, meta: { status } } = await fetchData();
        
        if (status === 'success') {
            const squaredData = data.map(num => num ** 2);
            print(`Squared Data: ${squaredData}`);
        } else {
            console.error('Failed to fetch data');
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting ${prop}: ${target[prop]}`);
            return Reflect.get(target, prop, receiver);
        } else {
            console.warn(`Property ${prop} doesn't exist`);
            return undefined;
        }
    },
    set(target, prop, value) {
        if (typeof value === 'number') {
            print(`Setting ${prop} to ${value}`);
            return Reflect.set(target, prop, value);
        } else {
            console.error(`Invalid type for ${prop}: value must be a number`);
            return false;
        }
    }
};

const dataObject = new Proxy({}, handler);

dataObject.x = 10;
dataObject.y = 'not a number'; // will trigger an error
print(dataObject.x);
print(dataObject.z); // warns that property doesn't exist

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const ids = idGenerator();
print(ids.next().value);  
print(ids.next().value);  
print(ids.next().value);  
