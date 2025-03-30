class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

     
    static createProxy(obj) {
        return new Proxy(obj, {
            get(target, prop) {
                if (prop in target) {
                    return target[prop];
                } else {
                    throw new ReferenceError(`Property ${prop} not found`);
                }
            }
        });
    }

    add({ real, imaginary }) {
        return new ComplexNumber(this.real + real, this.imaginary + imaginary);
    }

    subtract({ real, imaginary }) {
        return new ComplexNumber(this.real - real, this.imaginary - imaginary);
    }

    toString() {
        const sign = this.imaginary >= 0 ? '+' : '-';
        return `${this.real} ${sign} ${Math.abs(this.imaginary)}i`;
    }
}

 
const complexHistory = new Map();
const internalCache = new WeakMap();

 
function* historyGenerator(map) {
    for (let [key, value] of map.entries()) {
        yield `${key}: ${value.map(c => c.toString()).join(', ')}`;
    }
}

 
async function performOperations() {
    const a = ComplexNumber.createProxy(new ComplexNumber(3, 4));
    const b = ComplexNumber.createProxy(new ComplexNumber(1, -2));

    complexHistory.set('Operation 1', [a, b]);

    const sum = a.add(b);
    complexHistory.set('Operation 2', [sum]);

    internalCache.set(a, 'Cached: ComplexNumber a');
    internalCache.set(b, 'Cached: ComplexNumber b');

    await new Promise(resolve => setTimeout(resolve, 1000));

    print([...historyGenerator(complexHistory)].join('\n'));
    print(internalCache.get(a));
}

 
(async () => {
    try {
        await performOperations();
    } catch (error) {
        console.error('Error:', error);
    }
})();
