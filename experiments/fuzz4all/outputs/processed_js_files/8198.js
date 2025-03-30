 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const fibProxy = new Proxy(fibonacci(), {
    get(target, prop, receiver) {
        const fib = Reflect.get(target, prop, receiver);
        if (typeof fib === 'function') {
            return function(...args) {
                print(`Fibonacci function called with arguments: ${args}`);
                return fib.apply(this, args);
            }
        }
        print(`Accessing Fibonacci property: ${prop}`);
        return fib;
    }
});

 
(async function() {
    const fibNumbers = [];
    for (const num of fibProxy) {
        fibNumbers.push(num);
        if (fibNumbers.length === 10) break;
    }
    print('First 10 Fibonacci numbers:', fibNumbers);
})();

 
class MathUtils {
    #privateValue = 42;  

    static square(n) {
        return n * n;
    }

    cube(n) {
        return n * n * n + this.#privateValue;
    }
}

 
const utils = new MathUtils();
const square = MathUtils?.square(5) ?? 'Method not found';
const cube = utils?.cube(3) ?? 'Method not found';

print('Square:', square);
print('Cube with private value addition:', cube);

 
function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) => `${acc}${str}<strong>${values[i] || ''}</strong>`, '');
}

const user = 'Alice';
const action = 'logged in';
const message = highlight`${user} has just ${action}!`;
print(message);
