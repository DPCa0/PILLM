 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({ data: 'Sample data from ' + url });
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });
}

 
async function getData(url) {
    try {
        const { data } = await fetchData(url);  
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Getting ${property}`);
        return property in target ? target[property] : 'Property not found';
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const targetObject = { name: 'John Doe', age: 30 };

 
const proxy = new Proxy(targetObject, handler);

 
proxy.name;          
proxy.age = 31;      
print(proxy.height);  

 
getData('https://api.example.com/data').then(data => {
    print('Data fetched:', data);
});
