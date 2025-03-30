class AdvancedExample {
    #privateField = "I'm private!";  

    constructor(data) {
        this.data = data;
    }

     
    async fetchData(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

     
    get ['privateInfo']() {
        return this.#privateField;
    }

     
    static mergeObjects(...objects) {
        return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});
    }

     
    *dataIterator() {
        for (let item of this.data) {
            yield item;
        }
    }
}

 
function timeExecution(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.time(key);
        const result = originalMethod.apply(this, args);
        console.timeEnd(key);
        return result;
    };
    return descriptor;
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        } else {
            return `Property ${prop} does not exist`;
        }
    }
};

(async () => {
    const apiExample = new AdvancedExample(['one', 'two', 'three']);
    const proxyExample = new Proxy(apiExample, handler);
    
     
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    const fetchedData = await apiExample.fetchData(apiUrl);
    print('Fetched Data:', fetchedData);

     
    const merged = AdvancedExample.mergeObjects({ a: 1 }, { b: 2 }, { a: 3 });
    print('Merged Objects:', merged);
    print('Private Field:', proxyExample.privateInfo);

     
    print('Iterating over data:');
    for (let item of apiExample.dataIterator()) {
        print(item);
    }

     
    console.log('Accessing an