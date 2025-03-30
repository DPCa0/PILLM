 
const handler = {
    get(target, property) {
        print(`Getting property: ${property}`);
        return property in target ? target[property] : 42;
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

 
Reflect.set(proxy, 'c', 3);
print(Reflect.get(proxy, 'a'));   
print(Reflect.get(proxy, 'c'));   

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Data fetched!"), 1000);
    });
}

async function processData() {
    try {
        const data = await fetchData();
        print(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

processData();

 
const user = { name: "Alice", age: 30, location: "Wonderland" };
const { name, ...rest } = user;

print(name);  
print(rest);  

 
function createMultiplier(multiplier) {
    return function (num) {
        return num * multiplier;
    };
}

const double = createMultiplier(2);
print(double(5));  
