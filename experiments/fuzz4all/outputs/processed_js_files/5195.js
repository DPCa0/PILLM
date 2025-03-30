 
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: "Sample data from API" });
            } else {
                reject(new Error("Invalid URL"));
            }
        }, 1000);
    });
}

 
async function getData() {
    try {
        const response = await fetchData("https://api.example.com/data");
        print("Data fetched successfully:", response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

 
function withLogging(fn) {
    return function (...args) {
        print("Calling function with arguments:", args);
        const result = fn(...args);
        print("Function returned:", result);
        return result;
    };
}

 
const sum = withLogging((...numbers) => numbers.reduce((acc, num) => acc + num, 0));

 
const person = new Proxy({}, {
    get(target, property) {
        return property in target ? target[property] : "Property does not exist";
    },
    set(target, property, value) {
        print(`Setting value ${value} to property ${property}`);
        target[property] = value;
        return true;
    }
});

 
function createCounter() {
    let count = 0;
    return {
        increment() {
            count++;
            print("Counter:", count);
        },
        decrement() {
            count--;
            print("Counter:", count);
        }
    };
}

 
(async () => {
    print("Welcome to the Advanced JavaScript Program!");

     
    await getData();

     
    print("Sum of numbers:", sum(1, 2, 3, 4, 5));

     
    person.name = "John Doe";
    print("Person name:", person.name);