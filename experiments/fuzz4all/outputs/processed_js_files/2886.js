 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Data fetched!"), 1000);
    });
};

 
function* fetchDataGenerator() {
    yield fetchData();
    yield fetchData();
}

 
async function handleGenerator(gen) {
    for (let value of gen) {
        print(await value);
    }
}

 
const target = {
    a: 1,
    b: 2,
    c: 3
};

const handler = {
    get: (obj, prop) => {
        print(`Getting ${prop}: ${obj[prop]}`);
        return Reflect.get(...arguments);
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const proxy = new Proxy(target, handler);

 
proxy.a;        
proxy.b = 42;   
proxy.c;        

 
handleGenerator(fetchDataGenerator());
