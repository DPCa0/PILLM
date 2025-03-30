 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    print('Fetching data...');
    await delay(2000);  
    return { id: 1, name: 'John Doe', role: 'Developer' };
}

 
const handler = {
    get: (target, property) => {
        print(`Accessed property: ${property}`);
        return Reflect.get(target, property);
    },
    set: (target, property, value) => {
        print(`Updated property: ${property} to ${value}`);
        return Reflect.set(target, property, value);
    }
};

(async () => {
     
    const data = await fetchData();
    const proxiedData = new Proxy(data, handler);

     
    print(`Name: ${proxiedData.name}`);
    proxiedData.role = 'Senior Developer';
    print(`Updated Role: ${proxiedData.role}`);
})();
