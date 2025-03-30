class ComplexCalculator {
    constructor() {
        this.history = [];
    }

    async fetchComplexNumber() {
        const response = await fetch('https://api.random.org/json-rpc/4/invoke', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "generateSignedIntegers",
                params: {
                    apiKey: "YOUR_API_KEY",
                    n: 2,
                    min: 1,
                    max: 100
                },
                id: 42
            })
        });
        const data = await response.json();
        return { real: data.result.random.data[0], imag: data.result.random.data[1] };
    }

    * complexGenerator() {
        let number = 0;
        while (true) {
            number += Math.random();
            yield { real: number, imag: Math.random() };
        }
    }

    async calculate() {
        try {
            const number = await this.fetchComplexNumber();
            const iterator = this.complexGenerator();
            const randomComplex = iterator.next().value;
            
            const sum = {
                real: number.real + randomComplex.real,
                imag: number.imag + randomComplex.imag
            };

            this.history.push(sum);
            print(`Fetched: ${number.real} + ${number.imag}i`);
            print(`Generated: ${randomComplex.real} + ${randomComplex.imag}i`);
            print(`Sum: ${sum.real} + ${sum.imag}i`);
        } catch (error) {
            console.error('Error fetching complex number:', error);
        }
    }

    static transformHistory(calculator) {
        return calculator.history.map(({ real, imag }) => ({
            magnitude: Math.sqrt(real ** 2 + imag ** 2),
            angle: Math.atan2(imag, real)
        }));
    }
}

(async () => {
    const calculator = new ComplexCalculator();
    await calculator.calculate();
    await calculator.calculate();
    print('Transformed History:', ComplexCalculator.transformHistory(calculator));
})();
