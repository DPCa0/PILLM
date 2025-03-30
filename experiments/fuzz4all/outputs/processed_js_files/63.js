class EnhancedCalculator {
    #history = [];
    
    static operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '**': (a, b) => a ** b,
    };

    constructor() {
        this.result = 0;
    }

    calculate(expression) {
        const parsed = this.#parseExpression(expression);
        this.result = parsed.reduce((acc, [operator, value]) => 
            EnhancedCalculator.operations[operator](acc, value), this.result);
        this.#history.push({ expression, result: this.result });
        return this.result;
    }

    getHistory() {
        return this.#history;
    }

    #parseExpression(expression) {
        const regExp = /(\d+|\+\+|\+|\-|\*|\/|\*\*)/g;
        const tokens = expression.match(regExp);
        const parsed = [];
        
        let currentOperator = '+';
        for (const token of tokens) {
            if (token in EnhancedCalculator.operations) {
                currentOperator = token;
            } else {
                parsed.push([currentOperator, parseFloat(token)]);
            }
        }
        return parsed;
    }

    static async delayedCalculate(calculator, expression, delay) {
        return new Promise(resolve => 
            setTimeout(() => resolve(calculator.calculate(expression)), delay));
    }
}

(async () => {
    const calc = new EnhancedCalculator();
    print(calc.calculate("3 + 5 * 2"));   
    print(calc.calculate("10 - 3 / 2"));  
    const delayedResult = await EnhancedCalculator.delayedCalculate(calc, "8 ** 2", 1000);
    print(delayedResult);                
    console.table(calc.getHistory());
})();
