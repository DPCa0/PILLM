 

async function* asyncGenerator() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const data = [10, 20, 30, 40, 50];
    
    for (const value of data) {
        await delay(1000);
        yield value * 2;
    }
}

(async () => {
    try {
        for await (const num of asyncGenerator()) {
            print(`Processed Value: ${num}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();

 

const complexArray = [
    { id: 1, value: 10, active: true },
    { id: 2, value: 15, active: false },
    { id: 3, value: 20, active: true },
    { id: 4, value: 25, active: false }
];

const result = complexArray
    .filter(item => item.active)
    .map(item => ({ ...item, value: item.value * 2 }))
    .reduce((acc, curr) => acc + curr.value, 0);

print(`Total Sum of Active Values Doubled: ${result}`);

 

const targetObject = {
    name: 'JavaScript',
    year: 1995
};

const handler = {
    get(target, prop, receiver) {
        print(`Getting property '${prop}'`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const proxy = new Proxy(targetObject, handler);

proxy.name = 'ECMAScript';
print(`Name: ${proxy.name}`);
proxy.year = 1997;
print(`Year: ${proxy.year}`);
