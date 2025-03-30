 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: 'Alice', age: 30 });
        }, 1000);
    });
}

 
function* dataGenerator() {
    const data = yield fetchData();
    print('Generator:', data);
}

 
async function runGenerator(genFunc) {
    const gen = genFunc();
    let result = gen.next();

    while (!result.done) {
        const data = await result.value;
        result = gen.next(data);
    }
}

 
const logHandler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const person = {
    name: 'Bob',
    age: 25,
};

 
const proxiedPerson = new Proxy(person, logHandler);

 
let { name, age } = proxiedPerson;

 
proxiedPerson.name = 'Charlie';
proxiedPerson.age = 40;

 
runGenerator(dataGenerator);
