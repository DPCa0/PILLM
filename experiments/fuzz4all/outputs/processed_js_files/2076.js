 

const fetchData = async (url) => {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) resolve({ data: { user: { name: 'John Doe', age: 30 }, status: 'success' } });
            else reject({ error: 'No URL provided', status: 'fail' });
        }, 1000);
    });
};

const createProxy = (target) => {
    return new Proxy(target, {
        get: (obj, prop) => {
            if (prop in obj) {
                return obj[prop];
            } else {
                console.warn(`Property '${prop}' does not exist on the target object.`);
                return undefined;
            }
        },
        set: (obj, prop, value) => {
            if (typeof value === 'string') {
                obj[prop] = value;
                return true;
            } else {
                console.warn(`Only string values are allowed for property '${prop}'.`);
                return false;
            }
        }
    });
};

(async () => {
    try {
        const response = await fetchData('https://api.example.com/user');
        const { data: { user: { name, age }, status } } = response;  

        print(`Fetched data with status: ${status}`);
        print(`User's Name: ${name}, Age: ${age}`);

        const userProxy = createProxy({});
        userProxy.name = 'Alice Wonderland';  
        userProxy.age = 25;  

        print(`User Proxy Name: ${userProxy.name}`);
        print(`User Proxy Age: ${userProxy.age}`);  

    } catch (error) {
        console.error(`Error: ${error.error}, Status: ${error.status}`);
    }
})();
