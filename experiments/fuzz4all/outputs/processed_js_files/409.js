Certainly! Below is a JavaScript program that uses several advanced features, including Promises, async/await, destructuring, spread operator, and classes:

class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        print(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        print(`${this.name} barks.`);
    }
}

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: [1, 2, 3, 4, 5] });
            } else {
                reject(new Error("Invalid URL"));
            }
        }, 1000);
    });
};

const processData = async (url) => {
    try {
        const { data } = await fetchData(url);
        const [first, ...rest] = data;
        print(`First item: ${first}`);
        print(`Remaining items: ${rest}`);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
};

const main = async () => {
    const dog = new Dog('Rex');
    dog.speak();
    await processData("https://api.example.com/data");
};

main();

This script defines a simple class hierarchy with `Animal` and `Dog`, demonstrating inheritance. It also showcases asynchronous operations using `async/await` and `Promise`. The `fetchData` function simulates data fetching, and `processData` demonstrates destructuring and handling Promises. The script executes these functions in the `main` function.