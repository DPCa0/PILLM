 

 
const privateData = Symbol('private');

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Accessing ${property}...`);
            return target[property];
        } else {
            throw new Error(`Property ${property} not found`);
        }
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}...`);
        target[property] = value;
        return true;
    }
};

const idGen = idGenerator();
const user = new Proxy({
    name: 'Alice',
    age: 30,
    [privateData]: 'SensitiveInfo',
    getId: function () {
        return idGen.next().value;
    }
}, handler);

 
async function fetchData() {
    print('Fetching data...');
    return new Promise((resolve) => setTimeout(() => resolve('Data received!'), 2000));
}

async function main() {
    try {
        print('User:', user.name);
        user.age = 31;
        print('New Age:', user.age);
        
        print('Generated ID:', user.getId());
        
         
        print('Private Data:', user[privateData]);

    } catch (error) {
        console.error(error.message);
    }

    try {
        const data = await fetchData();
        print(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
