 
const privateMethod = Symbol('privateMethod');

class ComplexSystem {
    constructor(name) {
        this.name = name;
        this.cache = new Map();
        this.config = { retries: 3 };
    }
    
     
    async fetchData(url) {
        for (let i = 0; i < this.config.retries; i++) {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                this.cache.set(url, data);
                return data;
            } catch (error) {
                console.error(`Attempt ${i + 1} failed: ${error.message}`);
                if (i === this.config.retries - 1) throw new Error('Max retries reached');
            }
        }
    }
    
     
    [privateMethod]() {
        print(`Accessing private method in ${this.name}`);
    }
    
     
    getConfig() {
        const handler = {
            get: (target, prop) => {
                print(`Accessing property "${prop}"`);
                return target[prop];
            }
        };
        return new Proxy(this.config, handler);
    }
    
     
    *fibonacci(n) {
        let [a, b] = [0, 1];
        while (n-- > 0) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
}

(async () => {
    const system = new ComplexSystem('Advanced System');

     
    const fibGen = system.fibonacci(10);
    for (const num of fibGen) {
        print(num);
    }

     
    system[privateMethod]();

     
    const configProxy = system.getConfig();
    print('Retries:', configProxy.retries);

     
    try {
        const data = await system.fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print('Fetched Data:', data);
    } catch (error) {
        console.error('Failed to fetch data:', error.message);
    }
})();
