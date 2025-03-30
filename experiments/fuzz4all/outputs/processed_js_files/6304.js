 
async function fetchData() {
     
    const data = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({ user: 'John Doe', age: 30, location: 'New York' });
        }, 1000);
    });

    return data;
}

 
const dataHandler = {
    get: (target, property) => {
        print(`Accessing property "${property}"`);
        return target[property] || 'Property not found';
    }
};

 
function* userGenerator() {
    yield { user: 'Jane Doe', age: 28, location: 'Los Angeles' };
    yield { user: 'Jake Smith', age: 35, location: 'Chicago' };
}

 
(async () => {
    const additionalData = { occupation: 'Engineer', company: 'Tech Corp' };

    const fetchedData = await fetchData();
    const proxiedData = new Proxy(fetchedData, dataHandler);

    print(`User: ${proxiedData.user}, Age: ${proxiedData.age}`);
    const completeData = { ...proxiedData, ...additionalData };
    print(completeData);

     
    const userGen = userGenerator();
    for (const user of userGen) {
        print(`Generated User: ${user.user}, Location: ${user.location}`);
    }
})();
