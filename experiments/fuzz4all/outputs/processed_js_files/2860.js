 
(async function() {
     
    const delayedResolve = (value, delay) => new Promise(resolve => setTimeout(() => resolve(value), delay));
    
     
    const handler = {
        get(target, prop) {
            if (prop === 'greeting') {
                return async () => {
                    const greeting = await delayedResolve('Hello', 1000);
                    const name = await delayedResolve('World', 1000);
                    return `${greeting}, ${name}!`;
                };
            }
            return Reflect.get(target, prop);
        }
    };
    
     
    const proxy = new Proxy({}, handler);
    
     
    try {
        const message = await proxy.greeting();
        print(message);
    } catch (error) {
        console.error('Error:', error);
    }
})();
