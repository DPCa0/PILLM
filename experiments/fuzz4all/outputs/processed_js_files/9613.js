 

 
const fetchData = (id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (id > 0) {
            resolve({ id, data: `Data for id ${id}` });
        } else {
            reject('Invalid ID');
        }
    }, 1000);
});

 
async function* dataGenerator(ids) {
    for (const id of ids) {
        try {
            const data = await fetchData(id);
            yield data;
        } catch (error) {
            yield { error };
        }
    }
}

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            return target[property];
        } else {
            return `No such property: ${property}`;
        }
    }
};

 
async function main() {
    const ids = [1, 2, -1, 3];
    const dataProxy = new Proxy({}, handler);

    for await (const result of dataGenerator(ids)) {
        if (result.error) {
            print(`Error: ${result.error}`);
        } else {
            dataProxy[result.id] = result.data;
        }
    }

    print('Fetched Data:', dataProxy);
    print('Accessing non-existent property:', dataProxy.nonExistentProp);
}

main();
