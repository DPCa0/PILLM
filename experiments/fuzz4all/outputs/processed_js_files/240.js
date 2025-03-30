 

const fetchData = async () => {
     
    return new Promise(resolve => setTimeout(() => resolve({
        user: {
            name: 'Alice',
            age: 30,
            address: {
                city: 'Wonderland',
                zip: '12345'
            }
        },
        items: [1, 2, 3, 4, 5]
    }), 1000));
};

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Property "${prop}" accessed`);
            return target[prop];
        } else {
            throw new Error(`Property "${prop}" does not exist.`);
        }
    }
};

(async () => {
    const data = await fetchData();
    const { user: { name, age }, items } = data;
    const userProxy = new Proxy({ name, age }, handler);

    print(`User: ${userProxy.name}, Age: ${userProxy.age}`);

    items.forEach(item => {
        print(`Item ${idGen.next().value}: ${item}`);
    });
})();
