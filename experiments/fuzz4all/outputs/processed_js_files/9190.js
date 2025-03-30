 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function asyncProcess(array) {
    let result = [];
    for (let item of array) {
        await delay(500);   
        result.push(item * 2);
    }
    return result;
}

 
function* generator(array) {
    for (let item of array) {
        yield item;
    }
}

 
const handler = {
    get: function(target, property, receiver) {
        print(`Getting ${property}...`);
        return Reflect.get(target, property, receiver);
    },
    set: function(target, property, value, receiver) {
        print(`Setting ${property} to ${value}...`);
        return Reflect.set(target, property, value, receiver);
    }
};

 
let data = { value: 10 };
let proxyData = new Proxy(data, handler);

 
(async () => {
    print("Original array:", proxyData.value);
    let array = [1, 2, 3, 4, 5];
    
     
    let processedArray = await asyncProcess(array);
    proxyData.value = processedArray;
    
    print("Processed array (doubled):", proxyData.value);
    
     
    const gen = generator(proxyData.value);
    for (let item of gen) {
        print("Generated value:", item);
    }
})();
