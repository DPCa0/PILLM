 

 
const fetchData = (id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (id < 5) {
            resolve({ id, name: `Item ${id}` });
        } else {
            reject(new Error('ID out of range'));
        }
    }, 1000);
});

 
function* dataLoader(ids) {
    for (let id of ids) {
        try {
            const data = yield fetchData(id);
            print(`Data Loaded: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
}

 
const handler = {
    apply: async (target, thisArg, argumentsList) => {
        const iterator = target(...argumentsList);
        const next = async (iter) => {
            const { value, done } = iter.next();
            if (!done) {
                try {
                    const result = await value;
                    next(iter, result);
                } catch (error) {
                    iter.throw(error);
                }
            }
        };
        next(iterator);
    }
};

 
const proxyLoader = new Proxy(dataLoader, handler);

 
(async () => {
    proxyLoader([1, 2, 3, 4, 5, 6]);
})();
