 

 
const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                user: 'Jane Doe',
                email: 'jane.doe@example.com',
                preferences: {
                    theme: 'dark',
                    notifications: true
                }
            });
        }, 2000);
    });
};

 
(async () => {
    try {
        const data = await fetchData();
        
         
        const handler = {
            get(target, property) {
                if (property in target) {
                    print(`Getting property '${property}'`);
                    return target[property];
                } else {
                    return `No such property: ${property}`;
                }
            },
            set(target, property, value) {
                if (property === 'theme' && ['dark', 'light'].includes(value)) {
                    print(`Setting property '${property}' to '${value}'`);
                    target[property] = value;
                    return true;
                }
                console.error(`Invalid value for property '${property}': ${value}`);
                return false;
            }
        };

        const preferencesProxy = new Proxy(data.preferences, handler);

         
        print(preferencesProxy.theme);
        preferencesProxy.theme = 'light';
        print(preferencesProxy.theme);
        preferencesProxy.theme = 'blue';  

         
        const newUser = {
            ...data,
            email: 'new.email@example.com'
        };
        Reflect.set(newUser, 'preferences', preferencesProxy);
        
        print(newUser);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
