 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({ data: `Data from ${url}` });
            } else {
                reject('URL not provided');
            }
        }, 1000);
    });
}

 
async function getData(url) {
    try {
        const response = await fetchData(url);
        print(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

 
function processData(...dataItems) {
    const [firstItem, ...restItems] = dataItems;
    print('First item:', firstItem);
    print('Rest of the items:', restItems);
}

 
const handler = {
    get: (target, property) => {
        print(`Getting property ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const targetObject = { name: 'Alice', age: 25 };
const proxy = new Proxy(targetObject, handler);

 
(async () => {
    await getData('https://api.example.com/data');
    processData('apple', 'banana', 'cherry');
    proxy.name = 'Bob';      
    print(proxy.age);  
})();
