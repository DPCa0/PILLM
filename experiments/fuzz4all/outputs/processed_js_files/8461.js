 
async function* fetchData(urls) {
    for (const url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

 
async function useDynamicModule() {
    if (import.meta.env.MODE === 'development') {
        const { default: debug } = await import('./debugModule.js');
        debug('Debugging mode is enabled');
    }
}

 
(async () => {
    try {
        const urls = [
            'https://jsonplaceholder.typicode.com/posts/1',
            'https://jsonplaceholder.typicode.com/posts/2'
        ];

        const dataPromises = [];
        for await (const dataPromise of fetchData(urls)) {
            dataPromises.push(dataPromise);
        }
        
        const data = await Promise.all(dataPromises);
        print('Fetched Data:', data);

        await useDynamicModule();

         
        const target = { message: 'Hello, Proxy!' };
        const handler = {
            get: (obj, prop) => {
                print(`Accessing property "${prop}"`);
                return obj[prop];
            },
            set: (obj, prop, value) => {
                print(`Setting property "${prop}" to "${value}"`);
                obj[prop] = value;
                return true;
            }
        };
        const proxy = new Proxy(target, handler);
        print(proxy.message);
        proxy.message = 'Hello, world!';
        print(proxy.message);

         
        const privateData = new WeakMap();
        class User {
            constructor(name) {
                privateData.set(this, { name });
            }
            getName() {
                return privateData.get(this).name;
            }
        }
        const user = new User('Alice');
        print(`User's name: ${user.getName()}`);
    } catch (error) {
        console.error('Error:', error);
    }
})();
