 

 
function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData() {
    await simulateDelay(1000);
    return { name: "John", age: 30, city: "New York" };
}

 
async function processData() {
    const { name, age, city } = await fetchData();
    return `Name: ${name}, Age: ${age}, City: ${city}`;
}

 
const uniqueItems = new Set([1, 2, 3, 4, 5, 5, 4]);

 
const userMap = new Map();
userMap.set("user1", { id: 1, name: "Alice" });
userMap.set("user2", { id: 2, name: "Bob" });

 
const target = { message: "Hello, world!" };
const handler = {
    get: function(obj, prop) {
        print(`Getting ${prop}`);
        return obj[prop];
    },
    set: function(obj, prop, value) {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};
const proxy = new Proxy(target, handler);

 
(async () => {
    print(await processData());

    print("Unique Items:", [...uniqueItems]);
    print("User Map:", Array.from(userMap.entries()));

    print(proxy.message);  
    proxy.message = "Hi, Proxy!";  
    print(proxy.message);
})();
