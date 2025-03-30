 

 
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

 
async function fetchData(number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Fetched data for number: ${number}`);
        }, 1000);
    });
}

 
const handler = {
    get: function(target, prop) {
        print(`Accessed property: ${prop}`);
        return target[prop];
    },
    set: function(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const data = { name: 'Proxy Test' };
const proxyData = new Proxy(data, handler);

 
async function processNumbers() {
    const numbers = numberGenerator();
    for (const num of numbers) {
        const result = await fetchData(num);
        print(result);
    }
}

 
proxyData.name = 'Updated Name';   
print(proxyData.name);       

 
processNumbers();
