class AdvancedCalculator {
    constructor() {
        this.history = [];
    }

    calculate(expression) {
         
        try {
            const result = new Function(`return (${expression});`)();
            this.history.push({ expression, result });
            return result;
        } catch {
            throw new Error('Invalid expression');
        }
    }

    get historyFormatted() {
         
        return this.history.map(({ expression, result }, index) => 
            `${index + 1}: ${expression} = ${result}`).join('\n');
    }

    static *fibonacci(n) {
         
        let [a, b] = [0, 1];
        while (n--) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    async fetchMathFact(number) {
         
        const response = await fetch(`http: 
        if (!response.ok) throw new Error('Network response was not ok');
        const fact = await response.text();
        return fact;
    }
}

 
(async () => {
    const calc = new AdvancedCalculator();
    print(calc.calculate('3 * (7 + 2) / 3'));
    print(calc.calculate('Math.sqrt(144)'));

    for (const num of AdvancedCalculator.fibonacci(5)) {
        print(`Fibonacci: ${num}`);
    }

    try {
        const fact = await calc.fetchMathFact(42);
        print(`Math Fact: ${fact}`);
    } catch (error) {
        console.error('Error fetching math fact:', error);
    }

    print('History:\n', calc.historyFormatted);
})();
