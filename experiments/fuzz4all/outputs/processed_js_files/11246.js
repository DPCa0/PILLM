 

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({
                    userId: 1,
                    title: 'Async Programming',
                    completed: false,
                    items: [1, 2, 3, 4, 5]
                });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
};

 
const processData = async () => {
    try {
        const { title, items } = await fetchData('https://api.example.com/data');
        
         
        const processedItems = items.map(item => item * 2)
                                     .filter(item => item > 5)
                                     .reduce((sum, item) => sum + item, 0);

        print(`Title: ${title}`);
        print(`Processed Items Sum: ${processedItems}`);
    } catch (error) {
        console.error(error);
    }
};

 
const targetObject = { a: 1, b: 2 };
const handler = {
    get: (obj, prop) => {
        print(`Accessing property: ${prop}`);
        return obj[prop];
    }
};
const proxyObject = new Proxy(targetObject, handler);

 
processData();
print(proxyObject.a);  
