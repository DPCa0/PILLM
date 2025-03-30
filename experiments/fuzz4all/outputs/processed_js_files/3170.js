 

 
function* fetchDataSequence() {
    yield fetch('https://api.github.com').then(response => response.json());
    yield fetch('https://api.spacexdata.com/v4/launches/latest').then(response => response.json());
}

async function processData() {
    const dataIterator = fetchDataSequence();
    let iterationResult = dataIterator.next();
    while (!iterationResult.done) {
        try {
            const data = await iterationResult.value;
            print(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        iterationResult = dataIterator.next();
    }
}

 
const targetObject = { name: 'JavaScript', type: 'Programming Language' };
const handler = {
    get: function(target, prop, receiver) {
        print(`Property accessed: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: function(target, prop, value) {
        print(`Property set: ${prop} = ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.name);  
proxyObject.name = 'TypeScript';  

 
const sym1 = Symbol('uniqueKey1');
const sym2 = Symbol('uniqueKey2');
const objectWithSymbols = {
    [sym1]: 'Value for symbol 1',
    [sym2]: 'Value for symbol 2'
};
print(objectWithSymbols[sym1]);  

 
processData();
