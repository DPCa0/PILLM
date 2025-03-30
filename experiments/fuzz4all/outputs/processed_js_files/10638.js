 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "John Doe", age: 30 });
        }, 1000);
    });
}

 
function* dataGenerator() {
    yield fetchData();
    yield fetchData();
}

 
async function consumeGenerator(gen) {
    for (let promise of gen) {
        const data = await promise;
        print('Fetched Data:', data);
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
const user = {
    name: "Alice",
    age: 25
};

 
const proxiedUser = new Proxy(user, handler);

 
proxiedUser.name = "Bob";
print(proxiedUser.name);

 
const gen = dataGenerator();
consumeGenerator(gen);
