 

 
const fetchData = (resource) => new Promise((resolve, reject) => {
    const time = Math.random() * 2000;
    setTimeout(() => {
        if (resource) {
            resolve({ data: `Resource data for ${resource}`, time: time.toFixed(2) });
        } else {
            reject('No resource provided');
        }
    }, time);
});

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Fetching ${prop}`);
            return target[prop];
        }
        console.warn(`${prop} does not exist on target`);
        return 'Fallback data';
    }
};

const resources = new Proxy({}, handler);

 
(async () => {
    try {
        const results = await Promise.all([
            fetchData('User'),
            fetchData('Posts'),
            fetchData('Comments')
        ]);

        results.forEach(result => {
            resources[result.data.split(' ')[3]] = result.data;
            print(`Fetched ${result.data} in ${result.time}ms`);
        });

         
        print(resources.User);       
        print(resources.Posts);      
        print(resources.Likes);      

    } catch (error) {
        console.error('Error fetching resources:', error);
    }
})();
