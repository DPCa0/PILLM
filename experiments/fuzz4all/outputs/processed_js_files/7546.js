 

 
async function fetchData(url) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);  
    if (url !== "https://mockapi.com/data") throw new Error("Invalid URL");
    return { data: "Mock API data" };
}

 
function createObservableObject(obj) {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            print(`Getting property: ${prop}`);
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
            print(`Setting property: ${prop} to ${value}`);
            return Reflect.set(target, prop, value, receiver);
        }
    });
}

 
(async () => {
    try {
        const data = await fetchData("https://mockapi.com/data");
        print("Fetched data:", data);

        const user = createObservableObject({ name: "Alice", age: 25 });
        print("User name:", user.name);
        user.age = 26;
        print("User age:", user.age);
    } catch (error) {
        console.error("Error:", error.message);
    }
})();
