 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: "Alice", age: 30, location: "Wonderland" });
        }, 1000);
    });
};

 
const dataHandler = {
    get(target, prop) {
        if (prop === "name") {
            return target[prop].toUpperCase();
        }
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

(async function main() {
    try {
         
        const rawData = await fetchData();

         
        const { name, age, location } = rawData;

        print(`Destructured Data: Name - ${name}, Age - ${age}, Location - ${location}`);

         
        const userData = new Proxy({ name, age, location }, dataHandler);

         
        print(`Proxied Name: ${userData.name}`);
        
         
        userData.age = 31;
        print(`Updated Age: ${userData.age}`);

    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
