 

 
const _data = Symbol('data');

 
const handler = {
    get(target, prop, receiver) {
        if (prop === _data) {
            return Reflect.get(target, prop, receiver);
        }
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        
        let { title, body, userId } = data;  
        return { title, body, userId }; 
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
class DataProcessor {
    constructor(data) {
        this[_data] = new Proxy(data, handler);
    }

    async processData() {
        let { title, body, userId } = this[_data];
        print(`Processing data for user ${userId}: ${title}`);
        return { summary: title, details: body };
    }
}

 
const url = 'https://jsonplaceholder.typicode.com/posts/1';

(async () => {
    const rawData = await fetchData(url);
    const processor = new DataProcessor(rawData);

    const result = await processor.processData();
    print('Processed Data:', result);
})();

This JavaScript program demonstrates several advanced features such as `Proxy` for intercepting object operations, `Reflect` for performing default operations, `async/await` for asynchronous control flow, destructuring assignment for object extraction, and `Symbol` for handling private data in a class.