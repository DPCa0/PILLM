 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: { name: "John Doe", age: 30, location: "New York" } });
        }, 1000);
    });
}

 
async function processUserData() {
    try {
        const response = await fetchData();
        const user = response.data;

         
        const userProxy = new Proxy(user, {
            get(target, property) {
                if (property in target) {
                    print(`Getting property: ${property}`);
                    return target[property];
                } else {
                    throw new Error(`Property ${property} does not exist.`);
                }
            },
            set(target, property, value) {
                print(`Setting property: ${property} to ${value}`);
                target[property] = value;
                return true;
            }
        });

        print(`User name: ${userProxy.name}`);
        userProxy.age = 31;
        print(`Updated age: ${userProxy.age}`);

    } catch (error) {
        console.error("Error processing user data:", error);
    }
}

 
(async () => {
    await processUserData();
})();
