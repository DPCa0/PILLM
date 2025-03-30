 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData() {
    print("Fetching data...");
    await delay(1000);
    return { userId: 1, name: "John Doe", role: "Admin" };
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            return target[property];
        } else {
            console.warn(`Property "${property}" does not exist on target.`);
            return null;
        }
    },
    set(target, property, value) {
        print(`Setting property "${property}" to "${value}"`);
        target[property] = value;
        return true;
    }
};

(async () => {
     
    const user = await fetchData();

     
    const userProxy = new Proxy(user, handler);

     
    print(`Name: ${userProxy.name}`);   
    print(`Age: ${userProxy.age}`);     

     
    userProxy.role = "User";
    print(`Updated role: ${userProxy.role}`);

     
    await delay(500);
    print("Operation complete.");
})();
