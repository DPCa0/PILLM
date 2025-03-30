 

 
const data = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 25 },
    { id: 3, name: "Charlie", age: 35 }
];

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 1000);
    });
};

 
const processData = async () => {
    try {
        const fetchedData = await fetchData();
        print("Data fetched:", fetchedData);

         
        const dataProxy = new Proxy(fetchedData, {
            set(target, property, value) {
                if (property in target) {
                    print(`Property ${property} changed from ${target[property]} to ${value}`);
                }
                target[property] = value;
                return true;
            },
            get(target, property) {
                print(`Property ${property} accessed`);
                return target[property];
            }
        });

         
        dataProxy[1] = { id: 2, name: "Bob", age: 26 };
        print("Updated data:", dataProxy);
    } catch (error) {
        console.error("Error processing data:", error);
    }
};

 
processData();
