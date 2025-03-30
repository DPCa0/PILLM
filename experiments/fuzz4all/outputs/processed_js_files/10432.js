 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Data retrieved"), 1000);
    });
}

 
async function* dataGenerator() {
    yield await fetchData();
    yield await fetchData();
}

 
const uniqueKey = Symbol("unique");

 
const handler = {
    get(target, prop, receiver) {
        if (prop === uniqueKey) {
            return "Accessing a secret value!";
        }
        return Reflect.get(target, prop, receiver);
    }
};

const obj = new Proxy({name: "Proxy Object"}, handler);

 
(async () => {
    print("Starting data fetch...");
    
     
    const generator = dataGenerator();
    print(await generator.next().value);  
    print(await generator.next().value);  
    
     
    print(obj.name);  
    print(obj[uniqueKey]);  
})();
