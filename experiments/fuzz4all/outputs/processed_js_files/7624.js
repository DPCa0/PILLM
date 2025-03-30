 

 
const loggerHandler = {
    get(target, property, receiver) {
        print(`Accessing property: ${property}`);
        return Reflect.get(target, property, receiver);
    }
};

const data = {
    name: 'John Doe',
    age: 30,
    role: 'Developer'
};

const proxyData = new Proxy(data, loggerHandler);

 
function* fetchData() {
    yield new Promise((resolve) => setTimeout(() => resolve('Data 1'), 1000));
    yield new Promise((resolve) => setTimeout(() => resolve('Data 2'), 2000));
    yield new Promise((resolve) => setTimeout(() => resolve('Data 3'), 1000));
}

 
async function processData() {
    const dataGenerator = fetchData();
    for await (let value of dataGenerator) {
        print(`Processing: ${value}`);
    }
}

 
Promise.resolve()
    .then(() => {
        print(`User: ${proxyData.name}`);
        print(`Role: ${proxyData.role}`);
        return proxyData.age;
    })
    .then((age) => {
        print(`Age: ${age}`);
        return processData();
    })
    .catch((err) => console.error(`Error: ${err}`));
