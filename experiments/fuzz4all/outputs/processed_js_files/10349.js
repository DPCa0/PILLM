 

 
const uniqueID = Symbol('id');

 
const handler = {
    get(target, property) {
        print(`Getting property ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const targetObject = { [uniqueID]: 42, name: 'Advanced JS' };
const proxyObject = new Proxy(targetObject, handler);

 
async function* fetchNumbers() {
    const numbers = [1, 2, 3, 4, 5];
    for (const num of numbers) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield num;
    }
}

 
async function processNumbers() {
    const numbers = [];
    for await (const num of fetchNumbers()) {
        numbers.push(num);
    }
    return numbers;
}

 
proxyObject.name = 'Updated JS';
print(proxyObject.name);

 
(async () => {
    print('Fetching numbers...');
    const numbers = await processNumbers();
    print('Fetched numbers:', numbers);

     
    print(`Unique ID is: ${proxyObject[uniqueID]}`);
})();
