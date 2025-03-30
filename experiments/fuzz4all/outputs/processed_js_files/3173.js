 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: "Alice", age: 30, city: "Wonderland" };
            Math.random() > 0.2 ? resolve(data) : reject("Fetch Error");
        }, 1000);
    });
};

 
const processData = async () => {
    try {
        const { name, age, city } = await fetchData();
        print(`Name: ${name}, Age: ${age}, City: ${city}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

 
const handler = {
    apply: (target, thisArg, argumentsList) => {
        print("processData function is being called");
        return Reflect.apply(target, thisArg, argumentsList);
    }
};

const proxiedProcessData = new Proxy(processData, handler);

 
(async () => {
    await proxiedProcessData();
})();
