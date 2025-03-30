class ComplexCalculator {
    constructor() {
        this.memory = new Proxy({}, {
            get: (target, name) => name in target ? target[name] : 0
        });
    }
  
    async evaluate(expression) {
        const parsed = this.parseExpression(expression);
        const result = await this.compute(parsed);
        this.updateMemory(parsed, result);
        return result;
    }
  
    parseExpression(expression) {
        return expression.replace(/\s+/g, '').match(/[a-zA-Z]+|[+\-*/()]|\d+\.?\d*/g);
    }
  
    async compute(tokens) {
        const operators = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b
        };
        
        let values = [], ops = [];
        
        const precedence = (op) => ({ '+': 1, '-': 1, '*': 2, '/': 2 })[op] || 0;

        const applyOp = () => {
            const b = values.pop();
            const a = values.pop();
            const op = ops.pop();
            values.push(operators[op](a, b));
        };
        
        for (let token of tokens) {
            if (!isNaN(parseFloat(token))) {
                values.push(parseFloat(token));
            } else if (this.memory[token] !== undefined) {
                values.push(this.memory[token]);
            } else if (operators[token]) {
                while (ops.length && precedence(ops[ops.length - 1]) >= precedence(token)) {
                    applyOp();
                }
                ops.push(token);
            } else if (token === '(') {
                ops.push(token);
            } else if (token === ')') {
                while (ops.length && ops[ops.length - 1] !== '(') {
                    applyOp();
                }
                ops.pop();
            }
        }
        
        while (ops.length) {
            applyOp();
        }
        
        return values[0];
    }
  
    updateMemory(parsed, result) {
        const variableMatch = parsed[0].match(/[a-zA-Z]+/);
        if (variableMatch) {
            this.memory[variableMatch[0]] = result;
        }
    }
}

(async () => {
    const calc = new ComplexCalculator();
    console