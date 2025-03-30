(async function() {
     
    const target = { message: "Hello" };
    const handler = {
        get: (obj, prop) => {
            if (prop in obj) {
                print(`Getting ${prop}`);
                return obj[prop];
            } else {
                throw new Error(`${prop} does not exist`);
            }
        },
        set: (obj, prop, value) => {
            print(`Setting ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    };
    const proxy = new Proxy(target, handler);

     
    function readonly(target, key, descriptor) {
        descriptor.writable = false;
        return descriptor;
    }

    class Greeter {
        constructor(greeting) {
            this.greeting = greeting;
        }

        @readonly
        greet() {
            return `${this.greeting}, world!`;
        }
    }

     
    async function fetchData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }

     
    const [data, time] = await Promise.all([
        fetchData(),
        new Promise(resolve => setTimeout(() => resolve(new Date().toLocaleTimeString()), 1000))
    ]);

     
    print(`Data: ${JSON.stringify(data)}, Time: ${time}`);

     
    proxy.message = 'Hi';
    print(proxy.message);

     
    const greeter = new Greeter(proxy.message);
    print(greeter.greet());
})();
