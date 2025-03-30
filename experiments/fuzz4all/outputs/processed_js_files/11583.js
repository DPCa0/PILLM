class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

     
    [Symbol.for('+')](other) {
        return new ComplexNumber(
            this.real + other.real,
            this.imaginary + other.imaginary
        );
    }

     
    async addAndLog(other) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const result = this[Symbol.for('+')](other);
                print(`Result: ${result.real} + ${result.imaginary}i`);
                resolve(result);
            }, 1000);
        });
    }

     
    static create(real, imaginary) {
        return new Proxy(new ComplexNumber(real, imaginary), {
            get(target, prop) {
                if (prop in target) {
                    return target[prop];
                } else {
                    throw new Error(`Property ${prop} does not exist on ComplexNumber`);
                }
            }
        });
    }
}

 
(async () => {
    const a = ComplexNumber.create(2, 3);
    const b = ComplexNumber.create(4, 5);

    try {
        const result = await a.addAndLog(b);
        print(`Accessing real part: ${result.real}`);
        print(`Trying to access non-existent part: ${result.fake}`);
    } catch (e) {
        console.error(e.message);
    }
})();
