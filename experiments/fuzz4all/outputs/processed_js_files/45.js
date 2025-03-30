 

 
const hidden = Symbol('hiddenProperty');

 
const handler = {
    get(target, property, receiver) {
        if (property === hidden) return 'You found the hidden property!';
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        if (property === 'id') {
            if (typeof value !== 'number') {
                throw new Error('ID must be a number');
            }
        }
        return Reflect.set(target, property, value, receiver);
    }
};

 
const user = new Proxy({
    name: 'Alice',
    age: 30,
    [hidden]: 'Secret Code'
}, handler);

 
async function* fetchData() {
    const dataPromises = [
        Promise.resolve({ id: 1, data: 'First' }),
        Promise.resolve({ id: 2, data: 'Second' }),
        Promise.resolve({ id: 3, data: 'Third' })
    ];

    for await (const item of dataPromises) {
        yield item;
    }
}

 
async function process() {
    for await (const { id, data } of fetchData()) {
        print(`Processing item #${id}: ${data}`);
    }
}

 
(async () => {
    print(`User Name: ${user.name}`);
    print(user[hidden]);
    user.id = 42;  
    try {
        user.id = 'not a number';  
    } catch (e) {
        console.error(e.message);
    }

    await process();
})();
