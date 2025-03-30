 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: { id: 1, name: 'Alice', details: { age: 30, location: 'Wonderland' } },
                preferences: { theme: 'dark', language: 'en' }
            });
        }, 1000);
    });
}

 
const handler = {
    get: function(target, prop) {
        if (prop in target) {
            print(`Property '${prop}' was accessed`);
            return target[prop];
        } else {
            throw new Error(`Property '${prop}' does not exist`);
        }
    }
};

 
async function processUserData() {
    try {
        const data = await fetchData();
        
         
        const {
            user: { id, name, details: { age, location } },
            preferences: { theme, language }
        } = data;
        
         
        const proxiedUser = new Proxy({ id, name, age, location }, handler);
        
        print(`User Info: ${proxiedUser.name}, Age: ${proxiedUser.age}, Location: ${proxiedUser.location}`);
        print(`Preferences: Theme=${theme}, Language=${language}`);
        
         
        print(proxiedUser.nonExistentProperty);
        
    } catch (error) {
        console.error(error.message);
    }
}

processUserData();
