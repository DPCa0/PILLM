 
async function* fetchUserData() {
    const users = [
        { id: 1, name: "Alice", age: 28 },
        { id: 2, name: "Bob", age: 34 },
        { id: 3, name: "Charlie", age: 25 }
    ];
    for (const user of users) {
         
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
        yield user;
    }
}

 
const loggingHandler = {
    get(target, prop) {
        print(`Accessing property '${prop}'`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value);
    }
};

 
(async () => {
    const userDataIterator = fetchUserData();

    for await (const userData of userDataIterator) {
         
        const proxiedUser = new Proxy(userData, loggingHandler);

         
        const { name, age = "Unknown" } = proxiedUser;
        print(`User: ${name}, Age: ${age}`);

         
        print(`Welcome, ${name}!`);
        
         
        proxiedUser.status = "Active";
    }

     
    const names = new Set(["Alice", "Bob"]);
    names.add("Charlie").add("Alice");

     
    for (const name of names) {
        print(`Unique name: ${name}`);
    }
})();
