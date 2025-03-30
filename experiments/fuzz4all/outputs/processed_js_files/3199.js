 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async () => {
    await delay(1000);  
    return { 
        [Symbol.for('data')]: 'secret data', 
        value: 42 
    };
};

const dataHandler = {
    get(target, property) {
        if (property === Symbol.for('data')) {
            return 'Access denied';
        }
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        if (property === 'value') {
            if (typeof value !== 'number') {
                throw new TypeError('Value must be a number');
            }
        }
        return Reflect.set(target, property, value);
    }
};

(async () => {
    try {
        const data = await fetchData();
        const proxy = new Proxy(data, dataHandler);
        
        print(proxy.value);  
        print(proxy[Symbol.for('data')]);  
        
        proxy.value = 100;
        print(proxy.value);  

        proxy.value = 'invalid';  
    } catch (error) {
        console.error(error.message);
    }
})();
