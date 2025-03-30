 
const dataHandler = {
    get: async (target, prop) => {
        if (!(prop in target)) {
            target[prop] = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(`Fetched value for ${prop}`);
                }, 1000);
            });
        }
        return target[prop];
    }
};

async function main() {
    const dataProxy = new Proxy({}, dataHandler);

     
    const keys = ['name', 'age', 'occupation'];
    const results = await Promise.all(keys.map(async (key) => {
        return { [key]: await dataProxy[key] };
    }));

     
    const data = results.reduce((acc, item) => ({ ...acc, ...item }), {});

     
    print(data);
}

main().catch(err => console.error('Error:', err));
