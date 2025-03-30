class ComplexOperation {
    #privateData = new WeakMap();
    
    constructor(initialValue) {
        this.#privateData.set(this, initialValue);
        this.value = initialValue;
    }

    async complexCalculation() {
        const result = await new Promise((resolve) => {
            setTimeout(() => {
                const data = this.#privateData.get(this);
                const complexResult = data * Math.random();
                resolve(complexResult);
            }, 1000);
        });
        this.value = result;
        return result;
    }

    getValueWithClosure() {
        let internalValue = this.value;
        return function() {
            return `Current Value: ${internalValue}`;
        };
    }

    *valueGenerator(limit) {
        let count = 0;
        while (count < limit) {
            yield count;
            count += this.value;
        }
    }

    static async runDemo() {
        print("Starting complex operation...");
        const operation = new ComplexOperation(5);
        
        const newValue = await operation.complexCalculation();
        print(`New Value: ${newValue}`);
        
        const closure = operation.getValueWithClosure();
        print(closure());
        
        print("Generated Values:");
        for (let val of operation.valueGenerator(20)) {
            print(val);
        }
    }
}

ComplexOperation.runDemo().catch(console.error);
