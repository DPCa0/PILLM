 

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Getting property '${prop}'`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const originalObject = { greeting: "Hello", name: "World" };
const proxiedObject = new Proxy(originalObject, handler);

 
const asyncTask = (duration) => {
    return new Promise((resolve, reject) => {
        if (duration < 0) {
            reject("Invalid duration");
        } else {
            setTimeout(() => resolve("Task completed"), duration);
        }
    });
};

 
(async () => {
    try {
        proxiedObject.greeting = "Hi";  
        print(proxiedObject.greeting);  

        const result = await asyncTask(1000);
        print(result);

        proxiedObject.name = "JavaScript";
        print(`${proxiedObject.greeting}, ${proxiedObject.name}!`);
    } catch (error) {
        console.error("Error:", error);
    }
})();
