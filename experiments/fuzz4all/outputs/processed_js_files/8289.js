 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.2 ? resolve({ data: 'Success' }) : reject({ error: 'Failed' });
    }, 1000);
});

 
async function* dataGenerator() {
    while (true) {
        try {
            const data = await fetchData();
            yield data.data;
        } catch (e) {
            yield e.error;
        }
    }
}

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Getting ${prop} from target`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const targetObject = {
    status: 'idle'
};

 
const proxyObject = new Proxy(targetObject, handler);

(async () => {
    const gen = dataGenerator();
    for await (let result of gen) {
        proxyObject.status = result;
        print(`Proxy object status: ${proxyObject.status}`);
    }
})();
