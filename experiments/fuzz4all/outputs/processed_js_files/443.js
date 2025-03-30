 
 

const fetchData = async () => {
     
    const promise = new Promise((resolve) => {
        setTimeout(() => resolve({ data: 'Hello, world!', status: 200 }), 1000);
    });
    return promise;
};

const createHandler = () => {
    return {
        get: (target, prop, receiver) => {
            print(`Getting property ${prop}`);
            return Reflect.get(target, prop, receiver);
        },
        set: (target, prop, value) => {
            print(`Setting property ${prop} to ${value}`);
            return Reflect.set(target, prop, value);
        }
    };
};

const main = async () => {
    const response = await fetchData();  
    const proxyResponse = new Proxy(response, createHandler());

    print(proxyResponse.data);  
    proxyResponse.data = 'Hello, Proxy!';  
    print(proxyResponse.data);  
};

main().catch(console.error);
