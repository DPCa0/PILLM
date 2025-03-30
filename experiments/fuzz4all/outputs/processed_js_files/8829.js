 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: "Hello, complex world!" });
        }, 1000);
    });
}

 
async function getData() {
    try {
        let response = await fetchData();
        print("Data fetched:", response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Property '${prop}' accessed with value: ${target[prop]}`);
            return target[prop];
        } else {
            console.warn(`Property '${prop}' does not exist`);
            return undefined;
        }
    }
};

const targetObj = { message: "Hello from Proxy!" };
const proxy = new Proxy(targetObj, handler);

 
function* messageGenerator() {
    yield "First message";
    yield "Second message";
    yield "Final message";
}

 
const messages = messageGenerator();
for (let msg of messages) {
    print("Generated:", msg);
}

 
getData();

 
print(proxy.message);
print(proxy.nonExistentProperty);
