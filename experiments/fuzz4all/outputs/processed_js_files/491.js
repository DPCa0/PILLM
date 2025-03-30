 

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data retrieved successfully");
        }, 2000);
    });
}

 
async function handlePromises() {
    const promises = [
        fetchData(),
        new Promise((_, reject) => setTimeout(() => reject("Error occurred"), 1000)),
    ];

    const results = await Promise.allSettled(promises);
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            print(`Promise ${index + 1} fulfilled:`, result.value);
        } else {
            console.error(`Promise ${index + 1} rejected:`, result.reason);
        }
    });
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}`);
            return target[property];
        } else {
            console.error(`Property ${property} does not exist`);
        }
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
    }
};

const person = new Proxy({}, handler);
person.name = "Alice";
print(person.name);
print(person.age);

 
(async function main() {
    print("Starting Main Function");

     
    const fib = fibonacci();
    print("Fibonacci Sequence:");
    for (let i = 0; i < 5; i++) {
        print(fib.next().value);
    }

     
    await handlePromises();

    print("Main Function Complete");
})();
