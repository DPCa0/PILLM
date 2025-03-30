 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 
const handler = {
    get: (target, property) => {
        return property in target ? target[property] : 'Property not found';
    }
};

const targetObj = { key1: 'value1', key2: 'value2' };
const proxyObj = new Proxy(targetObj, handler);

 
const uniqueValues = new Set([1, 2, 2, 3, 4, 5]);

 
const array = [1, 2, 3, 4, 5];
const result = array
    .map(num => num * 2)
    .filter(num => num > 5)
    .reduce((acc, num) => acc + num, 0);

 
class Counter {
    #count = 0;

    increment() {
        this.#count++;
    }

    getCount() {
        return this.#count;
    }
}

 
(async () => {
     
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched Data:', data);

     
    print('Proxy Value:', proxyObj.key1);  
    print('Proxy Value:', proxyObj.key3);  

     
    uniqueValues.add(6);
    print('Unique Values:', Array.from(uniqueValues));  

     
    print('Result:', result);  

     
    const counter = new Counter();
    counter.increment();
    counter.increment();
    print('Counter:', counter.getCount());  
})();
