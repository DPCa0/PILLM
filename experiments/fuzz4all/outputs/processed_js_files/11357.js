 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { userId: 1, name: "John Doe", age: 30 };
            Math.random() > 0.2 ? resolve(data) : reject("Fetch Error");
        }, 1000);
    });
}

 
async function getUserData() {
    try {
        const data = await fetchData();
        print("Data fetched:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Getting property "${property}":`, target[property]);
            return target[property];
        } else {
            console.warn(`Property "${property}" does not exist.`);
            return null;
        }
    },
    set: (target, property, value) => {
        print(`Setting property "${property}" to:`, value);
        target[property] = value;
        return true;
    },
    deleteProperty: (target, property) => {
        if (property in target) {
            print(`Deleting property "${property}"`);
            delete target[property];
            return true;
        } else {
            console.warn(`Cannot delete non-existing property "${property}".`);
            return false;
        }
    }
};

 
(async function main() {
    const data = await getUserData();

    if (data) {
        const proxyData = new Proxy(data, handler);

         
        print("User ID:", proxyData.userId);

         
        proxyData.email = "john.doe@example.com";

         
        delete proxyData.age;

         
        print("Non-existent property:", proxyData.nonExistent);

         
        if (Reflect.has(proxyData, 'name')) {
            print("Reflect has property 'name'.");
        }

        print("Final Proxy Data:", proxyData);
    }
})();
