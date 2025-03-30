 

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const target = { name: 'World', value: 42 };

 
const proxy = new Proxy(target, handler);

 
const fetchGreeting = async () => {
     
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Hello, ${proxy.name}! Your value is ${proxy.value}.`);
        }, 1000);
    });

     
    const message = await promise;
    return message;
};

 
(async () => {
    const { name, value } = proxy;  
    proxy.name = 'JavaScript';  
    print(`Original name: ${name}, value: ${value}`);  
    const greeting = await fetchGreeting();
    print(greeting);
})();
