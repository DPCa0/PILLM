 

 
const UNIQUE_PROPERTY = Symbol('uniqueProperty');

 
const handler = {
    get(target, prop) {
        print(`Accessing ${String(prop)}`);
        return prop in target ? target[prop] : 'Property not found';
    },
    set(target, prop, value) {
        print(`Setting ${String(prop)} to ${value}`);
        if (typeof value === 'number') {
            target[prop] = value;
            return true;
        } else {
            console.error(`Invalid value type for ${String(prop)}: ${value}`);
            return false;
        }
    }
};

let targetObject = { a: 1, b: 2 };
let proxyObject = new Proxy(targetObject, handler);

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

 
async function fetchData(id) {
     
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve({ id, data: `Data for ID ${id}` });
        }, 1000)
    );
}

async function main() {
    proxyObject.c = 3;  
    proxyObject.d = 'Invalid';  

    print(proxyObject.a);  

    const currentId = idGen.next().value;
    const data = await fetchData(currentId);

    proxyObject[UNIQUE_PROPERTY] = data;  

    print(proxyObject[UNIQUE_PROPERTY]);  
}

main();
