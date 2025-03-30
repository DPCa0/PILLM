 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const handler = {
    get: function(target, prop) {
        print(`Accessing property '${prop}'`);
        return target[prop];
    },
    set: function(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    }
};

 
let user = { name: "Alice", age: 30 };

 
let proxyUser = new Proxy(user, handler);

 
async function fetchUserData() {
    print("Fetching user data...");
    await delay(1000);
    proxyUser.name = "Bob";
    proxyUser.age = 25;
    return proxyUser;
}

 
async function* asyncGenerator() {
    let data = await fetchUserData();
    yield* Object.entries(data);
}

 
(async () => {
    print("User data through async iteration:");
    for await (let [key, value] of asyncGenerator()) {
        print(`${key}: ${value}`);
    }
})();
