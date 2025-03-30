 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: "Alice", age: 30 });
        }, 1000);
    });
}

 
async function getData() {
    const data = await fetchData();
    return data;
}

 
function* objectIterator(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

 
const loggingHandler = {
    get(target, property) {
        print(`Accessing property: ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
(async function main() {
    const user = await getData();

     
    const proxyUser = new Proxy(user, loggingHandler);

     
    print(`Name: ${proxyUser.name}`);
    print(`Age: ${proxyUser.age}`);

     
    print("Iterating over user properties:");
    const iterator = objectIterator(proxyUser);
    for (let [key, value] of iterator) {
        print(`${key}: ${value}`);
    }

     
    proxyUser.age = 31;
})();

