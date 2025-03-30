 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { user: 'John Doe', age: 30, city: 'New York' };
            Math.random() > 0.1 ? resolve(data) : reject('Failed to fetch data');
        }, 1000);
    });
}

 
const handler = {
    get: (target, property) => {
        print(`Accessed property: ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
(async () => {
    try {
        const data = await fetchData();
        const proxyData = new Proxy(data, handler);

        print(proxyData.user);  

        proxyData.city = 'Los Angeles';  
        print(proxyData.city);

         
        const { user, ...rest } = proxyData;
        print(`User: ${user}, Rest:`, rest);

    } catch (error) {
        console.error(error);
    }
})();
