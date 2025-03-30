 

 
const fetchData = (data) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (data) resolve(`Fetched data: ${data}`);
        else reject('No data provided');
    }, 1000);
});

 
const loggingHandler = {
    get: (target, prop) => {
        print(`Accessing property: ${prop}`);
        return target[prop];
    }
};

 
const complexObject = {
    name: 'Advanced JS',
    details: {
        level: 'high',
        topics: ['Promises', 'Async/Await', 'Proxies']
    },
    async fetchDetails() {
        try {
            const data = await fetchData(this.name);
            print(data);
        } catch (error) {
            console.error(error);
        }
    }
};

 
const proxiedObject = new Proxy(complexObject, loggingHandler);

 
(async () => {
    try {
        await proxiedObject.fetchDetails();
        
         
        print(proxiedObject.details.level);
        print(proxiedObject.details.topics.join(', '));
    } catch (error) {
        console.error('Error in async function:', error);
    }
})();
