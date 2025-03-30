 

 
const handler = {
    get: (target, property) => {
        print(`Getting ${property}`);
        return property in target ? target[property] : 'Property not found';
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const targetObject = { a: 1, b: 2 };

 
const proxyObject = new Proxy(targetObject, handler);

 
function* dataGenerator(data) {
    for (const item of data) {
        yield item;
    }
}

 
async function processData(generator, delay = 1000) {
    for (const value of generator) {
        await new Promise(resolve => setTimeout(resolve, delay));
        print(`Processed: ${value}`);
    }
}

 
const dataArray = [10, 20, 30, 40, 50];
const [first, second, ...rest] = dataArray;

 
(async function execute() {
     
    proxyObject.a;  
    proxyObject.c = 3;  

     
    const generator = dataGenerator(dataArray);
    
     
    await processData(generator);

    print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
})();
