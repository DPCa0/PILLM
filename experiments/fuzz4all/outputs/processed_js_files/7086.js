 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            const data = {
                user: { id: 1, name: 'John Doe', age: 30 },
                settings: { theme: 'dark', notifications: true }
            };
            resolve(data);
        }, 1000);
    });
}

 
const settingsHandler = {
    set: function(obj, prop, value) {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

 
async function main() {
    try {
        const { user, settings } = await fetchData('https://api.example.com/data');
        
         
        const proxiedSettings = new Proxy(settings, settingsHandler);

        print(`User: ${user.name}, Age: ${user.age}`);
        print(`Theme: ${proxiedSettings.theme}, Notifications: ${proxiedSettings.notifications}`);

         
        proxiedSettings.theme = 'light';

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
