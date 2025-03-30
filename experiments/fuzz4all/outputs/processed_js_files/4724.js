 
async function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: `Data from ${url}` });
        }, 1000);
    });
}

 
const handler = {
    get: (target, property) => {
        print(`Accessed property "${property}"`);
        return Reflect.get(target, property);
    }
};

 
const user = new Proxy({ name: "Alice", age: 30 }, handler);

 
function* generateID() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const idGenerator = generateID();

 
(async () => {
    print("Starting data processing...");

     
    const userInfo = `User: ${user?.name}, Age: ${user?.age}`;
    print(userInfo);

     
    const { name, ...rest } = user;
    print(`Name: ${name}, Other info:`, rest);

     
    const data1 = await fetchData("https://api.example.com/resource1");
    const data2 = await fetchData("https://api.example.com/resource2");

     
    const [result1, result2] = await Promise.all([data1, data2]);
    print(`Fetched data 1: ${result1.data}, data 2: ${result2.data}`);

     
    const uniqueID = Symbol('id');
    user[uniqueID] = idGenerator.next().value;
    print(`User unique ID: ${user[uniqueID]}`);

    print("Data processing completed.");
})();
