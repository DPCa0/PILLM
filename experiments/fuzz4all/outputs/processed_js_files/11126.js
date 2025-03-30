 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ data: 'Sample Data' }), 1000);
});

 
function* dataGenerator() {
    yield 'Generator Start';
    yield fetchData();
    yield 'Generator End';
}

 
const handler = {
    get: (target, prop, receiver) => {
        print(`GET ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value) => {
        print(`SET ${prop} = ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const dataObject = { value: 42 };

 
const proxiedData = new Proxy(dataObject, handler);

 
(async function() {
    const gen = dataGenerator();
    print(gen.next().value);  

     
    const { data } = await gen.next().value; 
    proxiedData.data = data;  

    print(proxiedData.value);  
    print(gen.next().value);  
})();
