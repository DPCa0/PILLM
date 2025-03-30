 

 
const simulateApiCall = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.1 ? resolve({ data: "Hello from API" }) : reject("API Error");
        }, 1000);
    });
};

async function fetchData() {
    try {
        const response = await simulateApiCall();
        print(response.data);
    } catch (error) {
        console.error(error);
    }
}

 
const handler = {
    get(target, property) {
        print(`Property '${property}' has been accessed.`);
        return property in target ? target[property] : "Property not found!";
    },
    set(target, property, value) {
        print(`Property '${property}' is set to '${value}'.`);
        target[property] = value;
        return true;
    }
};

const user = { name: "Alice", age: 25 };
const proxyUser = new Proxy(user, handler);

 
function* customStepIterator(arr, step) {
    for (let i = 0; i < arr.length; i += step) {
        yield arr[i];
    }
}

const items = ["a", "b", "c", "d", "e", "f"];
const iterator = customStepIterator(items, 2);

print(iterator.next().value);  
print(iterator.next().value);  
print(iterator.next().value);  

 
fetchData();
print(proxyUser.name);  
proxyUser.age = 30;  
