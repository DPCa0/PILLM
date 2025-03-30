 
const user = {
    name: 'World',
    timeOfDay: 'day'
};

const handler = {
    get: function(target, property) {
        if (property === 'greeting') {
            const hour = new Date().getHours();
            target.timeOfDay = hour < 12 ? 'morning' : (hour < 18 ? 'afternoon' : 'evening');
            return `Hello, ${target.name}! Good ${target.timeOfDay}!`;
        }
        return Reflect.get(...arguments);
    }
};

const proxyUser = new Proxy(user, handler);

async function dynamicGreet(userProxy) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    await delay(500);   
    print(userProxy.greeting);
}

dynamicGreet(proxyUser);
