class ComplexCalculator {
    #memory = 0;

    constructor() {
        this.operations = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b,
        };
    }

    evaluate(expression) {
        try {
            const tokens = expression.match(/(\d+|\+|\-|\*|\/)/g);
            let stack = [];
            for (let token of tokens) {
                if (this.operations[token]) {
                    const [b, a] = [stack.pop(), stack.pop()];
                    stack.push(this.operations[token](a, b));
                } else {
                    stack.push(parseFloat(token));
                }
            }
            return stack[0];
        } catch (err) {
            throw new Error("Invalid expression");
        }
    }

    async complexOperation(array, callback) {
        const results = [];
        for (const item of array) {
            results.push(await callback(item));
        }
        return results;
    }

    get memory() {
        return this.#memory;
    }

    set memory(value) {
        if (typeof value === 'number') {
            this.#memory = value;
        } else {
            throw new Error("Memory must be a number");
        }
    }

    static *fibonacci(n) {
        let [a, b] = [0, 1];
        while (n-- > 0) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
}

 

(async () => {
    const calc = new ComplexCalculator();

     
    calc.memory = 10;
    print("Memory:", calc.memory);

     
    const squared = await calc.complexOperation([1, 2, 3, 4], async x => x * x);
    print("Squared:", squared);

     
    print("Evaluation of '3 + 5 * 2':", calc.evaluate('3 5 2 * +'));

     
    const fibGen = ComplexCalculator.fibonacci(10);
    print("Fibonacci sequence:");
    for (let num of fibGen) {
        print(num);
    }
})();
