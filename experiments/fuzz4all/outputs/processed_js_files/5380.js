 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ user: { name: 'John Doe', age: 30, location: 'Earth' }, score: 100 });
        }, 1000);
    });
};

 
const handler = {
    get(target, prop, receiver) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
(async () => {
     
    const data = await fetchData();
    
     
    const proxyData = new Proxy(data, handler);
    
     
    const { user: { name = 'Anonymous', age = 0, location = 'Unknown' }, score = 0 } = proxyData;
    
     
    print(`Name: ${name}, Age: ${age}, Location: ${location}, Score: ${score}`);
    
     
    proxyData.user.name = 'Jane Doe';
    proxyData.score += 10;
    
     
    print(proxyData.user.name);
    print(proxyData.score);
})();
