 

 
const target = {
    name: "Advanced JavaScript",
    level: "Complex"
};

const handler = {
    get: (obj, prop) => {
        print(`Getting ${prop}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data fetched!");
        }, 1000);
    });
}

async function asyncOperation() {
    const data = await fetchData();
    print(data);
}

 
class Example {
    constructor(param) {
        this.param = param;
    }
    display() {
        print(`Example parameter: ${this.param}`);
    }
}

const instance = Reflect.construct(Example, ["Reflective"]);
instance.display();

 
const advancedFeature = "Proxy, Promises, Reflect";
print(`Exploring advanced features: ${advancedFeature}`);

 
const map = new Map([
    ['key1', 'value1'],
    ['key2', 'value2']
]);

map.forEach((value, key) => print(`${key}: ${value}`));

 
const config = {
    settings: {
        theme: null
    }
};

const theme = config.settings?.theme ?? 'default';
print(`Theme: ${theme}`);

 
function* generator() {
    yield 'First value';
    yield 'Second value';
}

const gen = generator();
print(gen.next().value);
print(gen.next().value);

 
asyncOperation();

 
print(proxy.name);
proxy.level = "Intermediate";
print(proxy.level);
