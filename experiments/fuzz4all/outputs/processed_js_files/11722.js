class ComplexOperation {
    static *fibonacciSequence(max) {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < max; i++) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }
    
    static async processData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.map(({ id, value }) => ({ id, value: value * 2 }));
        } catch (error) {
            console.error('Fetching data failed:', error);
            return [];
        }
    }
}

(async function main() {
    const fibonacciNumbers = Array.from(ComplexOperation.fibonacciSequence(10));
    print('Fibonacci Numbers:', fibonacciNumbers);

    const processedData = await ComplexOperation.processData('https://jsonplaceholder.typicode.com/todos');
    print('Processed Data:', processedData);

    const uniqueNumbers = [...new Set([1, 2, 3, 2, 4, 5, 4])];
    print('Unique Numbers:', uniqueNumbers);

    const sum = uniqueNumbers.reduce((acc, num) => acc + num, 0);
    print('Sum of Unique Numbers:', sum);
})();
