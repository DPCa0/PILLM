 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { user: 'Alice', age: 25, city: 'Wonderland' };
            resolve(data);
        }, 1000);
    });
};

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Getting ${prop}`);
        return Reflect.get(...arguments);
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
const handleData = async () => {
    try {
        const data = await fetchData();
        const proxiedData = new Proxy(data, handler);

         
        print(proxiedData.user);
        proxiedData.age = 30;

         
        const { user, age } = proxiedData;
        print(`User: ${user}, Age: ${age}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
handleData();
