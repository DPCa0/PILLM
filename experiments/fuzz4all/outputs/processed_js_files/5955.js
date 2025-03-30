 
const fetchData = async () => {
    try {
         
        const apiCall = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: { name: 'Jane Doe', age: 30 },
                    settings: { theme: 'dark', language: 'en' },
                    preferences: ['music', 'movies', 'sports']
                });
            }, 1000);
        });

        const { user: { name, age }, settings: { theme }, preferences: [firstPreference] } = await apiCall;

         
        print(`User: ${name}, Age: ${age}, Prefers: ${firstPreference}`);
        print(`User settings:`, { ...settings, platform: 'web' });

         
        const sym = Symbol('uniqueKey');
        const userMap = new Map();
        userMap.set(sym, name);

         
        for (const [key, value] of userMap) {
            print(`Symbol Key: ${String(key)}, Value: ${value}`);
        }

         
        const handler = {
            set(target, property, value) {
                if (property === 'age' && typeof value !== 'number') {
                    throw new Error('Age must be a number');
                }
                target[property] = value;
                return true;
            }
        };

        const userProxy = new Proxy(user, handler);
        userProxy.age = 31;  
         

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
(async () => {
    await fetchData();
})();
