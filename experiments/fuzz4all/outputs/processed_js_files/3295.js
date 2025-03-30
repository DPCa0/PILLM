 
class AdvancedCalculator {
    #history = [];

    constructor() {
        this.memory = 0;
    }

     
    async *calculateSeries(operations) {
        for (const op of operations) {
            await new Promise(r => setTimeout(r, 100));  
            switch (op.type) {
                case 'add':
                    this.memory += op.value;
                    break;
                case 'subtract':
                    this.memory -= op.value;
                    break;
                default:
                    throw new Error('Unsupported operation');
            }
            this.#recordHistory(op);
            yield this.memory;
        }
    }

     
    static createCalculatorProxy() {
        const calculator = new AdvancedCalculator();
        return new Proxy(calculator, {
            get(target, prop, receiver) {
                if (prop.startsWith('_')) {
                    throw new Error('Access denied');
                }
                return Reflect.get(target, prop, receiver);
            }
        });
    }

     
    printHistory() {
        const format = new Map([
            ['add', 'Added ${value}'],
            ['subtract', 'Subtracted ${value}']
        ]);
        this.#history.forEach(op => {
            const template = format.get(op.type);
            print(template.replace('${value}', op.value));
        });
    }

    #recordHistory(op) {
        this.#history.push(op);
    }
}

 
const main = async () => {
    const calculator = AdvancedCalculator.createCalculatorProxy();
    const operations = [
        { type: 'add', value: 10 },
        { type: 'subtract', value: 5 },
        { type: 'add', value: 20 }
    ];

    const series = calculator.calculateSeries(operations);
    for await (const result of series) {
        print(`Memory: ${result}`);
    }

    calculator.printHistory();
};

main().catch(console.error);
