 

 
function* dataGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve('Data 1'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Data 2'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Data 3'), 1000));
}

 
async function fetchData() {
    const dataGen = dataGenerator();
    for (let promise of dataGen) {
        print(await promise);
    }
}

 
const handler = {
    get(target, property) {
        return property in target ? target[property] : `Property ${property} not found`;
    },
    set(target, property, value) {
        if (typeof value === 'number') {
            target[property] = value;
            return true;
        } else {
            print(`Attempt to set non-numeric value to ${property}`);
            return false;
        }
    }
};

 
const dataProxy = new Proxy({}, handler);

 
dataProxy.validNumber = 42;
print(dataProxy.validNumber);  

dataProxy.invalidNumber = 'hello';  
print(dataProxy.invalidNumber);  

 
fetchData();
