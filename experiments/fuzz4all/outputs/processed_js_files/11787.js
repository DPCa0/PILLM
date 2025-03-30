 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.3;  
            success ? resolve({ data: "Fetched Data" }) : reject("Fetch Error");
        }, 1000);
    });
}

 
async function getData() {
    try {
        const response = await fetchData();
        print(`Data Received: ${response.data}`);
    } catch (error) {
        console.error(error);
    }
}

 
const handler = {
    get(target, property, receiver) {
        print(`Getting ${property}`);
        return Reflect.get(...arguments);
    },
    set(target, property, value, receiver) {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
const targetObject = { message: "Hello" };
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.message = "Hello, World!";
print(proxyObject.message);

 
getData();

 
const methodCaller = (obj, methodName, args) => {
    if (typeof obj[methodName] === 'function') {
        return Reflect.apply(obj[methodName], obj, args);
    } else {
        throw new TypeError(`${methodName} is not a function`);
    }
};

 
const calculator = {
    add(a, b) {
        return a + b;
    }
};

try {
    const result = methodCaller(calculator, 'add', [5, 10]);
    print(`Dynamic Method Result: ${result}`);
} catch (error) {
    console.error(error);
}
