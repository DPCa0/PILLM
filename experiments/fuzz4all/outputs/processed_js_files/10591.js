class ComplexCalculator {
    #history = [];
    
    static #instance;

    constructor() {
        if (ComplexCalculator.#instance) {
            return ComplexCalculator.#instance;
        }
        ComplexCalculator.#instance = this;
    }

    calculate(operation, ...args) {
        const result = this.#executeOperation(operation, ...args);
        this.#history.push({ operation, args, result });
        return result;
    }

    #executeOperation(operation, ...args) {
        return {
            add: () => args.reduce((acc, val) => acc + val, 0),
            multiply: () => args.reduce((acc, val) => acc * val, 1),
            subtract: () => args.reduce((acc, val) => acc - val),
            divide: () => args.reduce((acc, val) => acc / val),
        }[operation]?.() ?? 'Operation not supported';
    }

    *[Symbol.iterator]() {
        for (const entry of this.#history) {
            yield entry;
        }
    }

    async saveHistory() {
        const blob = new Blob([JSON.stringify(this.#history)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "history.json";
        a.click();
    }
}

(async () => {
    const calculator = new ComplexCalculator();
    
    print(calculator.calculate('add', 1, 2, 3, 4));           
    print(calculator.calculate('multiply', 2, 3, 4));         
    print(calculator.calculate('subtract', 10, 2, 1));        
    print(calculator.calculate('divide', 100, 5, 2));         
    print(calculator.calculate('modulus', 10, 3));            

    for (const entry of calculator) {
        print(entry);
    }

    await calculator.saveHistory();   
})();
