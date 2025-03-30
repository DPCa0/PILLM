 

 
const fetchData = (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 2000);
    });
};

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            return target[property];
        } else {
            return `Property "${property}" not found`;
        }
    }
};

 
const targetObject = {
    api: async function(url) {
         
        try {
            print(`Fetching data from: ${url}`);
            let data = await fetchData(url);
            print(`Data received: ${data}`);
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }
};

 
const proxy = new Proxy(targetObject, handler);

 
(async () => {
     
    await proxy.api('https://api.example.com/data');

     
    print(proxy.nonExistentProperty);
})();
