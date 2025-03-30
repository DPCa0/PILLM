class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
    }

    static multiply(A, B) {
        if (A.data[0].length !== B.data.length) throw new Error('Incompatible matrices');
        let result = new Matrix(A.data.length, B.data[0].length);
        for (let i = 0; i < result.data.length; i++) {
            for (let j = 0; j < result.data[0].length; j++) {
                result.data[i][j] = A.data[i].reduce((sum, val, k) => sum + val * B.data[k][j], 0);
            }
        }
        return result;
    }
}

class Observable {
    constructor(value) {
        this._value = value;
        this.subscribers = new Set();
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (newValue !== this._value) {
            this._value = newValue;
            this.notify();
        }
    }

    subscribe(callback) {
        this.subscribers.add(callback);
    }

    unsubscribe(callback) {
        this.subscribers.delete(callback);
    }

    notify() {
        this.subscribers.forEach(callback => callback(this._value));
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching data from ${url}`);
    return await response.json();
}

(async () => {
    const matrixA = new Matrix(2, 3, 1);
    const matrixB = new Matrix(3, 2, 2);
    print('Matrix multiplication result:', Matrix.multiply(matrixA, matrixB).data);

    const observable = new Observable(10);
    const logger = newValue => print(`Observed value changed to: ${newValue}`);
    observable.subscribe(logger);
    observable.value = 20;
    observable.value = 30;
    observable.unsubscribe(logger);
    observable.value = 40;  

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print('Fetched data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
})();
