 

 
const fetchData = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            id > 0 ? resolve({ id: id, data: `Data for ${id}` }) : reject('Invalid ID');
        }, 1000);
    });
};

 
function* dataGenerator(ids) {
    for (let id of ids) {
        yield fetchData(id);
    }
}

 
const loggerProxy = (target) => {
    return new Proxy(target, {
        get: (obj, prop) => {
            print(`Accessing property "${prop}"`);
            return obj[prop];
        },
    });
};

 
const main = async () => {
    const dataIds = [1, 2, 3, -1, 4];
    const gen = dataGenerator(dataIds);

    for await (const promise of gen) {
        try {
            const data = await promise;
            const proxiedData = loggerProxy(data);
            print(`Fetched: ${proxiedData.data}`);
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }
};

 
main().then(() => print('All operations completed.'));
