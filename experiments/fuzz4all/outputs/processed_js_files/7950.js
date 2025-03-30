 

 
class Fibonacci {
    *sequence(n) {
        let a = 0, b = 1;
        while (n--) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
            return function(...args) {
                print(`Calling ${prop} with arguments: ${JSON.stringify(args)}`);
                return target[prop].apply(this, args);
            }
        }
        return Reflect.get(target, prop, receiver);
    }
};

const fib = new Proxy(new Fibonacci(), handler);

(async () => {
     
    const calculateFib = async (n) => {
        const sequence = fib.sequence(n);
        for (const num of sequence) {
            await new Promise(resolve => setTimeout(resolve, 100));  
            print(num);
        }
    };

    print('Fibonacci sequence:');
    await calculateFib(10);  
})();
