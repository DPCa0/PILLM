 

 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

 
const handler = {
    get: function(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return `Property "${prop}" not found`;
        }
    }
};

 
const uniqueId = Symbol('id');

 
const user = {
    name: 'John Doe',
    age: 30,
    [uniqueId]: 1234
};

 
const userProxy = new Proxy(user, handler);

 
(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print('Fetched Data:', data);
    } catch (error) {
        console.error('Fetch Error:', error);
    }

     
    print('User Name:', userProxy.name);  
    print('Unique ID:', userProxy[uniqueId]);  
    print('Unknown Prop:', userProxy.unknown);  
})();
