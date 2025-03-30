 

 
const fetchData = (delay, success = true) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve({ data: `Fetched data after ${delay}ms` });
            } else {
                reject('Error fetching data');
            }
        }, delay);
    });
};

 
const createLoggingProxy = (target) => {
    return new Proxy(target, {
        get: (obj, prop) => {
            print(`Accessing property '${prop}': ${obj[prop]}`);
            return obj[prop];
        },
        set: (obj, prop, value) => {
            print(`Setting property '${prop}' to ${value}`);
            obj[prop] = value;
            return true;
        }
    });
};

 
const asyncFunction = async () => {
    try {
        let result1 = await fetchData(1000);
        let result2 = await fetchData(500);
        print('Results:', result1.data, result2.data);

        const user = {
            name: 'Alice',
            age: 30
        };

        const userProxy = createLoggingProxy(user);
        print(userProxy.name);  
        userProxy.age = 31;  

         
        const arr = [1, 2, 3, 4];
        const [first, , third] = arr;  
        print(`Destructured array: first=${first}, third=${third}`);

        const numbers = { ...arr };  
        print('Spread object:', numbers);

    } catch (error) {
        console.error(error);
    }
};

asyncFunction();
