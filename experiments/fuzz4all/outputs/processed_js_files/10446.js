 
async function* fibonacciAsyncGenerator(limit) {
    let [prev, curr, index] = [0, 1, 0];
    while (index < limit) {
        yield new Promise(resolve => setTimeout(() => resolve(curr), 500));  
        [prev, curr] = [curr, prev + curr];
        index++;
    }
}

 
(async () => {
    print("Fibonacci sequence with async operations:");
    
    const fibonacciSequence = fibonacciAsyncGenerator(10);
    for await (const num of fibonacciSequence) {
        print(num);  
    }

     
    const handler = {
        get(target, prop, receiver) {
            if (prop in target) {
                return Reflect.get(target, prop, receiver);
            } else {
                print(`Property ${prop} not found, returning default value.`);
                return 42;  
            }
        }
    };

    const obj = { a: 1, b: 2, c: 3 };
    const proxyObj = new Proxy(obj, handler);

    print(`Value of a: ${proxyObj.a}`);
    print(`Value of x: ${proxyObj.x}`);  

     
    Reflect.defineProperty(obj, 'dynamicMethod', {
        value: function (message) {
            print(`Dynamic Message: ${message}`);
        },
        writable: true,
        configurable: true
    });

    obj.dynamicMethod("This is a dynamically defined method.");

     
    const { a, ...rest } = obj;
    print(`Destructured a: ${a}, Rest:`, rest);

     
    class PrivateExample {
        #privateField;
        constructor(value) {
            this.#privateField = value;
        }
        getPrivate() {
            return this.#privateField;
        }
    }

    const privateExample = new PrivateExample(100);
    print(`Private field value: ${privateExample.getPrivate()}`);
})();
