class ComplexCalculator {
    constructor() {
        this.memoizedResults = new Map();
    }

    factorial(n) {
        if (this.memoizedResults.has(n)) return this.memoizedResults.get(n);
        if (n <= 1) return 1;
        const result = n * this.factorial(n - 1);
        this.memoizedResults.set(n, result);
        return result;
    }

    async fetchDataAndProcess(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return this.processData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    processData(data) {
        const computedData = data.map(item => ({
            ...item,
            factorialValue: this.factorial(item.value)
        }));
        return computedData;
    }

    async run(url) {
        const processedData = await this.fetchDataAndProcess(url);
        print('Processed Data:', processedData);
    }
}

 
(async () => {
    const calculator = new ComplexCalculator();
    const url = 'https://api.example.com/data';  
    await calculator.run(url);
})();
