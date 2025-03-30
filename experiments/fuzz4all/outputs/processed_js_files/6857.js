 

 

 
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
async function fetchData(index) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data ${index}`);
        }, Math.random() * 1000);
    });
}

 
const handler = {
    get: (target, property) => {
        print(`Getting ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const dataStore = new Proxy({}, handler);

async function processData() {
    const dataRange = range(1, 5);
    for (const index of dataRange) {
         
        const data = await fetchData(index);
        dataStore[`data${index}`] = data;   
    }

    for (const index of dataRange) {
         
        print(`Processed: ${dataStore[`data${index}`]}`);
    }
}

 
processData().then(() => print('Processing complete'));

 
const dynamicString = (name, age) => `Hello, my name is ${name} and I am ${age} years old.`;
print(dynamicString('Alice', 30));
