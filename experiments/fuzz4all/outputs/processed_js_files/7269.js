 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
function* fetchData() {
    yield delay(1000).then(() => ({ data: 'User data', id: 1 }));
    yield delay(1000).then(() => ({ data: 'Post data', userId: 1 }));
    yield delay(1000).then(() => ({ data: 'Comment data', postId: 1 }));
}

 
async function handleGenerator(generator) {
    const results = [];
    for (const promise of generator) {
        const result = await promise;
        results.push(result);
    }
    return results;
}

 
const handler = {
    get: (target, property) => {
        print(`Getting property "${property}"`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property "${property}" to "${value}"`);
        target[property] = value;
        return true;
    },
};

const dataStore = new Proxy({}, handler);

 
(async () => {
    const results = await handleGenerator(fetchData());

     
    results.forEach((result, index) => {
        dataStore[`entry${index}`] = result;
    });

     
    print(dataStore.entry0);
    print(dataStore.entry1);
    print(dataStore.entry2);
})();
