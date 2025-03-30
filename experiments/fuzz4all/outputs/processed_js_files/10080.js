 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ value: 42 }), 1000);
    });
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}: ${target[prop]}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
(async () => {
    let data = await fetchData();

     
    const reactiveData = new Proxy(data, handler);

     
    print('Initial Value:', reactiveData.value);
    reactiveData.value = 100;

     
    if (Reflect.has(reactiveData, 'value')) {
        print('The value is:', Reflect.get(reactiveData, 'value'));
    }
})();
