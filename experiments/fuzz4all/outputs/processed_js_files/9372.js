class AdvancedCalculator {
    #history = [];
    
    constructor() {
         
        return new Proxy(this, {
            get(target, prop) {
                if (typeof target[prop] === 'function') {
                    return function (...args) {
                        const result = target[prop](...args);
                        target.#logHistory(prop, args, result);
                        return result;
                    };
                }
                return target[prop];
            }
        });
    }
    
     
    add(a, b) {
        return a + b;
    }
    
     
    subtract(a, b) {
        return a - b;
    }
    
     
    get history() {
        return [...this.#history];
    }

     
    #logHistory(operation, args, result) {
        this.#history.push({ operation, args, result });
    }
    
     
    static fromHistory(history) {
        const calc = new AdvancedCalculator();
        calc.#history = history.map(entry => ({ ...entry }));
        return calc;
    }
}

const calculator = new AdvancedCalculator();
print(calculator.add(5, 7));  
print(calculator.subtract(10, 3));  
print(calculator.history);  

const history = calculator.history;
const newCalc = AdvancedCalculator.fromHistory(history);
print(newCalc.history);  
