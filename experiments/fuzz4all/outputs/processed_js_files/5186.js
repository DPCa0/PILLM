 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'John Doe', age: 28 },
                { id: 2, name: 'Jane Smith', age: 32 },
                { id: 3, name: 'Sam Green', age: 22 }
            ]);
        }, 1000);
    });
}

 
const loggerHandler = {
    get(target, property) {
        print(`Accessed property: ${property}`);
        return Reflect.get(target, property);
    }
};

 
function* processChunks(data, chunkSize) {
    for (let i = 0; i < data.length; i += chunkSize) {
        yield data.slice(i, i + chunkSize);
    }
}

 
(async () => {
    const rawData = await fetchData();
    print("Fetched Data:", rawData);

    const proxiedData = rawData.map(item => new Proxy(item, loggerHandler));

    const chunkSize = 2;
    const chunkProcessor = processChunks(proxiedData, chunkSize);

    for (const chunk of chunkProcessor) {
        print(`Processing chunk:`, chunk);
        chunk.forEach(user => {
            print(`User ID: ${user.id}, Name: ${user.name}, Age: ${user.age}`);
        });
    }

     
    const thirdUser = proxiedData[2]?.name ?? 'No user found';
    print(`Third User: ${thirdUser}`);
})();
