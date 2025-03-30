 
const data = {
    user: {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com"
    },
    preferences: {
        theme: "dark",
        notifications: true
    }
};

 
const { user: { name, email }, preferences: { theme } } = data;

 
const fetchUserData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ name, email }), 1000);
    });
};

 
const handler = {
    get: (target, prop) => {
        print(`Getting ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const proxiedData = new Proxy(data, handler);

 
(async () => {
    print("Fetching user data...");
    const userData = await fetchUserData();
    
    print(`User Name: ${userData.name}`);
    print(`User Email: ${userData.email}`);
    
    print(`Current Theme: ${proxiedData.preferences.theme}`);
    
     
    proxiedData.preferences.theme = "light";
    
    print(`Updated Theme: ${proxiedData.preferences.theme}`);
})();
