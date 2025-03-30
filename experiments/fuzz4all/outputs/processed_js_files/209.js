 

 
function createReactiveObject(target, callback) {
    const handler = {
        set(obj, prop, value) {
            obj[prop] = value;
            callback(prop, value);
            return true;
        }
    };
    return new Proxy(target, handler);
}

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: "John Doe", age: 28 });
        }, 1000);
    });
}

 
async function main() {
    let user = await fetchData();
    user = createReactiveObject(user, (prop, value) => {
        print(`Property ${prop} changed to ${value}`);
    });

    print(`Initial Data: Name - ${user.name}, Age - ${user.age}`);

     
    setTimeout(() => {
        user.name = "Jane Smith";
    }, 2000);
}

 
main();
