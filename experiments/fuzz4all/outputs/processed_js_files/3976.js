 
async function fibonacci(n) {
    return new Promise((resolve) => {
        let fib = [0, 1];
        for (let i = 2; i < n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        resolve(fib.slice(0, n));
    });
}

 
const handler = {
    get: function(target, property) {
        print(`Accessing property '${property}'`);
        return property in target ? target[property] : 42;  
    }
};

const targetObject = { a: 1, b: 2, c: 3 };
const proxyObject = new Proxy(targetObject, handler);

 
(async () => {
    try {
        const n = 10;
        const fibSeq = await fibonacci(n);
        print(...fibSeq);

         
        print(proxyObject.a);  
        print(proxyObject.d);  
    } catch (error) {
        console.error("Error in execution", error);
    }
})();
