 

 
const mockApi = {
    data: {
        user1: { name: 'Alice', age: 30 },
        user2: { name: 'Bob', age: 25 },
        user3: { name: 'Charlie', age: 35 }
    }
};

 
const fetchData = (user) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            mockApi.data[user] ? resolve(mockApi.data[user]) : reject('User not found');
        }, 1000);
    });
};

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Fetching data for ${prop}...`);
            return Reflect.get(target, prop);
        } else {
            return async () => {
                try {
                    const data = await fetchData(prop);
                    target[prop] = data;   
                    print(`Data for ${prop} has been fetched and cached.`);
                    return data;
                } catch (error) {
                    print(error);
                }
            };
        }
    }
};

 
const userFetcher = new Proxy({}, handler);

 
(async () => {
    print(await userFetcher.user1);  
    print(await userFetcher.user4());  
    print(await userFetcher.user4);  
})();
