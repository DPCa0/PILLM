 

const api = {
    fetchUserData: async () => {
         
        return new Promise((resolve) => {
            setTimeout(() => resolve({ name: 'John Doe', age: 30, email: 'john@example.com' }), 1000);
        });
    }
};

 
const createUserProxy = (user) => {
    return new Proxy(user, {
        get: (target, property) => {
            print(`Accessing property: ${property}`);
            return target[property];
        },
        set: (target, property, value) => {
            print(`Setting property: ${property} to ${value}`);
            target[property] = value;
            return true;
        }
    });
};

 
const processUserData = async () => {
    const userData = await api.fetchUserData();
    
     
    const { name, ...rest } = userData;
    
     
    const userProxy = createUserProxy(rest);
    
    print(`User Name: ${name}`);
    print(`User Details (Proxied): ${JSON.stringify(userProxy)}`);
    
     
    userProxy.email = 'john.doe@example.com';
};

processUserData();
