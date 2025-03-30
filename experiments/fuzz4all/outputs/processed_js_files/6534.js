 

const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: "Alice", age: 30, location: "Wonderland" };
            Math.random() > 0.5 ? resolve(data) : reject("Failed to fetch data.");
        }, 1000);
    });
};

const processData = async () => {
    try {
        const { name, age, location } = await fetchData();
        const message = `Name: ${name}, Age: ${age}, Location: ${location}`;
        print(message);
        return message;
    } catch (error) {
        console.error(`Error: ${error}`);
        throw new Error(error);
    }
};

(async () => {
    try {
        const result = await processData();
        print(`Processed Data: ${result}`);
    } catch (error) {
        print(`Caught in main: ${error}`);
    }
})();
