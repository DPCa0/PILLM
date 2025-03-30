 

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    filter(predicate) {
        return new DataProcessor(this.data.filter(predicate));
    }

    map(transform) {
        return new DataProcessor(this.data.map(transform));
    }

    reduce(reducer, initialValue) {
        return this.data.reduce(reducer, initialValue);
    }
}

async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve([1, 2, 3, 4, 5, 6]), 1000);
    });
}

async function main() {
    const data = await fetchData();

    const dataProcessor = new DataProcessor(data);

    const sum = dataProcessor
        .filter(n => n % 2 === 0)
        .map(n => n * n)
        .reduce((acc, val) => acc + val, 0);

    print(`Sum of squares of even numbers: ${sum}`);
}

main().catch(console.error);
