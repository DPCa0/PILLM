class ComplexCalculation {
    constructor() {
        this.cache = new WeakMap();
    }

    fibonacci(num) {
        if (num <= 1) return num;
        if (this.cache.has(num)) return this.cache.get(num);

        const result = this.fibonacci(num - 1) + this.fibonacci(num - 2);
        this.cache.set(num, result);
        return result;
    }

    async fetchData(apiEndpoint) {
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            print(data);
            return data;
        } catch (error) {
            console.error('Failed to fetch data:', error);
            throw error;
        }
    }

    static *generatorFunction() {
        let index = 0;
        while (true) {
            yield index++;
        }
    }
}

(async () => {
    const calc = new ComplexCalculation();
    print('Fibonacci of 10:', calc.fibonacci(10));

    const generator = ComplexCalculation.generatorFunction();
    print('Generator output:', generator.next().value);
    print('Generator output:', generator.next().value);

    await calc.fetchData('https://jsonplaceholder.typicode.com/todos/1');

    const numbers = [1, 2, 3, 4, 5];
    const doubledNumbers = numbers.map(num => num * 2);
    print('Doubled Numbers:', doubledNumbers);
})();
