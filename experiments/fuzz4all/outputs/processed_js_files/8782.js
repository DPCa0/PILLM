 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    await delay(1000);  
    return { message: "Hello, async world!" };
}

 
function createLoggingProxy(target) {
    return new Proxy(target, {
        get(target, prop, receiver) {
            print(`Accessing property: ${String(prop)}`);
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
            print(`Setting property: ${String(prop)} to ${value}`);
            return Reflect.set(target, prop, value, receiver);
        }
    });
}

 
const uniqueKey = Symbol('unique');
const dataStore = {
    [uniqueKey]: "This is a unique property",
    normalKey: "Normal property"
};

const proxyStore = createLoggingProxy(dataStore);

(async () => {
    try {
         
        const data = await fetchData();
        print(data.message);

         
        print(proxyStore[uniqueKey]);  
        print(proxyStore.normalKey);   

        proxyStore.normalKey = "Updated Property";
        print(proxyStore.normalKey);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})();
