 

function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

const apiCall = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id, data: `data for id ${id}` });
        }, Math.random() * 1000);
    });
};

const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        } else {
            return `Property ${prop} does not exist`;
        }
    },
    set: (target, prop, value) => {
        if (typeof value === 'string') {
            return Reflect.set(target, prop, value);
        } else {
            console.warn(`Failed to set ${prop} as value is not a string`);
            return false;
        }
    }
};

const dataStore = new Proxy({}, handler);

const fetchDataAndStore = async () => {
    for (let i = 0; i < 5; i++) {
        const id = idGen.next().value;
        try {
            const response = await apiCall(id);
            dataStore[`id_${id}`] = response.data;
            print(`Stored: id_${id} -> ${response.data}`);
        } catch (error) {
            console.error(`Error fetching data for id ${id}: ${error}`);
        }
    }
};

fetchDataAndStore();
