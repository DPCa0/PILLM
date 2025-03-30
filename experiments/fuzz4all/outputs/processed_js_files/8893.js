class Calculator {
     
    #operate = (a, b, op) => ({
        '+': () => a + b,
        '-': () => a - b,
        '*': () => a * b,
        '/': () => a / b
    })[op]?.();

     
    calculate(expression) {
        const [operand1, operator, operand2] = expression.split(' ');
        const result = this.#operate(Number(operand1), Number(operand2), operator);
        if (result === undefined) throw new Error("Invalid operator");
        return result;
    }
}

const memoize = (fn) => {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            print("Fetching from cache:", key);
            return cache.get(key);
        }
        print("Calculating result for:", key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

 
const calculationHandler = {
    get(target, prop, receiver) {
        return (...args) => {
            print(`Performing calculation: ${args[0]}`);
            return Reflect.get(target, prop, receiver)(...args);
        };
    }
};

 
const calculator = new Proxy(new Calculator(), calculationHandler);
const memoizedCalculate = memoize(calculator.calculate.bind(calculator));

 
print(memoizedCalculate("5 + 3"));     
print(memoizedCalculate("10 * 4"));    
print(memoizedCalculate("8 / 2"));     
print(memoizedCalculate("5 + 3"));     
print(memoizedCalculate("10 * 4"));    
