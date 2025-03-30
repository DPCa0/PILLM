 

 
const hiddenKey = Symbol('hidden');

 
const loggerProxyHandler = {
    get(target, prop) {
        if (prop === hiddenKey) {
            print('Attempted to access hidden key');
            return undefined;
        }
        print(`Getting property ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const fetchData = async () => {
    return new Promise((resolve) => setTimeout(() => resolve('Fetched Data'), 1000));
};

 
function* numberGenerator() {
    let number = 1;
    while (true) {
        yield number++;
    }
}

(async () => {
     
    const dataStore = new Proxy({ name: 'Advanced JS' }, loggerProxyHandler);

     
    dataStore.name = 'JavaScript Mastery';
    print(dataStore.name);

     
    dataStore[hiddenKey] = 'This is hidden';
    print(dataStore[hiddenKey]);  

     
    const data = await fetchData();
    print(data);

     
    const numbers = numberGenerator();
    print(numbers.next().value);
    print(numbers.next().value);
    print(numbers.next().value);
})();
