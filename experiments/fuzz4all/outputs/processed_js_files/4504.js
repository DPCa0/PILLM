 

 
const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: { user: { name: 'John Doe', age: 30 }, status: 'active' } });
        }, 1000);
    });
};

 
const createProxy = (obj) => {
    return new Proxy(obj, {
        get(target, prop) {
            print(`Property '${prop}' accessed`);
            return target[prop];
        },
        set(target, prop, value) {
            print(`Property '${prop}' set to ${value}`);
            target[prop] = value;
            return true;
        }
    });
};

 
(async () => {
    try {
         
        const response = await fetchData();
        
         
        const { data: { user: { name, age }, status } } = response;
        
         
        const user = createProxy({ name, age, status });
        
         
        print(`User Name: ${user.name}`);
        print(`User Age: ${user.age}`);
        
         
        user.status = 'inactive';
        print(`User Status: ${user.status}`);
    } catch (error) {
        console.error('Error:', error);
    }
})();
