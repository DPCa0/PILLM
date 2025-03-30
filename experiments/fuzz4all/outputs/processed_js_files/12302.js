 

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ name: "Alice", age: 30, role: "developer" });
            } else {
                reject("Invalid URL");
            }
        }, 1000);
    });
};

 
const dataHandler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property ${prop}`);
            return target[prop];
        } else {
            console.warn(`Property ${prop} not found`);
            return undefined;
        }
    },
    set: (target, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const processData = async () => {
    try {
        const response = await fetchData("https://api.example.com/data");
        const { name, age, role } = response;

        print("Data fetched: ", response);

        const userProxy = new Proxy(response, dataHandler);

         
        print(`Name: ${userProxy.name}`);
        print(`Age: ${userProxy.age}`);
        print(`Role: ${userProxy.role}`);

         
        print(`Location: ${userProxy.location}`);

         
        userProxy.role = "senior developer";

         
        print(`Updated Role: ${userProxy.role}`);

    } catch (error) {
        console.error("Error:", error);
    }
};

 
processData();
