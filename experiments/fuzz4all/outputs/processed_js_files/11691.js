 

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const ids = idGenerator();

const handler = {
    get(target, property) {
        if (property in target) {
            return Reflect.get(target, property);
        } else {
            return `Property "${property}" not found`;
        }
    },
    set(target, property, value) {
        if (typeof value === 'number') {
            return Reflect.set(target, property, value);
        } else {
            throw new TypeError('Values must be numbers');
        }
    }
};

const data = new Proxy({ a: 1, b: 2 }, handler);

async function fetchData() {
    const response = await new Promise((resolve) => setTimeout(() => resolve('Fetched Data!'), 1000));
    print(response);
}

async function run() {
    print(`Next ID: ${ids.next().value}`);
    print(data.a);
    print(data.nonExistent);   
    data.c = 3;   
    try {
        data.d = 'Invalid';   
    } catch (e) {
        console.error(e.message);
    }
    await fetchData();
}

run();
