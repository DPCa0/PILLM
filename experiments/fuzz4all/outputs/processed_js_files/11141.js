 

function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

const api = {
    async fetchData(id) {
         
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ id, data: `Data for ID: ${id}` });
            }, 1000);
        });
    }
};

const handler = {
    get: function(target, prop) {
        if (prop === 'fetchData') {
            print(`Intercepting call to fetchData with Proxy for enhanced logging.`);
            return async function(...args) {
                const result = await target[prop](...args);
                print(`Data fetched:`, result);
                return result;
            };
        }
        return Reflect.get(target, prop);
    }
};

const proxiedApi = new Proxy(api, handler);

async function main() {
    for (let i = 0; i < 5; i++) {
        const id = idGen.next().value;
        const data = await proxiedApi.fetchData(id);
        print(`Processed:`, data);
    }
}

main().catch(console.error);
