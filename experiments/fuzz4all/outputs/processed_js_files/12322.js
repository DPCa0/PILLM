 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
function* generateNumbers(start, end) {
    for (let i = start; i <= end; i++) {
        yield delay(500).then(() => i);   
    }
}

 
async function consumeGenerator(gen) {
    for (let num of gen) {
        const value = await num;   
        print(`Generated number: ${value}`);
    }
}

 
const targetObject = { message: "Hello Proxy!" };
const handler = {
    get(target, property) {
        print(`Accessing property: ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};
const proxy = new Proxy(targetObject, handler);

 
proxy.message;   
proxy.newProp = "This is a new property";   

 
const numberGen = generateNumbers(1, 5);
consumeGenerator(numberGen);

print(proxy.message);   
