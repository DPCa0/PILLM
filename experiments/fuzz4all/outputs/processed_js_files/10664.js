 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* dataStream() {
    let data = ["Apple", "Banana", "Cherry"];
    let index = 0;
    while (true) {
        if (index >= data.length) {
            index = 0;
        }
        yield data[index++];
    }
}

 
async function fetchData(generator) {
    for (let i = 0; i < 6; i++) {
        print("Fetching data...");
        const data = generator.next().value;
        print(`Received: ${data}`);
        await delay(1000);
    }
}

 
const targetObject = {
    a: 1,
    b: 2,
    c: 3
};

const handler = {
    get: function(target, prop, receiver) {
        print(`Property "${prop}" accessed with value: ${target[prop]}`);
        return Reflect.get(...arguments);
    }
};

const proxy = new Proxy(targetObject, handler);

 
const generator = dataStream();
fetchData(generator);

 
print(proxy.a);
print(proxy.b);
print(proxy.c);
